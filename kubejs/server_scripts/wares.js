// Wares Integration - Trade notifications and territory expansion

if (typeof WaresEvents === 'undefined') return;

WaresEvents.batchDelivered(function (event) {
  var player = event.getPlayer();
  var blockEntity = event.getBlockEntity();
  var agreement = blockEntity.getAgreement();
  if (!agreement || agreement.isEmpty()) return;

  // Notify player of batch delivery
  if (player) {
    var title = agreement.getTitle().getString();
    var delivered = agreement.getDelivered();
    var ordered = agreement.getOrdered();
    var progress = agreement.isInfinite() ? delivered : (delivered + '/' + ordered);

    var sent = [];
    agreement.getRequested().forEach(function (req) {
      var count = req.count || (req.getCount && req.getCount()) || 1;
      var id = req.tagOrItem || (req.getTagOrItem && req.getTagOrItem()) || req;
      sent.push(count + 'x ' + (id + '').replace('minecraft:', ''));
    });

    var got = [];
    agreement.getPayment().forEach(function (stack) {
      got.push(stack.getCount() + 'x ' + stack.getId().toString().replace('minecraft:', ''));
    });

    player.tell('[Wares] Batch: ' + title + ' (' + progress + ') | Sent: ' + sent.join(', ') + ' | Got: ' + got.join(', '));
  }

  // Territory expansion from territoryExpandTime NBT
  if (!global.ChunkTerritory || !global.ChunkTerritory.claimAdjacent) return;

  var territoryTicks = 0;
  try {
    var itemStack = blockEntity.getAgreementItem();
    var tag = itemStack.getNbt ? itemStack.getNbt() : (itemStack.getTag ? itemStack.getTag() : null);
    if (tag && tag.contains && tag.contains('territoryExpandTime')) {
      territoryTicks = tag.getInt('territoryExpandTime');
    }
  } catch (e) {}

  if (territoryTicks <= 0) return;

  var pos = blockEntity.getBlockPos();
  var server = blockEntity.getLevel().getServer();
  var bx = pos.getX() + 0.5, by = pos.getY(), bz = pos.getZ() + 0.5;

  var targetPlayer = player;
  if (!targetPlayer) {
    var players = server.players;
    var bestDist = Infinity;
    for (var i = 0; i < players.size(); i++) {
      var p = players.get(i);
      var dx = p.x - bx, dz = p.z - bz;
      var dist = dx * dx + dz * dz;
      if (dist < bestDist) {
        bestDist = dist;
        targetPlayer = p;
      }
    }
  }

  if (targetPlayer) {
    var result = global.ChunkTerritory.claimAdjacent(
      server,
      targetPlayer.uuid.toString(),
      targetPlayer.name.string,
      bx, by, bz,
      territoryTicks
    );
    var action = result.renewed ? 'Renewed' : 'Expanded to';
    targetPlayer.tell('[Territory] ' + action + ' [' + result.cx + ', ' + result.cz + '] for ' + territoryTicks + ' ticks');
  }
});

WaresEvents.agreementCompleted(function (event) {
  var player = event.getPlayer();
  if (!player) return;

  var agreement = event.getBlockEntity().getAgreement();
  if (!agreement || agreement.isEmpty()) return;

  var title = agreement.getTitle().getString();
  var xp = agreement.getExperience();

  var got = [];
  agreement.getPayment().forEach(function (stack) {
    got.push(stack.getCount() + 'x ' + stack.getId().toString().replace('minecraft:', ''));
  });

  player.tell('[Wares] COMPLETED: ' + title + ' | Final payment: ' + got.join(', ') + ' | XP: ' + xp);
});
