// Chunk Territory Commands

var IntegerArgumentType = Java.loadClass('com.mojang.brigadier.arguments.IntegerArgumentType');
var EntityArgument = Java.loadClass('net.minecraft.commands.arguments.EntityArgument');

// Initialize ChunkTerritory if not exists, always update functions
if (!global.ChunkTerritory) {
    global.ChunkTerritory = { chunks: {} };
}

global.ChunkTerritory.owns = function(playerUuid, cx, cz) {
    var key = cx + ',' + cz;
    var data = global.ChunkTerritory.chunks[key];
    if (!data) return false;
    var uuid = typeof data === 'string' ? data : data.uuid;
    return uuid === playerUuid;
};

global.ChunkTerritory.getOwner = function(cx, cz) {
    var key = cx + ',' + cz;
    var data = global.ChunkTerritory.chunks[key];
    if (!data) return null;
    return typeof data === 'string' ? data : data.uuid;
};

global.ChunkTerritory.save = function(server) {
    try {
        var level = server.getLevel('minecraft:overworld');
        if (level) {
            level.persistentData.putString('chunkTerritory', JSON.stringify(global.ChunkTerritory.chunks));
        }
    } catch(e) {
        console.log('[territory] Save error: ' + e);
    }
};

global.ChunkTerritory.load = function(server) {
    try {
        var level = server.getLevel('minecraft:overworld');
        if (level && level.persistentData.contains('chunkTerritory')) {
            global.ChunkTerritory.chunks = JSON.parse(level.persistentData.getString('chunkTerritory'));
            console.log('[territory] Loaded ' + Object.keys(global.ChunkTerritory.chunks).length + ' chunks');
        }
    } catch(e) {
        console.log('[territory] Load error: ' + e);
    }
};

ServerEvents.loaded(function(event) {
    global.ChunkTerritory.load(event.server);
});

// Tick handler for chunk expirations
ServerEvents.tick(function(event) {
    if (!global.ChunkTerritory) return;
    if (event.server.tickCount % 20 !== 0) return;

    var chunks = global.ChunkTerritory.chunks;
    var currentTick = event.server.tickCount;
    var toDelete = [];

    for (var key in chunks) {
        var data = chunks[key];
        if (typeof data === 'string') continue; // old format
        if (data.expiry && currentTick >= data.expiry) {
            toDelete.push({ key: key, uuid: data.uuid });
        }
    }

    for (var i = 0; i < toDelete.length; i++) {
        var item = toDelete[i];
        var parts = item.key.split(',');
        delete chunks[item.key];

        var players = event.server.players;
        for (var j = 0; j < players.size(); j++) {
            var p = players.get(j);
            if (p.uuid.toString() === item.uuid) {
                p.tell('Chunk [' + parts[0] + ', ' + parts[1] + '] expired');
                break;
            }
        }
    }
});

// Helper functions
function getSourceChunk(ctx) {
    var pos = ctx.source.position;
    return { x: Math.floor(pos.x() / 16), z: Math.floor(pos.z() / 16) };
}

function getLocalPos(ctx) {
    var pos = ctx.source.position;
    var cx = Math.floor(pos.x() / 16);
    var cz = Math.floor(pos.z() / 16);
    return { x: pos.x() - cx * 16, z: pos.z() - cz * 16 };
}

// Add chunk with consistent format
function addChunk(uuid, cx, cz, expiryTick) {
    var key = cx + ',' + cz;
    global.ChunkTerritory.chunks[key] = { uuid: uuid, expiry: expiryTick || null };
}

