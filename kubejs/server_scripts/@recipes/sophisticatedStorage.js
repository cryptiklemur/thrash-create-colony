ServerEvents.recipes((x) => {
  x.shapeless('sophisticatedstorage:barrel', [
    'minecraft:barrel',
    'minecraft:redstone',
  ]);
  x.shapeless('sophisticatedstorage:chest', [
    'minecraft:chest',
    'minecraft:redstone',
  ]);
  x.shapeless('sophisticatedstorage:limited_barrel_1', [
    '#forge:barrels',
    'sophisticatedstorage:filter_upgrade',
  ]);
  x.shapeless('sophisticatedstorage:limited_barrel_2', [
    '#forge:barrels',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
  ]);
  x.shapeless('sophisticatedstorage:limited_barrel_3', [
    '#forge:barrels',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
  ]);
  x.shapeless('sophisticatedstorage:limited_barrel_4', [
    '#forge:barrels',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
    'sophisticatedstorage:filter_upgrade',
  ]);
});
