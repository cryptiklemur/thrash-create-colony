const recipes = [
  [
    ['minecraft:oak_leaves'],
    'dynamictrees:oak_seed'
  ]
    [
    ['minecraft:oak_leaves', 'minecraft:apple'],
      'dynamictrees:apple_oak_seed'
    ]
]

const seeds = {
  ////////////////////////////////////////////////////////////////////////////////
  // Vanilla Leaves -> Dynamic Trees Seeds (modid "dynamictrees")
  ////////////////////////////////////////////////////////////////////////////////
  'dynamictrees:oak_seed': ['minecraft:oak_leaves'],
  'dynamictrees:apple_oak_seed': ['minecraft:oak_leaves', Item.of('minecraft:apple', 4)],
  'dynamictrees:birch_seed': ['minecraft:birch_leaves'],
  'dynamictrees:spruce_seed': ['minecraft:spruce_leaves'],
  'dynamictrees:jungle_seed': ['minecraft:jungle_leaves'],
  'dynamictrees:cocoa_seed': ['minecraft:jungle_leaves', Item.of('minecraft:cocoa_beans', 8)],
  'dynamictrees:acacia_seed': ['minecraft:acacia_leaves'],
  'dynamictrees:dark_oak_seed': ['minecraft:dark_oak_leaves'],
  'dynamictrees:cherry_seed': ['minecraft:cherry_leaves'],
  'dynamictrees:mangrove_seed': ['minecraft:mangrove_leaves'],

  ////////////////////////////////////////////////////////////////////////////////
  // Biomes O' Plenty Leaves -> Dynamic Trees BOP Seeds (modid "dtbop")
  ////////////////////////////////////////////////////////////////////////////////
  'dtbop:aspen_seed': ['biomesoplenty:yellow_maple_leaves'],
  'dtbop:snowblossom_seed': ['biomesoplenty:snowblossom_leaves'],
  'dtbop:red_maple_seed': ['biomesoplenty:red_maple_leaves'],
  'dtbop:rainbow_birch_seed': ['biomesoplenty:rainbow_birch_leaves'],
  'dtbop:orange_maple_seed': ['biomesoplenty:orange_maple_leaves'],
  'dtbop:magic_poplar_seed': ['biomesoplenty:magic_leaves'],
  'dtbop:flowering_oak_seed': ['biomesoplenty:flowering_oak_leaves'],
  'dtbop:willow_seed': ['biomesoplenty:willow_leaves'],
  'dtbop:umbran_seed': ['biomesoplenty:umbran_leaves'],
  'dtbop:redwood_seed': ['biomesoplenty:redwood_leaves'],
  'dtbop:pine_seed': ['biomesoplenty:pine_leaves'],
  'dtbop:palm_seed': ['biomesoplenty:palm_leaves'],
  'dtbop:mahogany_seed': ['biomesoplenty:mahogany_leaves'],
  'dtbop:jacaranda_seed': ['biomesoplenty:jacaranda_leaves'],
  'dtbop:hellbark_seed': ['biomesoplenty:hellbark_leaves'],
  'dtbop:fir_seed': ['biomesoplenty:fir_leaves'],
}

const bark = Item.of('farmersdelight:tree_bark')
ServerEvents.recipes((x) => {
  for (const seed of Object.keys(seeds)) {
    let ingredients = seeds[seed]
    for (const index of Object.keys(ingredients)) {
      ingredients[index] = typeof ingredients[index] === 'string' ? Item.of(ingredients[index]) : ingredients[index]
    }
    let leaf = ingredients.shift()

    x.recipes.create.mixing(
      Item.of(seed).withChance(.1),
      [leaf, Fluid.water(1000)].concat(ingredients),
      200
    )
    x.recipes.create.mixing(
      Item.of(seed, 4),
      [leaf.withCount(8), Fluid.water(1000)].concat(ingredients),
      400
    ).heated()
    x.recipes.create.mixing(
      Item.of(seed, 1),
      [leaf, Fluid.water(4000)].concat(ingredients),
      400
    ).superheated()
  }

  x.forEachRecipe({ type: 'create:cutting', input: '#minecraft:logs' }, (recipe) => {
    if (!recipe.hasOutput('#forge:stripped_logs')) {
      return
    }
    x.recipes.create.cutting([recipe.originalRecipeResult, bark], recipe.originalRecipeIngredients).id(recipe.getId())
  })

  x.shaped(
    Item.of('silentgear:template_board', 4),
    [
      'AAA',
      'ABA',
      'AAA'
    ],
    {
      A: '#minecraft:planks',
      B: bark
    }
  )

  x.recipes.create.compacting(['minecraft:coal'], [bark.withCount(8)])
  x.recipes.create.compacting(['minecraft:coal'], [bark.withCount(4)]).heated()
  x.recipes.create.compacting(['minecraft:coal'], [bark.withCount(1)]).superheated()
  x.blasting('pickletweaks:coal_piece', bark)
  x.campfireCooking('pickletweaks:charcoal_piece', bark).cookingTime(60 * 20)
  x.recipes.create.haunting('silentgear:netherwood_charcoal', bark.withCount(4))
})
