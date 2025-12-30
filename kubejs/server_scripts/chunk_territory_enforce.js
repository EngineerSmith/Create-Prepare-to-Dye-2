// Chunk Territory Enforcement

var playerWasOutside = {};

// Spectator mode enforcement
PlayerEvents.tick(function(event) {
    try {
        if (!global.ChunkTerritory) return;

        var player = event.player;
        // OP bypass disabled for testing
        // if (player.hasPermissions(2)) return;

        var uuid = player.uuid.toString();

        // If no territories are registered, do nothing (and un-stick players we forced into spectator).
        var chunks = global.ChunkTerritory.chunks;
        var hasAny = chunks && Object.keys(chunks).length > 0;
        if (!hasAny) {
            if (playerWasOutside[uuid]) {
                playerWasOutside[uuid] = false;
                if (player.spectator) {
                    player.setGameMode('survival');
                    player.tell('Territory enforcement disabled (no territories registered)');
                }
            }
            return;
        }

        var cx = player.chunkPosition().x;
        var cz = player.chunkPosition().z;

        var owns = global.ChunkTerritory.owns(uuid, cx, cz);
        var wasOutside = playerWasOutside[uuid] || false;

        if (!owns && !wasOutside) {
            playerWasOutside[uuid] = true;
            player.setGameMode('spectator');
            player.tell('You do not own this chunk');
            player.server.runCommandSilent('playsound minecraft:block.respawn_anchor.charge master ' + player.name.string + ' ' + player.x + ' ' + player.y + ' ' + player.z + ' 1 0.5');
        } else if (owns && wasOutside) {
            playerWasOutside[uuid] = false;
            // Check if player would suffocate - scan upward for safe spot
            var px = Math.floor(player.x);
            var py = Math.floor(player.y);
            var pz = Math.floor(player.z);
            var level = player.level;

            var feetId = level.getBlock(px, py, pz).id + '';
            var headId = level.getBlock(px, py + 1, pz).id + '';
            var feetSolid = feetId.indexOf('air') === -1 && feetId !== 'minecraft:water';
            var headSolid = headId.indexOf('air') === -1 && headId !== 'minecraft:water';

            if (feetSolid || headSolid) {
                for (var checkY = py; checkY < py + 50; checkY++) {
                    var f = level.getBlock(px, checkY, pz).id + '';
                    var h = level.getBlock(px, checkY + 1, pz).id + '';
                    if ((f.indexOf('air') !== -1 || f === 'minecraft:water') &&
                        (h.indexOf('air') !== -1 || h === 'minecraft:water')) {
                        player.teleportTo(player.x, checkY, player.z);
                        break;
                    }
                }
            }
            player.setGameMode('survival');
            player.tell('Welcome back');
            player.server.runCommandSilent('playsound minecraft:block.respawn_anchor.charge master ' + player.name.string + ' ' + player.x + ' ' + player.y + ' ' + player.z + ' 1 1.5');
        }
    } catch(e) {
        console.log('[territory] spectator error: ' + e);
    }
});

