ServerEvents.recipes((x) => {
  function convert(a, b) {
    x.shapeless(a, b);
    x.shapeless(b, a);
  }

  convert('biomesoplenty:barley', 'croptopia:barley');
  convert('create:wheat_flour', 'croptopia:flour');
  x.shapeless('create:dough', ['#forge:water', 'croptopia:flour']);
  x.shapeless('3x create:dough', ['#forge:water', '3x croptopia:flour']);
  x.recipes.create.mixing('create:dough', [Fluid.water(100), 'croptopia:flour']);
  x.recipes.create.mixing('3x create:dough', [Fluid.water(300), '3x croptopia:flour']);
});

LootJS.modifiers((x) => {
  // Add drop for barley
  x.addBlockLootModifier('biomesoplenty:barley').addLoot(
    LootEntry.of('croptopia:barley'),
    LootEntry.of('croptopia:barley_seed'),
  );
});
