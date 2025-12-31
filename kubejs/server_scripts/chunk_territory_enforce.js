// Chunk Territory Enforcement
// Handles spectator mode, border visuals, block protection, and item containment

var playerWasOutside = {};
var lastBorderSound = {};

// UTILITY FUNCTIONS

function hasTerritory() {
    return global.ChunkTerritory &&
           global.ChunkTerritory.chunks &&
           Object.keys(global.ChunkTerritory.chunks).length > 0;
}

function isPassable(level, x, y, z) {
    var id = level.getBlock(x, y, z).id + '';
    return id.indexOf('air') !== -1 || id === 'minecraft:water';
}

function playSound(player, sound, x, y, z, volume, pitch) {
    player.server.runCommandSilent(
        'playsound ' + sound + ' master ' + player.name.string +
        ' ' + x + ' ' + y + ' ' + z + ' ' + volume + ' ' + pitch
    );
}

function denyEffect(server, name, x, y, z) {
    server.runCommandSilent('particle angry_villager ' + x + ' ' + y + ' ' + z + ' 0.2 0.2 0.2 0 5 force ' + name);
    server.runCommandSilent('playsound minecraft:block.note_block.bass master ' + name + ' ' + x + ' ' + y + ' ' + z + ' 0.5 0.5');
}

function intArrayToUuid(arr) {
    function toHex(n) { return ((n >>> 0).toString(16)).padStart(8, '0'); }
    var hex = toHex(arr[0]) + toHex(arr[1]) + toHex(arr[2]) + toHex(arr[3]);
    return hex.substring(0,8) + '-' + hex.substring(8,12) + '-' + hex.substring(12,16) + '-' + hex.substring(16,20) + '-' + hex.substring(20,32);
}

// SPECTATOR MODE ENFORCEMENT
// Players in unowned chunks are forced into spectator mode

PlayerEvents.tick(function(event) {
    if (!global.ChunkTerritory) return;

    var player = event.player;
    if (player.creative) return;

    var uuid = player.uuid.toString();

    // Restore survival if no territory exists
    if (!hasTerritory()) {
        if (playerWasOutside[uuid] && player.spectator) {
            playerWasOutside[uuid] = false;
            player.setGameMode('survival');
            player.tell('Territory enforcement disabled');
        }
        return;
    }

    var cx = player.chunkPosition().x;
    var cz = player.chunkPosition().z;
    var owns = global.ChunkTerritory.owns(uuid, cx, cz);
    var wasOutside = playerWasOutside[uuid] || false;

    // Entered unowned chunk -> spectator
    if (!owns && !wasOutside) {
        playerWasOutside[uuid] = true;
        player.setGameMode('spectator');
        player.tell('You do not own this chunk');
        playSound(player, 'minecraft:block.respawn_anchor.charge', player.x, player.y, player.z, 1, 0.5);
    }
    // Returned to owned chunk -> survival (with safe teleport)
    else if (owns && wasOutside) {
        playerWasOutside[uuid] = false;

        var px = Math.floor(player.x), py = Math.floor(player.y), pz = Math.floor(player.z);
        if (!isPassable(player.level, px, py, pz) || !isPassable(player.level, px, py + 1, pz)) {
            for (var y = py; y < py + 50; y++) {
                if (isPassable(player.level, px, y, pz) && isPassable(player.level, px, y + 1, pz)) {
                    player.teleportTo(player.x, y, player.z);
                    break;
                }
            }
        }

        player.setGameMode('survival');
        player.tell('Welcome back');
        playSound(player, 'minecraft:block.respawn_anchor.charge', player.x, player.y, player.z, 1, 1.5);
    }
});

// BORDER PARTICLES
// Red dust particles at chunk boundaries between owned/unowned territory

