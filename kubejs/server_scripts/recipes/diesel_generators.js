//priority: 1
// Create Prepare to Dye 2 - Diesel Generators Recipes

ServerEvents.recipes(function(event) {
  // WOOD CHIPS - from sticks (replaces default)
  event.remove({ id: "createdieselgenerators:cutting/wood_chips" });
  event.remove({ id: "createdieselgenerators:crushing/wood_chip_slabs" });
  event.remove({ id: "createdieselgenerators:crushing/wood_chip_stairs" });
  event.remove({ id: "createdieselgenerators:crushing/wood_chip_fences" });
  event.recipes.create.cutting("createdieselgenerators:wood_chip", "minecraft:stick");

  // Remove default fermenting recipe
  event.remove({ id: "createdieselgenerators:basin_fermenting/fermentable" });

  // FERMENTING - fermented goop from milk
  event.custom({
    type: "createdieselgenerators:basin_fermenting",
    ingredients: [
      { fluid: "minecraft:milk", amount: 500 }
    ],
    results: [
      { fluid: "ptdye:fermented_goop", amount: 250 },
      { item: "minecraft:white_dye", count: 3 }
    ]
  });

  // FERMENTING - fermented goop from bone meal and milk
  event.custom({
    type: "createdieselgenerators:basin_fermenting",
    ingredients: [
      { item: "minecraft:bone_meal", count: 4 },
      { fluid: "minecraft:milk", amount: 500 }
    ],
    results: [
      { fluid: "ptdye:fermented_goop", amount: 600 },
      { item: "minecraft:white_dye", count: 1 }
    ]
  });

  // FERMENTING - fermented goop from bone meal and fermentables
  event.custom({
    type: "createdieselgenerators:basin_fermenting",
    ingredients: [
      { item: "minecraft:bone_meal" },
      { tag: "forge:fermentable" }
    ],
    results: [
      { fluid: "ptdye:fermented_goop", amount: 100 }
    ]
  });

  // FERMENTING - fermented goop from bone meal and organic mass
  event.custom({
    type: "createdieselgenerators:basin_fermenting",
    ingredients: [
      { item: "minecraft:bone_meal", count: 4 },
      { fluid: "ptdye:organic_mass", amount: 500 }
    ],
    results: [
      { fluid: "ptdye:fermented_goop", amount: 500 },
      { item: "minecraft:green_dye", count: 5 },
      { fluid: "minecraft:water", amount: 50 }
    ]
  });

  // FERMENTING - fermented goop from organic mass
  event.custom({
    type: "createdieselgenerators:basin_fermenting",
    ingredients: [
      { fluid: "ptdye:organic_mass", amount: 500 }
    ],
    results: [
      { fluid: "ptdye:fermented_goop", amount: 200 },
      { fluid: "minecraft:water", amount: 75 }
    ]
  });

  // DISTILLATION - ethanol from fermented goop (heated)
  event.remove({ id: "createdieselgenerators:distillation/crude_oil" });
  event.custom({
    type: "createdieselgenerators:distillation",
    ingredients: [
      { fluid: "ptdye:fermented_goop", amount: 20 }
    ],
    heatRequirement: "heated",
    processingTime: 40,
    results: [
      { fluid: "createdieselgenerators:ethanol", amount: 40 },
      { fluid: "minecraft:water", amount: 10 }
    ]
  });

  // DISTILLATION - water from milk
  event.custom({
    type: "createdieselgenerators:distillation",
    ingredients: [
      { fluid: "minecraft:milk", amount: 15 }
    ],
    processingTime: 40,
    results: [
      { fluid: "minecraft:water", amount: 15 }
    ]
  });

  // DISTILLATION - diesel from ink (replaces oil)
  event.custom({
    type: "createdieselgenerators:distillation",
    ingredients: [
      { fluid: "create_enchantment_industry:ink", amount: 250 }
    ],
    results: [
      { fluid: "create:honey", amount: 15 },
      { fluid: "createdieselgenerators:diesel", amount: 50 }
    ]
  });

  // DISTILLATION - water and plant oil from organic mass
  event.custom({
    type: "createdieselgenerators:distillation",
    ingredients: [
      { fluid: "ptdye:organic_mass", amount: 10 }
    ],
    processingTime: 40,
    results: [
      { fluid: "minecraft:water", amount: 8 },
      { fluid: "createdieselgenerators:plant_oil", amount: 2 }
    ]
  });
});