// Border particles - debug version
PlayerEvents.tick(function(event) {
    try {
        if (!global.ChunkTerritory) return;
        var chunks = global.ChunkTerritory.chunks;
        if (!chunks || Object.keys(chunks).length === 0) return;

        var tick = event.server.tickCount;
        if (tick % 5 !== 0) return;  // 4 times per second

        var player = event.player;
        if (player.spectator) return;
        // if (player.hasPermissions(2)) return;

        var uuid = player.uuid.toString();
        var cx = player.chunkPosition().x;
        var cz = player.chunkPosition().z;
        var px = player.x;
        var pz = player.z;
        var py = player.y;

        var localX = px - (cx * 16);
        var localZ = pz - (cz * 16);

        // Debug every 5 seconds
        if (tick % 100 === 0) {
            console.log('[territory] chunk[' + cx + ',' + cz + '] local[' + localX.toFixed(1) + ',' + localZ.toFixed(1) + ']');
            console.log('[territory] neighbors: W=' + !global.ChunkTerritory.owns(uuid, cx-1, cz) +
                ' E=' + !global.ChunkTerritory.owns(uuid, cx+1, cz) +
                ' N=' + !global.ChunkTerritory.owns(uuid, cx, cz-1) +
                ' S=' + !global.ChunkTerritory.owns(uuid, cx, cz+1));
            console.log('[territory] near edge: W=' + (localX < 4) + ' E=' + (localX > 12) + ' N=' + (localZ < 4) + ' S=' + (localZ > 12));
        }

        // West edge - particles at 4 blocks, sound at 1 block
        if (localX < 4) {
            if (!global.ChunkTerritory.owns(uuid, cx - 1, cz)) {
                spawnBorder(player, cx * 16, py, pz, 'z', 'west', localX < 1);
            }
        }
        // East edge
        if (localX > 12) {
            if (!global.ChunkTerritory.owns(uuid, cx + 1, cz)) {
                spawnBorder(player, (cx + 1) * 16, py, pz, 'z', 'east', localX > 15);
            }
        }
        // North edge
        if (localZ < 4) {
            if (!global.ChunkTerritory.owns(uuid, cx, cz - 1)) {
                spawnBorder(player, px, py, cz * 16, 'x', 'north', localZ < 1);
            }
        }
        // South edge
        if (localZ > 12) {
            if (!global.ChunkTerritory.owns(uuid, cx, cz + 1)) {
                spawnBorder(player, px, py, (cz + 1) * 16, 'x', 'south', localZ > 15);
            }
        }
    } catch(e) {
        console.log('[territory] particles error: ' + e);
    }
});

var lastBorderSound = {};  // uuid_direction -> timestamp

function spawnBorder(player, x, y, z, axis, direction, playSound) {
    var name = player.name.string;
    var server = player.server;

    // Big red dust particles
    if (axis === 'x') {
        server.runCommandSilent('particle dust 1 0 0 2 ' + x + ' ' + y + ' ' + z + ' 6 4 0.1 0 40 force ' + name);
        server.runCommandSilent('particle dust 1 0.2 0.2 1.5 ' + x + ' ' + (y+2) + ' ' + z + ' 6 2 0.1 0 40 force ' + name);
    } else {
        server.runCommandSilent('particle dust 1 0 0 2 ' + x + ' ' + y + ' ' + z + ' 0.1 4 6 0 40 force ' + name);
        server.runCommandSilent('particle dust 1 0.2 0.2 1.5 ' + x + ' ' + (y+2) + ' ' + z + ' 0.1 2 6 0 40 force ' + name);
    }

    // Warning sound only within 1 block of edge
    if (!playSound) return;

    var key = player.uuid.toString() + '_' + direction;
    var now = Date.now();
    var elapsed = lastBorderSound[key] ? (now - lastBorderSound[key]) : 9999;
    if (elapsed > 600) {
        var pitch = 0.5 + Math.random() * 0.3;
        server.runCommandSilent('playsound minecraft:block.amethyst_block.chime master ' + name + ' ' + x + ' ' + y + ' ' + z + ' 1 ' + pitch);
        lastBorderSound[key] = now;
    }
}

// Block protection
BlockEvents.placed(function(event) {
    try {
        if (!global.ChunkTerritory) return;
        var chunks = global.ChunkTerritory.chunks;
        if (!chunks || Object.keys(chunks).length === 0) return;
        var player = event.entity;
        if (!player || !player.isPlayer()) return;
        // if (player.hasPermissions(2)) return;

        var cx = Math.floor(event.block.x / 16);
        var cz = Math.floor(event.block.z / 16);

        if (!global.ChunkTerritory.owns(player.uuid.toString(), cx, cz)) {
            event.cancel();
        }
    } catch(e) {
        console.log('[territory] place error: ' + e);
    }
});

BlockEvents.broken(function(event) {
    try {
        if (!global.ChunkTerritory) return;
        var chunks = global.ChunkTerritory.chunks;
        if (!chunks || Object.keys(chunks).length === 0) return;
        var player = event.entity;
        if (!player || !player.isPlayer()) return;
        // if (player.hasPermissions(2)) return;

        var cx = Math.floor(event.block.x / 16);
        var cz = Math.floor(event.block.z / 16);

        if (!global.ChunkTerritory.owns(player.uuid.toString(), cx, cz)) {
            event.cancel();
        }
    } catch(e) {
        console.log('[territory] break error: ' + e);
    }
});

console.log('[territory] Enforce script loaded');
