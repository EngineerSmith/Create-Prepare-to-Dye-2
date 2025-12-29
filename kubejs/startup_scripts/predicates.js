// //priority: -20
// // Predicates - Client-side item property predicates

// // Wares delivery agreement predicate (changes model based on ordered status)
// function waresPredicate(stack) {
//   if (!stack.nbt) return 0;
//   return stack.nbt.ordered ? 0 : 1;
// }

// StartupEvents.postInit(function(event) {
//   if (!Platform.isClientEnvironment()) return;

//   var $ItemProperties = Java.loadClass("net.minecraft.client.renderer.item.ItemProperties");

//   $ItemProperties.register(
//     Item.of("wares:delivery_agreement"),
//     new ResourceLocation("count"),
//     function(stack, world, living, seed) {
//       return waresPredicate(stack);
//     }
//   );
// });
