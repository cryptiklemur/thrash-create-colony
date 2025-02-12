const levels = ['basic', 'copper', 'iron', 'gold', 'diamond', 'netherite'];

const mod = 'sophisticatedstorage';
ServerEvents.recipes((x) => {
  x.shapeless(`${mod}:barrel`, [
    'minecraft:barrel',
    'minecraft:redstone_torch',
  ]);
  x.shapeless(`${mod}:chest`, ['minecraft:chest', 'minecraft:redstone_torch']);
  x.shapeless(`${mod}:limited_barrel_1`, [
    '#forge:barrels',
    `${mod}:filter_upgrade`,
  ]);
  x.shapeless(`${mod}:limited_barrel_2`, [
    '#forge:barrels',
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
  ]);
  x.shapeless(`${mod}:limited_barrel_3`, [
    '#forge:barrels',
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
  ]);
  x.shapeless(`${mod}:limited_barrel_4`, [
    '#forge:barrels',
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
    `${mod}:filter_upgrade`,
  ]);

  levels.forEach((level) => {
    ['chest', 'barrel'].forEach((type) => {
      const item = Item.of(
        level === 'basic' ? type : `${mod}:${level}_${type}`,
      );
      const upgrade =
        level === 'basic'
          ? `${mod}:basic_tier_upgrade`
          : `${mod}:basic_to_${level}_tier_upgrade`;

      x.shapeless(item, [[`${mod}:${type}`, `minecraft:${type}`], upgrade]);
    });
  });
});