PlayerEvents.tick(function(event) {
    if (!hasTerritory()) return;
    if (event.server.tickCount % 4 !== 0) return;

    var player = event.player;
    if (player.creative) return;

    var uuid = player.uuid.toString();
    var cx = player.chunkPosition().x, cz = player.chunkPosition().z;
    var localX = player.x - cx * 16, localZ = player.z - cz * 16;
    var owns = global.ChunkTerritory.owns(uuid, cx, cz);

    if (!owns && !player.spectator) return;

    var dist = player.spectator ? 5 : 2;
    var edges = [
        { check: localX < dist,      adj: [cx-1, cz], pos: cx * 16,     axis: 'z', dir: 'west',  near: localX < 1 },
        { check: localX > 16 - dist, adj: [cx+1, cz], pos: (cx+1) * 16, axis: 'z', dir: 'east',  near: localX > 15 },
        { check: localZ < dist,      adj: [cx, cz-1], pos: cz * 16,     axis: 'x', dir: 'north', near: localZ < 1 },
        { check: localZ > 16 - dist, adj: [cx, cz+1], pos: (cz+1) * 16, axis: 'x', dir: 'south', near: localZ > 15 }
    ];

    var minX = cx * 16, maxX = (cx+1) * 16;
    var minZ = cz * 16, maxZ = (cz+1) * 16;

    for (var i = 0; i < edges.length; i++) {
        var e = edges[i];
        if (!e.check) continue;

        var adjOwns = global.ChunkTerritory.owns(uuid, e.adj[0], e.adj[1]);
        if (owns === adjOwns) continue;

        var rangeMin = (e.axis === 'x') ? minX : minZ;
        var rangeMax = (e.axis === 'x') ? maxX : maxZ;
        spawnBorderLine(player, e.pos, player.y, rangeMin, rangeMax, e.axis, e.dir, e.near);
    }
});

function spawnBorderLine(player, borderPos, y, rangeMin, rangeMax, axis, direction, doSound) {
    var name = player.name.string;
    var server = player.server;
    var isX = (axis === 'x');

    for (var i = rangeMin + 2; i < rangeMax - 1; i += 3) {
        var x = isX ? i : borderPos;
        var z = isX ? borderPos : i;
        var dx = isX ? 1.5 : 0.1;
        var dz = isX ? 0.1 : 1.5;
        server.runCommandSilent('particle dust 1 0 0 2 ' + x + ' ' + y + ' ' + z + ' ' + dx + ' 3 ' + dz + ' 0 8 force ' + name);
        server.runCommandSilent('particle dust 1 0.2 0.2 1.5 ' + x + ' ' + (y+2) + ' ' + z + ' ' + dx + ' 2 ' + dz + ' 0 5 force ' + name);
    }

    if (!doSound) return;
    var key = player.uuid.toString() + '_' + direction;
    var now = Date.now();
    if ((now - (lastBorderSound[key] || 0)) > 600) {
        var sx = isX ? player.x : borderPos;
        var sz = isX ? borderPos : player.z;
        server.runCommandSilent('playsound minecraft:block.amethyst_block.chime master ' + name + ' ' + sx + ' ' + y + ' ' + sz + ' 1 ' + (0.5 + Math.random() * 0.3));
        lastBorderSound[key] = now;
    }
}

// BLOCK PROTECTION
// Prevents placing, breaking, and interacting with blocks in unowned chunks

function checkBlockAccess(event) {
    if (!hasTerritory()) return true;
    var player = event.entity;
    if (!player || !player.isPlayer()) return true;
    if (player.creative) return true;

    var cx = Math.floor(event.block.x / 16);
    var cz = Math.floor(event.block.z / 16);
    return global.ChunkTerritory.owns(player.uuid.toString(), cx, cz);
}

function denyBlock(event, player) {
    var b = event.block;
    denyEffect(event.server, player.name.string, b.x + 0.5, b.y + 0.5, b.z + 0.5);
    event.server.scheduleInTicks(1, function() {
        player.inventoryMenu.broadcastFullState();
    });
    event.cancel();
}

BlockEvents.placed(function(event) {
    if (!checkBlockAccess(event)) {
        var player = event.entity;
        if (player && player.isPlayer()) denyBlock(event, player);
        else event.cancel();
    }
});

