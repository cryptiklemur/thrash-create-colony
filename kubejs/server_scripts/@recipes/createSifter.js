ServerEvents.recipes((x) => {
  x.remove([
    { mod: 'createsifter', input: 'minecraft:sand' }
  ])

  x.recipes.createsifter.sifting(
    [
      Item.of('minecraft:redstone').withChance(0.05),
      Item.of('minecraft:bone_meal').withChance(0.40),
      Item.of('minecraft:quartz').withChance(0.01),
    ],
    ['minecraft:sand', 'createsifter:string_mesh']
  )

  x.recipes.createsifter.sifting(
    [
      Item.of('minecraft:redstone').withChance(0.10),
      Item.of('minecraft:bone_meal').withChance(0.40),
      Item.of('minecraft:quartz').withChance(0.02),
      Item.of('create:experience_nugget').withChance(0.10),
    ],
    ['minecraft:sand', 'createsifter:andesite_mesh']
  )
  x.recipes.createsifter.sifting(
    [
      Item.of('minecraft:redstone').withChance(0.15),
      Item.of('minecraft:bone_meal').withChance(0.40),
      Item.of('minecraft:quartz').withChance(0.05),
      Item.of('create:experience_nugget').withChance(0.10),
    ],
    ['minecraft:sand', 'createsifter:zinc_mesh']
  )
  x.recipes.createsifter.sifting(
    [
      Item.of('minecraft:redstone', 2).withChance(0.25),
      Item.of('minecraft:glowstone_dust').withChance(0.15),
      Item.of('minecraft:blaze_powder').withChance(0.05),
      Item.of('minecraft:bone_meal').withChance(0.40),
      Item.of('minecraft:quartz').withChance(0.1),
      Item.of('create:experience_nugget').withChance(0.20),
    ],
    ['minecraft:sand', 'createsifter:brass_mesh']
  )
  x.recipes.createsifter.sifting(
    [
      Item.of('minecraft:quartz').withChance(0.30),
      Item.of('minecraft:quartz').withChance(0.10),
      Item.of('minecraft:redstone').withChance(0.45),
      Item.of('minecraft:redstone').withChance(0.15),
      Item.of('minecraft:blaze_powder').withChance(0.1),
      Item.of('minecraft:glowstone_dust').withChance(0.15),
      Item.of('minecraft:bone_meal').withChance(0.50),
      Item.of('create:experience_nugget').withChance(0.20),
    ],
    ['minecraft:sand', 'createsifter:advanced_brass_mesh']
  )
})
