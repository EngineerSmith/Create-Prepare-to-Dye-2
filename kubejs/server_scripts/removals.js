//priority: 2
//Create Prepare to Dye 2 - Removals
//This file contains recipe and item removals that don't fit neatly into other category files

// All items that should be completely removed (recipes removed + hidden from viewers)
var REMOVED_ITEMS = [
  // Botania crafty crate patterns
  "botania:pattern_1_1", "botania:pattern_2_2", "botania:pattern_1_2",
  "botania:pattern_2_1", "botania:pattern_1_3", "botania:pattern_3_1",
  "botania:pattern_2_3", "botania:pattern_3_2", "botania:pattern_donut",

  // Wooden tools
  "minecraft:wooden_pickaxe", "minecraft:wooden_axe", "minecraft:wooden_shovel",
  "minecraft:wooden_hoe", "minecraft:wooden_sword",

  // Saplings
  "minecraft:oak_sapling", "minecraft:spruce_sapling", "minecraft:birch_sapling",
  "minecraft:jungle_sapling", "minecraft:acacia_sapling", "minecraft:dark_oak_sapling",
  "quark:blue_blossom_sapling", "quark:orange_blossom_sapling", "quark:lavender_blossom_sapling",
  "quark:pink_blossom_sapling", "quark:yellow_blossom_sapling", "quark:red_blossom_sapling",

  // Nether fungi
  "minecraft:warped_fungus", "minecraft:crimson_fungus",

  // Easy Villagers
  "easy_villagers:breeder", "easy_villagers:converter", "easy_villagers:incubator",
  "easy_villagers:trader", "easy_villagers:farmer", "easy_villagers:iron_farm",

  // Iron tools (keep axe)
  "minecraft:iron_hoe", "minecraft:iron_pickaxe", "minecraft:iron_shovel", "minecraft:iron_sword",

  // Diamond tools (keep pickaxe)
  "minecraft:diamond_axe", "minecraft:diamond_hoe", "minecraft:diamond_shovel", "minecraft:diamond_sword",

  // Netherite tools (keep sword)
  "minecraft:netherite_axe", "minecraft:netherite_hoe", "minecraft:netherite_shovel", "minecraft:netherite_pickaxe",

  // Manasteel tools (keep shovel)
  "botania:manasteel_axe", "botania:manasteel_hoe", "botania:manasteel_pick", "botania:manasteel_sword",

  // Botania cosmetic trinkets
  "botania:cosmetic_black_bowtie", "botania:cosmetic_black_tie", "botania:cosmetic_red_glasses",
  "botania:cosmetic_puffy_scarf", "botania:cosmetic_engineer_goggles", "botania:cosmetic_eyepatch",
  "botania:cosmetic_wicked_eyepatch", "botania:cosmetic_red_ribbons", "botania:cosmetic_pink_flower_bud",
  "botania:cosmetic_polka_dotted_bows", "botania:cosmetic_blue_butterfly", "botania:cosmetic_cat_ears",
  "botania:cosmetic_witch_pin", "botania:cosmetic_devil_tail", "botania:cosmetic_kamui_eye",
  "botania:cosmetic_googly_eyes", "botania:cosmetic_four_leaf_clover", "botania:cosmetic_clock_eye",
  "botania:cosmetic_unicorn_horn", "botania:cosmetic_devil_horns", "botania:cosmetic_hyper_plus",
  "botania:cosmetic_botanist_emblem", "botania:cosmetic_ancient_mask", "botania:cosmetic_eerie_mask",
  "botania:cosmetic_alien_antenna", "botania:cosmetic_anaglyph_glasses", "botania:cosmetic_orange_shades",
  "botania:cosmetic_groucho_glasses", "botania:cosmetic_thick_eyebrows", "botania:cosmetic_lusitanic_shield",
  "botania:cosmetic_tiny_potato_mask", "botania:cosmetic_questgiver_mark", "botania:cosmetic_thinking_hand",

  // Botania brews
  "botania:brew_vial", "botania:brew_flask", "botania:incense_stick", "botania:blood_pendant",

  // Botania personal improvement trinkets
  "botania:travel_belt", "botania:super_travel_belt", "botania:speed_up_belt", "botania:knockback_belt",
  "botania:ice_pendant", "botania:lava_pendant", "botania:super_lava_pendant", "botania:cloud_pendant",
  "botania:super_cloud_pendant", "botania:swap_ring", "botania:dodge_ring", "botania:mining_ring",
  "botania:pixie_ring", "botania:reach_ring", "botania:water_ring", "botania:magnet_ring",
  "botania:magnet_ring_greater", "botania:aura_ring", "botania:aura_ring_greater", "botania:mana_ring",
  "botania:mana_ring_greater", "botania:flight_tiara", "botania:itemfinder", "botania:diva_charm",
  "botania:goddess_charm", "botania:tiny_planet", "botania:invisibility_cloak", "botania:balance_cloak",
  "botania:unholy_cloak", "botania:holy_cloak", "botania:third_eye",

  // Botania relics
  "botania:king_key", "botania:infinite_fruit", "botania:dice", "botania:loki_ring",
  "botania:odin_ring", "botania:thor_ring", "botania:flugel_eye",

  // Botania flowers that don't fit
  "botania:solensolegnolia", "botania:solegnolia_chibi", "botania:floating_solensolegnolia", "botania:floating_solegnolia",
  "botania:bubbell", "botania:bubbell_chibi", "botania:floating_bubbell", "botania:floating_bubbell_chibi",

  // Botania rods (keep dirt_rod, tornado_rod, rainbow_rod)
  "botania:missile_rod", "botania:cobble_rod", "botania:water_rod", "botania:fire_rod",
  "botania:divining_rod", "botania:smelt_rod", "botania:exchange_rod", "botania:gravity_rod",
  "botania:skydirt_rod", "botania:terraform_rod",

  // Diesel generators unused items
  "createdieselgenerators:chemical_sprayer", "createdieselgenerators:chemical_sprayer_lighter",
  "createdieselgenerators:chip_wood_block", "createdieselgenerators:chip_wood_slab",
  "createdieselgenerators:chip_wood_stairs", "createdieselgenerators:engine_piston",
  "createdieselgenerators:engine_silencer", "createdieselgenerators:lighter",
  "createdieselgenerators:oil_scanner", "createdieselgenerators:large_diesel_engine",
  "createdieselgenerators:pumpjack_bearing", "createdieselgenerators:pumpjack_head",
  "createdieselgenerators:pumpjack_crank", "createdieselgenerators:asphalt_block",
  "createdieselgenerators:asphalt_slab", "createdieselgenerators:asphalt_stairs",
  "createdieselgenerators:kelp_handle", "createdieselgenerators:oil_barrel",
  "createdieselgenerators:pumpjack_hole",

  // Botania misc tools
  "botania:phantom_ink", "botania:ender_hand", "botania:thorn_chakram", "botania:spawner_mover",
  "botania:terra_pick", "botania:glass_pickaxe", "botania:terra_axe", "botania:terra_sword",
  "botania:star_sword", "botania:thunder_sword", "botania:ender_dagger", "botania:crystal_bow",
  "botania:slime_bottle", "botania:astrolabe", "botania:bauble_box", "botania:clip",
  "botania:mana_gun", "botania:dreamwood_wand", "botania:slingshot", "botania:vine_ball",
  "botania:world_seed", "botania:black_hole_talisman", "botania:temperance_stone", "botania:flare_chakram",

  // Create Enchantment Industry
  "create_enchantment_industry:experience_rotor",

  // Furnace variants
  "minecraft:blast_furnace",
  "minecraft:smoker",
  "minecraft:furnace",

  // Enchanting table (enchanting via different method)
  "minecraft:enchanting_table",

  // End portal frame
  "minecraft:end_portal_frame",

  // Non-oak boats (replaced by generic boat recipe)
  "minecraft:acacia_boat", "minecraft:birch_boat", "minecraft:dark_oak_boat",
  "minecraft:jungle_boat", "minecraft:spruce_boat", "minecraft:mangrove_boat",
  "minecraft:cherry_boat", "minecraft:bamboo_raft",
  "minecraft:acacia_chest_boat", "minecraft:birch_chest_boat", "minecraft:dark_oak_chest_boat",
  "minecraft:jungle_chest_boat", "minecraft:spruce_chest_boat", "minecraft:mangrove_chest_boat",
  "minecraft:cherry_chest_boat", "minecraft:bamboo_chest_raft",
  "quark:blossom_boat", "quark:blossom_chest_boat"
];

