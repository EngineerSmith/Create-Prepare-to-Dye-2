# KubeJS Script Conversion TODO

Converting old scripts from `kubejs.old/` to the new standard approach.

## Server Scripts

### Features (`kubejs.old/server_scripts/base/features/`)
- [ ] barrel.js -- not needed, we are keeping quar crate for now
- [x] botania-deflowered.js -> botania_deflowered.js (complete conversion)
- [x] botania-runes-detiered.js -> botania.js (all 16 runes detiered)
- [x] bulkrecycle-command.js -> bulkrecycle.js
- [x] chickenEggs.js -> chicken_eggs.js
- [x] cooking.js -> mixing.js, sequenced_assembly.js, pressing.js (already ported)
- [x] crafty-crate-tweaks.js -> recipe_removals.js
- [x] createDiselGenerators.js -> recipe_removals.js (items), cutting.js (wood chips), mixing.js (fermented blob/slime), diesel_generators.js (fermenting/distillation)
- [x] deadPlanet.js -> crushing.js, milling.js, compacting.js, mixing.js, filling.js, botania.js (pure daisy + runic altar), lychee.js
- [x] developerCommands.js -> commands.js (/getcrate - op-only crate with items)
- [x] diamondToolsSilkTouch.js -> block_tweaks.js
- [x] disable_saplings.js -> recipe_removals.js
- [x] dye.js -> already ported to crafting.js, milling.js, crushing.js, filling.js, mixing.js, botania.js (added yellow from bee_nest)
- [x] convert fuel in diesel generator recipes to new version -> diesel_generators.js
- [ ] enchantments.js
- [x] food.js -> sequenced_assembly.js (already ported)
- [x] hammer.js -> hammer.js (device deconstruction + block pickup)
- [x] handInteractions.js -> player_tweaks.js (bucket filling for diesel engine/spout)
- [x] immovable.js -> tags.js
- [ ] indestructible.js
- [x] ingotReplacement.js -> tags.js (iron/brass tag replacements)
- [x] items.js (empty file)
- [x] manapool.js -> manapool.js (alchemy->blaze burner, single crafting->mana pool)
- [x] milk.js -> tags.js (milk fluid/block tags), TODO: milk cooldown behavior
- [x] mill_crush.js -- already ported to milling.js and crushing.js
- [x] monsterFertilizer.js -- skipped, entirely commented out
- [x] noWaterCheat.js -> block_tweaks.js
- [x] oresAndIngots.js -> tags.js (brass=gold tags)
- [x] personal-equipment-reduction.js -> recipe_removals.js (botania items), block_tweaks.js (rod blocking)
- [x] petBetsy.js -> player_tweaks.js (cow petting), commands.js (/backToBetsy)
- [x] potions.js -> potions.js (dynamic filling recipes for all potions, brewing stand hidden)
- [x] powders.js -> mixing.js (already ported)
- [x] quartzAutomation.js -> filling.js (already ported)
- [x] recycling.js -> crushing.js (already ported)
- [x] remove-wooden-tools.js -> recipe_removals.js
- [x] schematicannonFuelless.js -> block_tweaks.js
- [x] spaceship.js -> block_tweaks.js
- [x] statusEffects.js -> player_tweaks.js (player invincibility)
- [x] tools.js -> recipe_removals.js (one tool per material tier)
- [x] trains.js -> sequenced_assembly.js (rail assembly from nuggets/alloy)
- [x] trees.js -> split into milling.js, crushing.js, cutting.js, smelting.js, crafting.js (searchable via "TREES -" comments)
- [x] variants.js (variantList.js, variants.js, varient.js) -> variants.js, variant_auto_assemble.js
- [x] villagers.js -> recipe_removals.js, botania.js
- [x] wood.js -> wood.js (log->wood mana infusion), item_application.js (stripping already done)
- [x] wrenchDoesMore.js -> tags.js (wrench_pickup block tag)

### Mod Integrations (`kubejs.old/server_scripts/base/mods/`)
- [x] appliedEnergistics.js -> ae2.js (item hiding), tags.js (quartz/lightblue), crushing.js, splashing.js, item_application.js, crafting.js, smelting.js, filling.js, mixing.js, sequenced_assembly.js, botania.js, variants.js
- [ ] craftingOnAStick.js
- [x] create.js -> tags.js (blaze_burner_capturable entity tag), TODO: recipes
- [x] createEnchantmentIndustry.js -> recipe_removals.js, tags.js (experience rotor removed/hidden)
- [x] minecraft.js -> tags.js (squeezables tags), TODO: recipes
- [x] quark.js -> quark.js (item hiding only), recipes split to smelting.js, crafting.js, variants.js (searchable via "QUARK -")
- [x] railways.js -> tags.js (zinc_nuggets fix), TODO: recipe removals
- [x] salt.js -- skipped, mod not planned
- [x] storageDrawers.js -> storagedrawers.js (keep only essential items)
- [x] supplementaries.js -> supplementaries.js (hide items, doormat recipe)
- [x] wands.js -- skipped, mod not planned
- [x] wares.js -> recipe_removals.js (delivery table recipe removed)