// Spawn green border particles on the shared edge
function spawnClaimParticles(server, cx, cz, srcX, srcY, srcZ) {
    var minX = cx * 16, maxX = (cx + 1) * 16;
    var minZ = cz * 16, maxZ = (cz + 1) * 16;
    var srcCx = Math.floor(srcX / 16);
    var srcCz = Math.floor(srcZ / 16);

    var borderPos, axis;
    if (srcCx < cx) { borderPos = minX; axis = 'z'; }
    else if (srcCx > cx) { borderPos = maxX; axis = 'z'; }
    else if (srcCz < cz) { borderPos = minZ; axis = 'x'; }
    else { borderPos = maxZ; axis = 'x'; }

    var rangeMin = (axis === 'x') ? minX : minZ;
    var rangeMax = (axis === 'x') ? maxX : maxZ;
    var isX = (axis === 'x');

    for (var i = rangeMin + 2; i < rangeMax - 1; i += 3) {
        var x = isX ? i : borderPos;
        var z = isX ? borderPos : i;
        var dx = isX ? 1.5 : 0.1;
        var dz = isX ? 0.1 : 1.5;
        server.runCommandSilent('particle dust 0 1 0 2 ' + x + ' ' + srcY + ' ' + z + ' ' + dx + ' 3 ' + dz + ' 0 8 force');
        server.runCommandSilent('particle dust 0.2 1 0.2 1.5 ' + x + ' ' + (srcY + 2) + ' ' + z + ' ' + dx + ' 2 ' + dz + ' 0 5 force');
    }

    server.runCommandSilent('playsound minecraft:block.beacon.activate block @a ' + srcX + ' ' + srcY + ' ' + srcZ + ' 1 1.2');
}

function addAdjacentChunk(ctx, targetPlayer, ticks) {
    if (!global.ChunkTerritory) { ctx.source.sendFailure('Not initialized'); return 0; }

    var chunk = getSourceChunk(ctx);
    var local = getLocalPos(ctx);

    var distW = local.x, distE = 16 - local.x;
    var distN = local.z, distS = 16 - local.z;
    var min = Math.min(distW, distE, distN, distS);

    var adjX = chunk.x, adjZ = chunk.z;
    if (min === distW) adjX = chunk.x - 1;
    else if (min === distE) adjX = chunk.x + 1;
    else if (min === distN) adjZ = chunk.z - 1;
    else adjZ = chunk.z + 1;

    var uuid = targetPlayer.uuid.toString();
    var expiryTick = ticks > 0 ? ctx.source.server.tickCount + ticks : null;
    addChunk(uuid, adjX, adjZ, expiryTick);

    var pos = ctx.source.position;
    spawnClaimParticles(ctx.source.server, adjX, adjZ, pos.x(), pos.y(), pos.z());

    var targetName = targetPlayer.name.string;
    if (ticks > 0) {
        ctx.source.sendSuccess('Added chunk [' + adjX + ', ' + adjZ + '] for ' + targetName + ' for ' + ticks + ' ticks', true);
    } else {
        ctx.source.sendSuccess('Added chunk [' + adjX + ', ' + adjZ + '] for ' + targetName, true);
    }
    return 1;
}

