ServerEvents.recipes((x) => {
  x.recipes.createmetallurgy.melting(
    Fluid.of(`createmetallurgy:molten_tungsten`, 90),
    `createmetallurgy:dirty_wolframite_dust`,
    30,
    'heated',
  );
  x.recipes.create.pressing(
    'createmetallurgy:tungsten_sheet',
    `createmetallurgy:tungsten_ingot`,
  );
});
