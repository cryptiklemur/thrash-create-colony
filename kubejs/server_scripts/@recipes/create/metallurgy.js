const dusts = ['copper', 'iron', 'gold', 'zinc'];

ServerEvents.recipes((x) => {
  x.recipes.createmetallurgy.melting(
    `createmetallurgy:molten_tungsten`,
    `createmetallurgy:dirty_wolframite_dust`,
    30,
    'heated',
  );
  x.recipes.create.compacting(
    'createmetallurgy:tungsten_sheet',
    `createmetallurgy:tungsten_ingot`,
  );
});