ServerEvents.commandRegistry(function(event) {
    var Commands = event.commands;

    event.register(
        Commands.literal('territory')
            .requires(function(s) { return s.hasPermission(2); })

            .then(Commands.literal('add')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) { ctx.source.sendFailure('Not initialized'); return 0; }
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        var pos = ctx.source.position;
                        addChunk(target.uuid.toString(), chunk.x, chunk.z, null);
                        spawnClaimParticles(ctx.source.server, chunk.x, chunk.z, pos.x(), pos.y(), pos.z());
                        ctx.source.sendSuccess('Added chunk [' + chunk.x + ', ' + chunk.z + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_adjacent')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        return addAdjacentChunk(ctx, target, 0);
                    })
                    .then(Commands.argument('ticks', IntegerArgumentType.integer(1))
                        .executes(function(ctx) {
                            var target = EntityArgument.getPlayer(ctx, 'player');
                            return addAdjacentChunk(ctx, target, IntegerArgumentType.getInteger(ctx, 'ticks'));
                        })
                    )
                )
            )

            .then(Commands.literal('add_north')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        var pos = ctx.source.position;
                        var cx = chunk.x, cz = chunk.z - 1;
                        addChunk(target.uuid.toString(), cx, cz, null);
                        spawnClaimParticles(ctx.source.server, cx, cz, pos.x(), pos.y(), pos.z());
                        ctx.source.sendSuccess('Added chunk [' + cx + ', ' + cz + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_south')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        var pos = ctx.source.position;
                        var cx = chunk.x, cz = chunk.z + 1;
                        addChunk(target.uuid.toString(), cx, cz, null);
                        spawnClaimParticles(ctx.source.server, cx, cz, pos.x(), pos.y(), pos.z());
                        ctx.source.sendSuccess('Added chunk [' + cx + ', ' + cz + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_east')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        var pos = ctx.source.position;
                        var cx = chunk.x + 1, cz = chunk.z;
                        addChunk(target.uuid.toString(), cx, cz, null);
                        spawnClaimParticles(ctx.source.server, cx, cz, pos.x(), pos.y(), pos.z());
                        ctx.source.sendSuccess('Added chunk [' + cx + ', ' + cz + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('add_west')
                .then(Commands.argument('player', EntityArgument.player())
                    .executes(function(ctx) {
                        if (!global.ChunkTerritory) return 0;
                        var target = EntityArgument.getPlayer(ctx, 'player');
                        var chunk = getSourceChunk(ctx);
                        var pos = ctx.source.position;
                        var cx = chunk.x - 1, cz = chunk.z;
                        addChunk(target.uuid.toString(), cx, cz, null);
                        spawnClaimParticles(ctx.source.server, cx, cz, pos.x(), pos.y(), pos.z());
                        ctx.source.sendSuccess('Added chunk [' + cx + ', ' + cz + '] for ' + target.name.string, true);
                        return 1;
                    })
                )
            )

            .then(Commands.literal('remove')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunk = getSourceChunk(ctx);
                    var key = chunk.x + ',' + chunk.z;
                    delete global.ChunkTerritory.chunks[key];
                    ctx.source.sendSuccess('Removed chunk [' + chunk.x + ', ' + chunk.z + ']', true);
                    return 1;
                })
            )

            .then(Commands.literal('info')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunk = getSourceChunk(ctx);
                    var key = chunk.x + ',' + chunk.z;
                    var data = global.ChunkTerritory.chunks[key];

                    ctx.source.sendSuccess('Chunk [' + chunk.x + ', ' + chunk.z + ']:', false);
                    ctx.source.sendSuccess('  Key: ' + key, false);
                    ctx.source.sendSuccess('  Data type: ' + (typeof data), false);
                    ctx.source.sendSuccess('  Data: ' + JSON.stringify(data), false);

                    var player = ctx.source.player;
                    if (player) {
                        var playerUuid = player.uuid.toString();
                        ctx.source.sendSuccess('  Your UUID: ' + playerUuid, false);

                        // Manual owns check
                        var storedUuid = data ? (typeof data === 'string' ? data : data.uuid) : null;
                        ctx.source.sendSuccess('  Stored UUID: ' + storedUuid, false);
                        ctx.source.sendSuccess('  Match: ' + (storedUuid === playerUuid), false);
                        ctx.source.sendSuccess('  owns(): ' + global.ChunkTerritory.owns(playerUuid, chunk.x, chunk.z), false);
                    }
                    return 1;
                })
            )

            .then(Commands.literal('list')
                .executes(function(ctx) {
                    if (!global.ChunkTerritory) return 0;
                    var chunks = global.ChunkTerritory.chunks;
                    var keys = Object.keys(chunks);
                    ctx.source.sendSuccess('Owned chunks: ' + keys.length, false);
                    for (var i = 0; i < keys.length; i++) {
                        var data = chunks[keys[i]];
                        var info = typeof data === 'string' ? data : (data.uuid + (data.expiry ? ' (expires tick ' + data.expiry + ')' : ''));
                        ctx.source.sendSuccess('  ' + keys[i] + ' -> ' + info, false);
                    }
                    return 1;
                })
            )
    );
});

console.log('[territory] Commands script loaded');
