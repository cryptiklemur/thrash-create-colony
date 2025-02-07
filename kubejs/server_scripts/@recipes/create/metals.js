const metals = {
  iron: {
    mod: 'minecraft',
    crushed: 'create:crushed_raw_iron',
    compressed: true,
    washing: Item.of('minecraft:redstone').withChance(.75),
  }, copper: {
    mod: 'create',
    crushed: 'create:crushed_raw_copper',
    compressed: true,
    washing: Item.of('minecraft:clay_ball').withChance(.75),
  }, gold: {
    mod: 'minecraft',
    crushed: 'create:crushed_raw_gold',
    compressed: true,
    washing: Item.of('minecraft:quartz').withChance(.5),
  }, zinc: {
    mod: 'create',
    crushed: 'create:crushed_raw_zinc',
    compressed: true,
    washing: Item.of('minecraft:gunpowder').withChance(.25),
  }, tungsten: {
    mod: 'createmetallurgy', crushed: 'createmetallurgy:crushed_raw_wolframite', compressed: false,
  }, lead: {
    mod: 'tfmg', crushed: 'create:crushed_raw_lead', nugget: 'kubejs:lead_nugget', compressed: false,
  }, nickel: {
    mod: 'tfmg',
    crushed: 'create:crushed_raw_nickel',
    nugget: 'kubejs:nickel_nugget',
    compressed: false,
    washing: Item.of('minecraft:glowstone_dust').withChance(.25),
  }
}

ServerEvents.tags('item', (x) => {
  for (const metal of Object.keys(metals)) {
    if (metals[metal].compressed) {
      x.add('create:compressed_raw_materials', `create_compressed:crushed_${metal}_pile`)
    }
  }
})

ServerEvents.recipes((x) => {
  for (const metal of ['lead', 'nickel']) {
    x.shapeless(`tfmg:${metal}_ingot`, Item.of(`kubejs:${metal}_nugget`, 9))
    x.shapeless(Item.of(`kubejs:${metal}_nugget`, 9), `tfmg:${metal}_ingot`)
    x.recipes.create.crushing(Item.of(`kubejs:${metal}_nugget`, 9), `tfmg:${metal}_ingot`)
  }

  x.remove({
    type: 'create:mixing', input: ['minecraft:cobblestone', Fluid.lava(100)], output: 'create:andesite_alloy'
  })

  for (const metal of Object.keys(metals)) {
    let { mod, crushed, compressed, washing } = metals[metal]
    let compressedBlock = `create_compressed:crushed_${metal}_pile`
    let nugget = metals[metal].nugget || `${mod}:${metal}_nugget`
    for (const type of ['create:splashing', 'create:fan_washing', 'minecraft:smelting', 'minecraft:blasting', 'create:fan_blasting', 'create_dd:fan_seething']) {
      console.log(`Removing recipes for ${type} ${crushed}`)
      x.remove({ type: type, input: crushed })
    }

    console.log(`Adding recipes for ${crushed}`, `Blasting: ${crushed} -> ${nugget}`, `Seething: ${crushed} -> ${nugget} + .75% ${nugget}`)
    x.blasting(nugget, crushed)
    x.custom({
      type: 'create_dd:seething', ingredients: [{
        item: crushed
      }], results: [{
        item: nugget
      }, {
        chance: 0.75, item: nugget
      }]
    })
    if (washing !== undefined) {
      x.recipes.create.splashing(washing, crushed)
    }

    if (compressed) {
      let nuggets = Item.of(nugget, 9)
      x.forEachRecipe({ type: 'create:fan_washing', input: compressedBlock }, (recipe) => {
        console.log(`Stripping output of ${recipe.originalRecipeResult} from ${recipe.id}`)
        x.replaceOutput({ output: recipe.originalRecipeResult }, recipe.originalRecipeResult, '')
      })
      for (const type of ['create:splashing', 'create:fan_washing', 'minecraft:smelting', 'minecraft:blasting', 'create:fan_blasting', 'create_dd:fan_seething']) {
        console.log(`Removing recipes for ${type} ${compressedBlock}`)
        x.remove({ type: type, input: compressedBlock })
      }

      console.log(`Adding recipes for ${compressedBlock}`, `Blasting: ${compressedBlock} -> 9x ${nugget}`, `Seething: ${compressedBlock} -> 9x ${nugget} + 7x .75% ${nugget}`)

      x.blasting(nuggets, compressedBlock)
      x.custom({
        type: 'create_dd:seething', ingredients: [{
          item: compressedBlock
        }], results: [{
          item: nugget, amount: 9
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }, {
          chance: 0.75, item: nugget,
        }]
      })

      if (washing !== undefined) {
        x.recipes.create.splashing(washing.withCount(9), compressedBlock)
      }
    }
  }
})