ServerEvents.recipes(function(event) {
  // Charm cyan dye
  event.remove({ id: "charm:extra_recipes/cyan_dye" });

  // Vanilla honey bottle
  event.remove({ id: "minecraft:honey_bottle" });

  // Vanilla andesite recipe
  event.remove({ id: "minecraft:andesite" });

  // Vanilla polished andesite
  event.remove({ id: "minecraft:polished_andesite" });

  // Vanilla bone meal from bones
  event.remove({ id: "minecraft:bone_meal" });

  // Remove crafting table
  // event.remove({ output: "minecraft:crafting_table" });

  // Crossbow recipe
  event.remove({ id: "minecraft:crossbow" });

  // Botania mushroom stew
  event.remove({ id: "botania:mushroom_stew" });

  // Botania mana powder dye
  event.remove({ id: "botania:mana_infusion/mana_powder_dye" });

  // Botania red string
  event.remove({ id: "botania:red_string" });
  event.remove({ id: "botania:red_string_alt" });

  // Botania apothecary types
  var apothecaryTypes = [
    "forest", "plains", "mountain", "fungal", "swamp", "jungle", "taiga", "mesa", "mossy", "livingrock", "deepslate"
  ];
  for (var i = 0; i < apothecaryTypes.length; i++) {
    event.remove({ id: "botania:apothecary_" + apothecaryTypes[i] });
  }

  // Botania laputa shard
  event.remove({ id: "botania:laputa_shard" });

  // Copycats mod recipes (handled by device system)
  event.remove({ mod: "copycats" });

  // Old cogwheel deploying
  event.remove({ id: "create:deploying/large_cogwheel" });

  // AE2 recipe types
  event.remove({ type: "ae2:inscriber" });
  event.remove({ type: "ae2:entropy" });
  event.remove({ type: "ae2:condenser" });
  event.remove({ type: "ae2:matter_cannon" });

  // Stick recipes
  event.remove({ id: "minecraft:stick_from_bamboo_item" });
  event.remove({ id: "quark:tweaks/crafting/utility/misc/easy_sticks" });
  event.remove({ id: "quark:tweaks/crafting/utility/misc/easy_sticks_bamboo" });

  // Haunting soul campfire
  event.remove({ id: "create:haunting/soul_campfire" });
  event.remove({ id: "minecraft:soul_campfire" });
  event.remove({ id: "minecraft:soul_torch" });

  // Supplementaries
  event.remove({ id: "supplementaries:pancake" });

  // Nether fungi haunting
  event.remove({ id: "create:haunting/crimson_fungus" });
  event.remove({ id: "create:haunting/warped_fungus" });

  // Wares delivery table (obtained differently)
  event.remove({ id: "wares:delivery_table" });

  // Vanilla boat recipes (replaced by generic recipe in crafting.js)
  event.remove({ id: "minecraft:oak_boat" });
  event.remove({ id: "quark:tweaks/crafting/utility/chest_boat/direct_oak_chest_boat" });

  // Remove all recipes for removed items
  for (var i = 0; i < REMOVED_ITEMS.length; i++) {
    event.remove({ output: REMOVED_ITEMS[i] });
  }

  // Replace shulker shell with purple dye in recipes
  event.replaceInput({}, "minecraft:shulker_shell", "#forge:dyes/purple");
});

ServerEvents.tags("item", function(event) {
  // Hide all removed items from recipe viewers
  for (var i = 0; i < REMOVED_ITEMS.length; i++) {
    event.removeAllTagsFrom(REMOVED_ITEMS[i]);
    event.add("c:hidden_from_recipe_viewers", REMOVED_ITEMS[i]);
    event.add("c:removed", REMOVED_ITEMS[i]);
  }
});
