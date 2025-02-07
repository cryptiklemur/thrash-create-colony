ServerEvents.recipes((x) => {
  x.recipes.create.mixing(
    '2x minecraft:mud',
    [Fluid.water(1000), 'minecraft:gravel', 'minecraft:sand']
  );

  x.recipes.create.mixing('minecraft:dirt', 'minecraft:mud')
    .heatRequirement('heated')
    .processingTime(300)

  x.replaceOutput(
    {type: 'minecraft:smoking', input: 'minecraft:mud'},
    'minecraft:clay',
    'minecraft:dirt'
  );
})