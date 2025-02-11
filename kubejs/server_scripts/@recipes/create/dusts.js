ServerEvents.recipes((x) => {
  x.recipes.create
    .compacting('3x minecraft:andesite', [
      'minecraft:gravel',
      '2x minecraft:flint',
    ])
    .heated();

  x.stonecutting('minecraft:pointed_dripstone', 'minecraft:dripstone_block');
});