### Trading System (`kubejs.old/server_scripts/base/trading/`)
- [ ] backwardsCompatEngine.js
- [ ] landingTradeIntroLine.js
- [ ] platform/animate.js
- [ ] platform/music.js
- [ ] platform/pilot_names.js
- [ ] platform/spawn.js
- [ ] postage_stamp.js
- [ ] trad_related_recipes/trade_recipes.js

### Animation System (`kubejs.old/server_scripts/base/animation/`)
- [ ] animation_anchor.js
- [ ] animation_block.js
- [ ] animation_helper.js
- [ ] commands.js

### Other Server Scripts
- [x] tags.js -> tags.js (consolidated all tag additions from feature/mod scripts)

## Startup Scripts (`kubejs.old/startup_scripts/`)
- [x] blockCustomizations.js -> new_blocks.js (quark crate sound)
- [x] blocks.js -> new_blocks.js, new_items.js, new_fluids.js
- [x] conversions.js -- skipped, all commented out
- [x] custom_blocks/gray_fence.js -> new_blocks.js
- [x] custom_blocks/gray_fence_gate.js -> new_blocks.js
- [ ] custom_blocks/animation_block.js -- part of Animation System
- [ ] custom_blocks/animation_helper.js -- part of Animation System
- [x] custom_fluids/ -> new_fluids.js (tomato_sauce, flowing_milk)
- [x] custom_items/ -> new_items.js (animation_anchor, cooking, hammer, in_progress_items)
- [x] destroySpeedAndLevel.js -> destroy_speed.js
- [x] emi.js -- skipped, all commented out
- [x] indestructible.js -> indestructible.js
- [x] jade.js -- skipped, marked broken
- [ ] ponderDisplayItems.js
- [x] predicates.js -> predicates.js (wares delivery agreement model predicate)
- [x] spoutsFillCauldrons.js -> spout_handlers.js
- [x] spoutsFillEnergyCells.js -> spout_handlers.js (milk fills AE2 energy cells)
- [x] spoutsGrowQuartzBuds.js -> spout_handlers.js (water grows quartz buds)
- [x] stacksizes.js -> stacksizes.js
- [ ] trading.js
- [x] worldgen.js -> worldgen.js (removes ores, flowers, springs)

## Client Scripts (`kubejs.old/client_scripts/`)
- [ ] animation_anchor.js -- part of Animation System
- [x] customPonderIndexButton.js -- skipped, ponder system not ported
- [x] foodTooltips.js -> tooltips.js (nutrition/saturation)
- [x] handInteractions.js -> client_tweaks.js (bucket cancellations)
- [x] jei.js -> emi.js (hide colored variants)
- [x] lang.helpers.js -- skipped, old tooltip system replaced
- [x] lang.js -> emi.js (EMI info page generation), tooltip system replaced
- [ ] milkNerf.js -- milk cooldown not ported yet
- [x] modpack_utils.js -- skipped, utility for lang.js
- [x] noWaterCheat.js -> client_tweaks.js (glass bottle cancellation)
- [ ] ponders/ (folder - 3 files) -- ponder system not ported
- [x] tooltips/ (folder - 10+ files) -> tooltips.js (consolidated)
- [ ] tradeShow.js -- part of Trading System
- [ ] tradeTooltips.js -- part of Trading System
- [ ] trading_platform_music.js -- part of Trading System
- [ ] trading_platform_preview.js -- part of Trading System
- [x] globals.js -- skipped, empty file
- [x] features.js -- skipped, replaced by ConfigJS

## Already Converted
- [x] crushing.js
- [x] milling.js
- [x] cutting.js
- [x] splashing.js
- [x] deploying.js
- [x] item_application.js
- [x] recipe_removals.js
- [x] sandpaper_polishing.js
- [x] pressing.js
- [x] smelting.js
- [x] filling.js
- [x] compacting.js
- [x] mixing.js
- [x] crafting.js
- [x] sequenced_assembly.js
- [x] advjs_server.js / advjs_startup.js
- [x] lychee.js
- [x] botania.js
- [x] stonecutting.js -> variants.js
- [x] devices.js
- [x] loot.js
- [x] gamerules.js
- [x] playerLogin.js
- [x] tooltip_data.js (deleted - client computes directly)
- [x] new_items.js
- [x] new_blocks.js
- [x] new_fluids.js
- [x] client_scripts/tooltips.js
- [x] automaticAssembly.js (variant_auto_assemble.js + varient.js)
- [x] tags.js (consolidated from tags.js, immovable.js, wrenchDoesMore.js, botania-deflowered.js, ingotReplacement.js, oresAndIngots.js, milk.js, appliedEnergistics.js, create.js, minecraft.js, railways.js)
- [x] ae2.js (item hiding from appliedEnergistics.js)
- [x] block_tweaks.js (diamondToolsSilkTouch, schematicannonFuelless, noWaterCheat, spaceship)
- [x] player_tweaks.js (statusEffects - player invincibility)
- [x] bulkrecycle.js
- [x] chicken_eggs.js
