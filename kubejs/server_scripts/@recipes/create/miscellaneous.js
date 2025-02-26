const decoMetals = ['andesite', 'zinc'];

ServerEvents.tags('item', (x) => {
  decoMetals.forEach((metal) => {
    x.add('forge:plates', `createdeco:${metal}_sheet`);
    x.add(`forge:plates/${metal}`, `createdeco:${metal}_sheet`);
  });
});

ServerEvents.recipes((x) => {
  x.shapeless('9x createloveandwar:brass_mix', [
    '#forge:ingots/zinc',
    '#forge:ingots/zinc',
    '#forge:ingots/copper',
    '#forge:ingots/copper',
  ]);

  x.recipes.create.crushing(
    [
      Item.of('biomesoplenty:rose_quartz_chunk', 4),
      Item.of('biomesoplenty:rose_quartz_chunk', 4).withChance(0.75),
      Item.of('biomesoplenty:rose_quartz_chunk', 4).withChance(0.25),
    ],
    'biomesoplenty:rose_quartz_block',
  );

  x.custom({
    type: 'create_new_age:energising',
    energy_needed: 10000,
    ingredients: [
      {
        tag: 'forge:ores/iron',
      },
    ],
    results: [
      {
        item: 'create_new_age:magnetite_block',
      },
    ],
  });

  // Wash ancient debris into Washed Ancient Debris (new item, same item/block as chipped:sanded_ancient_debris)
  // Washed Ancient Debris in a compacting basin:
  // WAD + Lava + unheated = 2 netherite scraps
  // WAD + heated = 3 netherite scraps
  // WAD + superheated = 5 netherite scraps
  x.recipes.create.splashing(
    'kubejs:washed_ancient_debris',
    '#chipped:ancient_debris',
  );
  x.recipes.create.compacting('2x minecraft:netherite_scrap', [
    Fluid.lava(100),
    Item.of('kubejs:washed_ancient_debris'),
  ]);
  x.recipes.create.compacting(
    '3x minecraft:netherite_scrap',
    Item.of('kubejs:washed_ancient_debris'),
    100,
    'heated',
  );
  x.recipes.create.compacting(
    '5x minecraft:netherite_scrap',
    Item.of('kubejs:washed_ancient_debris'),
    100,
    'superheated',
  );

  // Bort
  x.recipes.create.crushing(
    ['3x silentgear:bort', Item.of('2x silentgear:bort').withChance(0.25)],
    '#forge:ores/bort',
  );

  decoMetals.forEach((metal) => {
    x.replaceInput(
      {
        input: `createdeco:${metal}_sheet`,
      },
      `createdeco:${metal}_sheet`,
      `#forge:plates/${metal}`,
    );
  });

  x.replaceInput(
    { input: `oreganized:electrum_ingot` },
    'oreganized:electrum_ingot',
    '#forge:ingots/electrum',
  );

  x.remove({ id: 'jei:/oreganized/create/mixing/electrum_ingot' });
});
