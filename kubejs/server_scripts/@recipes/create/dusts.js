ServerEvents.recipes((x) => {
  x.recipes.create
    .compacting('3x minecraft:redstone', [
      'minecraft:netherrack',
      '3x minecraft:flint',
    ])
    .heated();
  x.recipes.create
    .compacting('5x minecraft:redstone', [
      'minecraft:netherrack',
      '5x minecraft:flint',
    ])
    .superheated();
});
