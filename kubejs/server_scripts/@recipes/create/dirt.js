ServerEvents.recipes((x) => {
  x.recipes.create.mixing(
    '3x minecraft:dirt',
    [Fluid.water(1000), 'minecraft:gravel', 'minecraft:sand']
  )
})