//priority: 1
//Create Prepare to Dye 2 - Lychee Recipes (Block Interactions)

ServerEvents.recipes((event) => {
  // Ore generation from dyes
  // Basic ores (stone variants)
  var basicOres = {
    iron_ore: "minecraft:white_dye",
    redstone_ore: "minecraft:red_dye",
    copper_ore: "minecraft:orange_dye",
    coal_ore: "minecraft:black_dye",
  };

  var basicOreKeys = Object.keys(basicOres);
  for (var i = 0; i < basicOreKeys.length; i++) {
    var ore = basicOreKeys[i];
    var dye = basicOres[ore];
    event.custom({
      type: "lychee:block_interacting",
      item_in: { item: dye },
      block_in: "minecraft:stone",
      post: [
        { type: "place", block: "minecraft:" + ore },
      ],
    });
    event.custom({
      type: "lychee:block_interacting",
      item_in: { item: dye },
      block_in: "minecraft:deepslate",
      post: [
        { type: "place", block: "minecraft:deepslate_" + ore },
      ],
    });
  }

  // Deepslate-only ores
  var deepslateOnlyOres = {
    deepslate_emerald_ore: "minecraft:lime_dye",
    deepslate_lapis_ore: "minecraft:blue_dye",
    deepslate_diamond_ore: "minecraft:light_blue_dye",
    deepslate_gold_ore: "minecraft:yellow_dye",
  };

  var deepslateOreKeys = Object.keys(deepslateOnlyOres);
  for (var j = 0; j < deepslateOreKeys.length; j++) {
    var dsOre = deepslateOreKeys[j];
    var dsDye = deepslateOnlyOres[dsOre];
    event.custom({
      type: "lychee:block_interacting",
      item_in: { item: dsDye },
      block_in: "minecraft:deepslate",
      post: [
        { type: "place", block: "minecraft:" + dsOre },
      ],
    });
  }

  // Nether ores
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:yellow_dye" },
    block_in: "minecraft:netherrack",
    post: [
      { type: "place", block: "minecraft:nether_gold_ore" },
    ],
  });

  // Raw ore from concrete powder
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:white_dye" },
    block_in: "minecraft:white_concrete_powder",
    post: [
      { type: "drop_item", item: "minecraft:raw_iron" },
    ],
  });

  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:orange_dye" },
    block_in: "minecraft:orange_concrete_powder",
    post: [
      { type: "drop_item", item: "minecraft:raw_copper" },
    ],
  });

  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:yellow_dye" },
    block_in: "minecraft:yellow_concrete_powder",
    post: [
      { type: "drop_item", item: "minecraft:raw_gold" },
    ],
  });

  // Soul sand from sand and brown dye
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:brown_dye" },
    block_in: { tag: "forge:sand" },
    post: [
      { type: "place", block: "minecraft:soul_sand" },
    ],
  });

  // Magma block to lava
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "create:blaze_cake" },
    block_in: "minecraft:magma_block",
    post: [
      { type: "place", block: "minecraft:lava" },
    ],
  });

  // Water duplication from kelp/seagrass
  event.custom({
    type: "lychee:block_interacting",
    item_in: [{ item: "minecraft:kelp" }, { item: "minecraft:seagrass" }],
    block_in: "minecraft:water",
    post: [
      { type: "place", block: "minecraft:water" },
    ],
  });

  // Chorus flower from chorus batch
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:bone_meal" },
    block_in: "quark:chorus_fruit_block",
    post: [
      { type: "drop_item", item: "minecraft:chorus_flower" },
    ],
  });

  // DEAD PLANET - grow dead bush from white concrete powder with bone meal
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:bone_meal" },
    block_in: "minecraft:white_concrete_powder",
    post: [
      { type: "place", block: "minecraft:dead_bush", offset: [0, 1, 0] },
    ],
  });

  // Grass growth with bone meal
  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:bone_meal" },
    block_in: "minecraft:grass_block",
    post: [
      { type: "place", block: "minecraft:short_grass", offset: [0, 1, 0] },
    ],
  });

  event.custom({
    type: "lychee:block_interacting",
    item_in: { item: "minecraft:bone_meal" },
    block_in: "minecraft:short_grass",
    post: [
      { type: "place", block: "minecraft:tall_grass" },
    ],
  });

  // DEAD PLANET - dripping from grass creates dead bush
  // event.custom({
  //   type: "lychee:dripstone_dripping",
  //   block_in: "minecraft:grass_block",
  //   post: [
  //     { type: "drop_item", item: "minecraft:dead_bush" },
  //   ],
  // });
});
