//priority: 0
// Storage Drawers - keep only essential items, hide the rest

var STORAGEDRAWERS_KEEP = [
  "storagedrawers:drawer_key",
  "storagedrawers:shroud_key",
  "storagedrawers:quantify_key",
  "storagedrawers:oak_full_drawers_1",
  "storagedrawers:oak_full_drawers_2",
  "storagedrawers:oak_full_drawers_4",
  "storagedrawers:controller",
];

ServerEvents.recipes(function(event) {
  Ingredient.of("@storagedrawers").itemIds.forEach(function(item) {
    if (STORAGEDRAWERS_KEEP.indexOf(item) === -1) {
      event.remove({ output: item });
    }
  });
});

ServerEvents.tags("item", function(event) {
  Ingredient.of("@storagedrawers").itemIds.forEach(function(item) {
    if (STORAGEDRAWERS_KEEP.indexOf(item) === -1) {
      event.removeAllTagsFrom(item);
      event.add("c:hidden_from_recipe_viewers", item);
      event.add("c:removed", item);
    }
  });
});
