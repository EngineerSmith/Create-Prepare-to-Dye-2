//priority: 2
//Create Prepare to Dye 2 - Recipe Removals
//This file contains recipe removals that don't fit neatly into other category files

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

  // Create Enchantment Industry - experience rotor removed
  event.remove({ output: "create_enchantment_industry:experience_rotor" });

  // Botania crafty crate patterns (makes unpacking too easy)
  var patterns = [
    "botania:pattern_1_1", "botania:pattern_2_2", "botania:pattern_1_2",
    "botania:pattern_2_1", "botania:pattern_1_3", "botania:pattern_3_1",
    "botania:pattern_2_3", "botania:pattern_3_2", "botania:pattern_donut"
  ];
  for (var i = 0; i < patterns.length; i++) {
    event.remove({ output: patterns[i] });
  }

  // Wooden tools (removed from game)
  var woodenTools = [
    "minecraft:wooden_pickaxe",
    "minecraft:wooden_axe",
    "minecraft:wooden_shovel",
    "minecraft:wooden_hoe",
    "minecraft:wooden_sword"
  ];
  for (var i = 0; i < woodenTools.length; i++) {
    event.remove({ output: woodenTools[i] });
  }

  // Saplings (trees grow differently in this pack)
  var saplings = [
    "minecraft:oak_sapling",
    "minecraft:spruce_sapling",
    "minecraft:birch_sapling",
    "minecraft:jungle_sapling",
    "minecraft:acacia_sapling",
    "minecraft:dark_oak_sapling",
    "quark:blue_blossom_sapling",
    "quark:orange_blossom_sapling",
    "quark:lavender_blossom_sapling",
    "quark:pink_blossom_sapling",
    "quark:yellow_blossom_sapling",
    "quark:red_blossom_sapling"
  ];
  for (var i = 0; i < saplings.length; i++) {
    event.remove({ output: saplings[i] });
  }

  // Nether fungi
  event.remove({ output: "minecraft:warped_fungus" });
  event.remove({ output: "minecraft:crimson_fungus" });
  event.remove({ id: "create:haunting/crimson_fungus" });
  event.remove({ id: "create:haunting/warped_fungus" });

  // Easy Villagers (most items removed, villager obtained via elven trade)
  var easyVillagersItems = [
    "easy_villagers:breeder",
    "easy_villagers:converter",
    "easy_villagers:incubator",
    "easy_villagers:trader",
    "easy_villagers:farmer",
    "easy_villagers:iron_farm"
  ];
  for (var i = 0; i < easyVillagersItems.length; i++) {
    event.remove({ output: easyVillagersItems[i] });
  }

  // Wares delivery table (obtained differently)
  event.remove({ id: "wares:delivery_table" });

  // TOOLS - Keep one tool per material, remove the rest
  // Iron: keep axe
  event.remove({ output: "minecraft:iron_hoe" });
  event.remove({ output: "minecraft:iron_pickaxe" });
  event.remove({ output: "minecraft:iron_shovel" });
  event.remove({ output: "minecraft:iron_sword" });

  // Diamond: keep pickaxe
  event.remove({ output: "minecraft:diamond_axe" });
  event.remove({ output: "minecraft:diamond_hoe" });
  event.remove({ output: "minecraft:diamond_shovel" });
  event.remove({ output: "minecraft:diamond_sword" });

  // Netherite: keep sword
  event.remove({ output: "minecraft:netherite_axe" });
  event.remove({ output: "minecraft:netherite_hoe" });
  event.remove({ output: "minecraft:netherite_shovel" });
  event.remove({ output: "minecraft:netherite_pickaxe" });

  // Manasteel: keep shovel
  event.remove({ output: "botania:manasteel_axe" });
  event.remove({ output: "botania:manasteel_hoe" });
  event.remove({ output: "botania:manasteel_pick" });
  event.remove({ output: "botania:manasteel_sword" });

  // BOTANIA - Cosmetic trinkets
  var cosmeticTrinkets = [
    "botania:cosmetic_black_bowtie", "botania:cosmetic_black_tie",
    "botania:cosmetic_red_glasses", "botania:cosmetic_puffy_scarf",
    "botania:cosmetic_engineer_goggles", "botania:cosmetic_eyepatch",
    "botania:cosmetic_wicked_eyepatch", "botania:cosmetic_red_ribbons",
    "botania:cosmetic_pink_flower_bud", "botania:cosmetic_polka_dotted_bows",
    "botania:cosmetic_blue_butterfly", "botania:cosmetic_cat_ears",
    "botania:cosmetic_witch_pin", "botania:cosmetic_devil_tail",
    "botania:cosmetic_kamui_eye", "botania:cosmetic_googly_eyes",
    "botania:cosmetic_four_leaf_clover", "botania:cosmetic_clock_eye",
    "botania:cosmetic_unicorn_horn", "botania:cosmetic_devil_horns",
    "botania:cosmetic_hyper_plus", "botania:cosmetic_botanist_emblem",
    "botania:cosmetic_ancient_mask", "botania:cosmetic_eerie_mask",
    "botania:cosmetic_alien_antenna", "botania:cosmetic_anaglyph_glasses",
    "botania:cosmetic_orange_shades", "botania:cosmetic_groucho_glasses",
    "botania:cosmetic_thick_eyebrows", "botania:cosmetic_lusitanic_shield",
    "botania:cosmetic_tiny_potato_mask", "botania:cosmetic_questgiver_mark",
    "botania:cosmetic_thinking_hand"
  ];
  for (var i = 0; i < cosmeticTrinkets.length; i++) {
    event.remove({ output: cosmeticTrinkets[i] });
  }

  // BOTANIA - Brews
  var brews = [
    "botania:brew_vial", "botania:brew_flask",
    "botania:incense_stick", "botania:blood_pendant"
  ];
  for (var i = 0; i < brews.length; i++) {
    event.remove({ output: brews[i] });
  }

  // BOTANIA - Personal improvement trinkets
  var trinkets = [
    "botania:travel_belt", "botania:super_travel_belt",
    "botania:speed_up_belt", "botania:knockback_belt",
    "botania:ice_pendant", "botania:lava_pendant",
    "botania:super_lava_pendant", "botania:cloud_pendant",
    "botania:super_cloud_pendant", "botania:swap_ring",
    "botania:dodge_ring", "botania:mining_ring",
    "botania:pixie_ring", "botania:reach_ring",
    "botania:water_ring", "botania:magnet_ring",
    "botania:magnet_ring_greater", "botania:aura_ring",
    "botania:aura_ring_greater", "botania:mana_ring",
    "botania:mana_ring_greater", "botania:flight_tiara",
    "botania:itemfinder", "botania:diva_charm",
    "botania:goddess_charm", "botania:tiny_planet",
    "botania:invisibility_cloak", "botania:balance_cloak",
    "botania:unholy_cloak", "botania:holy_cloak",
    "botania:third_eye"
  ];
  for (var i = 0; i < trinkets.length; i++) {
    event.remove({ output: trinkets[i] });
  }

  // BOTANIA - Relics
  var relics = [
    "botania:king_key", "botania:infinite_fruit",
    "botania:dice", "botania:loki_ring",
    "botania:odin_ring", "botania:thor_ring",
    "botania:flugel_eye"
  ];
  for (var i = 0; i < relics.length; i++) {
    event.remove({ output: relics[i] });
  }
  // BOTANIA - Flowers that don't fit
  var flowers = [
    "botania:solensolegnolia", "botania:solegnolia_chibi", "botania:floating_solensolegnolia", "botania:floating_solegnolia",
    "botania:bubbell", "botania:bubbell_chibi", "botania:floating_bubbell", "botania:floating_bubbell_chibi",
  ]
  for (var i = 0; i < flowers.length; i++) {
    event.remove({ output: flowers[i] });
  }
  // BOTANIA - Non-useful rods (keep dirt_rod, tornado_rod, rainbow_rod)
  var rods = [
    "botania:missile_rod", "botania:cobble_rod",
    "botania:water_rod", "botania:fire_rod",
    "botania:divining_rod", "botania:smelt_rod",
    "botania:exchange_rod", "botania:gravity_rod",
    "botania:skydirt_rod", "botania:terraform_rod"
  ];
  for (var i = 0; i < rods.length; i++) {
    event.remove({ output: rods[i] });
  }

  // DIESEL GENERATORS - unused items
  var dieselItems = [
    "createdieselgenerators:chemical_sprayer",
    "createdieselgenerators:chemical_sprayer_lighter",
    "createdieselgenerators:chip_wood_block",
    "createdieselgenerators:chip_wood_slab",
    "createdieselgenerators:chip_wood_stairs",
    "createdieselgenerators:engine_piston",
    "createdieselgenerators:engine_silencer",
    "createdieselgenerators:lighter",
    "createdieselgenerators:oil_scanner",
    "createdieselgenerators:large_diesel_engine",
    "createdieselgenerators:pumpjack_bearing",
    "createdieselgenerators:pumpjack_head",
    "createdieselgenerators:pumpjack_crank",
    "createdieselgenerators:asphalt_block",
    "createdieselgenerators:asphalt_slab",
    "createdieselgenerators:asphalt_stairs",
    "createdieselgenerators:kelp_handle",
    "createdieselgenerators:oil_barrel",
    "createdieselgenerators:pumpjack_hole"
  ];
  for (var i = 0; i < dieselItems.length; i++) {
    event.remove({ output: dieselItems[i] });
  }

  // BOTANIA - Misc tools
  var miscTools = [
    "botania:phantom_ink", "botania:ender_hand",
    "botania:thorn_chakram", "botania:spawner_mover",
    "botania:terra_pick", "botania:glass_pickaxe",
    "botania:terra_axe", "botania:terra_sword",
    "botania:star_sword", "botania:thunder_sword",
    "botania:ender_dagger", "botania:crystal_bow",
    "botania:slime_bottle", "botania:astrolabe",
    "botania:bauble_box", "botania:clip",
    "botania:mana_gun", "botania:dreamwood_wand",
    "botania:slingshot", "botania:vine_ball",
    "botania:world_seed", "botania:black_hole_talisman",
    "botania:temperance_stone", "botania:flare_chakram"
  ];
  for (var i = 0; i < miscTools.length; i++) {
    event.remove({ output: miscTools[i] });
  }
});
