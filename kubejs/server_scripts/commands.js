//priority: 0
// Commands - standalone commands without complex logic dependencies

ServerEvents.commandRegistry(function(event) {
  var Commands = event.commands;
  var Arguments = event.arguments;

  // /backToBetsy - teleport to last petted cow location
  event.register(
    Commands.literal("backToBetsy").executes(function(context) {
      var player = context.source.player;
      var x = player.persistentData.get("betsy_last_location_x");
      var z = player.persistentData.get("betsy_last_location_z");

      if (x && z) {
        Utils.server.runCommandSilent(
          "/tp " + player.displayName.string + " " + parseInt(x) + " 322 " + parseInt(z)
        );
      } else {
        Utils.server.runCommandSilent(
          "/title " + player.displayName.string + " actionbar \"Need to pet Betsy first!\""
        );
      }
      return 0;
    })
  );

  // /getcrate ['item1','item2',...] - developer command to get a crate with items
  event.register(
    Commands.literal("getcrate")
      .requires(function(s) { return s.hasPermission(2); })
      .then(
        Commands.argument("itemlist", Arguments.GREEDY_STRING.create(event))
          .executes(function(context) {
            try {
              var nbt = {
                BlockEntityTag: { stacks: [] },
                display: { Name: '{"text":"items"}' }
              };

              var text = context.getInput().replace("getcrate ", "");
              var items = JSON.parse(text.replaceAll("'", '"'));

              for (var i = 0; i < items.length; i++) {
                nbt.BlockEntityTag.stacks.push({ Count: 1, id: items[i] });
              }

              context.source.server.runCommandSilent(
                "/give @p quark:crate" + JSON.stringify(nbt)
              );
            } catch (e) {
              console.log("[getcrate] Error: " + e);
            }
            return 1;
          })
      )
  );
});
