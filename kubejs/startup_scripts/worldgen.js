// Worldgen - Remove vanilla ore generation and other features

WorldgenEvents.remove((event) => {
  // Remove botania flowers/mushrooms
  event.removeFeatureById("vegetal_decoration", [
    "botania:mystical_flowers",
    "botania:mystical_mushrooms",
  ]);

  // Remove water springs
  event.removeFeatureById("fluid_springs", [
    "minecraft:spring_water",
    "quark:deferred_feature_fluid_springs",
  ]);

  // Remove all ore generation
  event.removeFeatureById("underground_ores", [
    "ore_gravel",
    "minecraft:disc_gravel",
    "minecraft:ore_dirt",
    "minecraft:ore_gravel",
    "minecraft:ore_granite_upper",
    "minecraft:ore_granite_lower",
    "minecraft:ore_diorite_upper",
    "minecraft:ore_diorite_lower",
    "minecraft:ore_andesite_upper",
    "minecraft:ore_andesite_lower",
    "minecraft:ore_tuff",
    "minecraft:ore_coal_upper",
    "minecraft:ore_coal_lower",
    "minecraft:ore_iron_upper",
    "minecraft:ore_iron_middle",
    "minecraft:ore_iron_small",
    "minecraft:ore_gold",
    "minecraft:ore_gold_lower",
    "minecraft:ore_redstone",
    "minecraft:ore_redstone_lower",
    "minecraft:ore_diamond",
    "minecraft:ore_diamond_large",
    "minecraft:ore_diamond_buried",
    "minecraft:ore_lapis",
    "minecraft:ore_lapis_buried",
    "minecraft:ore_copper",
    "minecraft:disk_sand",
    "minecraft:disk_clay",
    "minecraft:disk_gravel",
    "create:striated_ores_overworld",
    "create:zinc_ore",
    "quark:deferred_feature_underground_ores",
  ]);

  // Remove any remaining ores by block type
  event.removeOres((props) => {
    props.blocks = [
      "minecraft:nether_quartz_ore",
      "minecraft:diamond_ore",
      "minecraft:redstone_ore",
      "minecraft:iron_ore",
      "minecraft:gold_ore",
      "minecraft:copper_ore",
      "minecraft:lapis_ore",
      "minecraft:emerald_ore",
    ];
  });
});