BlockEvents.broken(function(event) {
    if (!checkBlockAccess(event)) {
        event.cancel();
        var player = event.entity;
        if (player && player.isPlayer()) {
            var b = event.block;
            denyEffect(event.server, player.name.string, b.x + 0.5, b.y + 0.5, b.z + 0.5);
        }
    }
});

BlockEvents.rightClicked(function(event) {
    if (!hasTerritory()) return;
    var player = event.player;
    if (!player || player.creative) return;

    var cx = Math.floor(event.block.x / 16);
    var cz = Math.floor(event.block.z / 16);
    if (!global.ChunkTerritory.owns(player.uuid.toString(), cx, cz)) {
        denyBlock(event, player);
    }
});

// ITEM CONTAINMENT
// Bounces thrown items back when they would cross into unowned territory

EntityEvents.spawned('minecraft:item', function(event) {
    if (!hasTerritory()) return;

    var item = event.entity;
    if (item.level.isClientSide()) return;

    var nbt = item.nbt;
    if (!nbt || !nbt.Thrower || !nbt.Motion) return;

    var throwerUuid = intArrayToUuid(nbt.Thrower);
    var cx = Math.floor(item.x / 16);
    var cz = Math.floor(item.z / 16);

    if (!global.ChunkTerritory.owns(throwerUuid, cx, cz)) return;

    var motionX = nbt.Motion[0], motionZ = nbt.Motion[2];
    var localX = item.x - cx * 16, localZ = item.z - cz * 16;

    // Predict trajectory (8 ticks with drag)
    var predictX = localX + motionX * 8;
    var predictZ = localZ + motionZ * 8;

    var bounceX = false, bounceZ = false;

    if (predictX < 0.5 && !global.ChunkTerritory.owns(throwerUuid, cx - 1, cz)) bounceX = true;
    else if (predictX > 15.5 && !global.ChunkTerritory.owns(throwerUuid, cx + 1, cz)) bounceX = true;

    if (predictZ < 0.5 && !global.ChunkTerritory.owns(throwerUuid, cx, cz - 1)) bounceZ = true;
    else if (predictZ > 15.5 && !global.ChunkTerritory.owns(throwerUuid, cx, cz + 1)) bounceZ = true;

    if (!bounceX && !bounceZ) return;

    var server = event.server;
    var itemUuid = item.uuid.toString();

    // Monitor item and bounce when it reaches the border
    function checkBorder(tick) {
        if (tick > 40) return;

        server.scheduleInTicks(tick, function() {
            var entities = server.getLevel('minecraft:overworld').getEntities().filter(function(e) {
                return e.uuid.toString() === itemUuid;
            });
            if (entities.length === 0) return;

            var e = entities[0];
            var ecx = Math.floor(e.x / 16), ecz = Math.floor(e.z / 16);
            var elocalX = e.x - ecx * 16, elocalZ = e.z - ecz * 16;

            var atBorder = false, bX = false, bZ = false;

            if (bounceX && ((elocalX < 1 && motionX < 0) || (elocalX > 15 && motionX > 0))) { atBorder = true; bX = true; }
            if (bounceZ && ((elocalZ < 1 && motionZ < 0) || (elocalZ > 15 && motionZ > 0))) { atBorder = true; bZ = true; }

            if (atBorder) {
                var curMotion = e.nbt.Motion;
                if (!curMotion) return;
                var nx = bX ? (-curMotion[0] * 0.5) : curMotion[0];
                var nz = bZ ? (-curMotion[2] * 0.5) : curMotion[2];
                server.runCommandSilent('data modify entity ' + itemUuid + ' Motion set value [' + nx + 'd,' + (curMotion[1] + 0.1) + 'd,' + nz + 'd]');
                server.runCommandSilent('playsound minecraft:block.slime_block.hit block @a ' + e.x + ' ' + e.y + ' ' + e.z + ' 0.5 1.2');
            } else {
                checkBorder(tick + 2);
            }
        });
    }

    checkBorder(2);
});

console.log('[territory] Enforce script loaded');
