const levels = ['basic', 'copper', 'iron', 'gold', 'diamond', 'netherite'];

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

  levels.forEach((level) => {
    ['chest', 'barrel'].forEach((type) => {
      const item =
        level === 'basic' ? type : `sophisticatedstorage:${level}_${type}`;
      const upgrade =
        level === 'basic'
          ? 'basic_tier_upgrade'
          : `basic to ${level}_tier_upgrade`;

      x.shapeless(item, [`minecraft:${type}`, upgrade]);
      x.shapeless(item, [`sophisticatedstorage:${type}`, upgrade]);
    });
  });
});
