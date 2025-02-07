/**
 * This file does a few things:
 *
 * - Add single tag for all crushed piles
 * - Create nugget/ingot/crushing recipes for the tfmg metals (nickel, lead, lithium)
 * - Fix the ore processing.
 *   - Update all metals[meta].ore to drop metals[metal] metals[metal].raw.item * metals[metal].raw.count
 *   - If metals[metal][crushed]
 *     - Remove all smelting/blasting/etc recipes for metals[metal].ore
 *     - Remove all smelting/blastic/etc recipes for metals[metal].crushed
 *     - Add smelting/blasting/etc recipes for metals[metal].raw.item to be metals[metal][nugget], or nothing
 * - Remove the OP recipe to create andesite alloy
 */

/**
 * @type {
 *    {
 *      [string]: {
 *        raw: {item: string, count: number},
 *        ore: string,
 *        mod: string,
 *        crushed: string | boolean,
 *        compressed: string | boolean,
 *        washing: boolean | string | OutputItem
 *      }
 *    }
 * }
 */
const metals = {
  iron: {
    raw: { item: 'minecraft:raw_iron', count: 3 },
    ore: '#forge:ores/iron',
    mod: 'minecraft',
    crushed: 'create:crushed_raw_iron',
    compressed: true,
    washing: Item.of('minecraft:redstone').withChance(0.75),
  },
  copper: {
    raw: { item: 'minecraft:raw_copper', count: 12 },
    ore: '#forge:ores/copper',
    mod: 'create',
    crushed: 'create:crushed_raw_copper',
    compressed: true,
    washing: Item.of('minecraft:clay_ball').withChance(0.75),
  },
  gold: {
    raw: { item: 'minecraft:raw_gold', count: 3 },
    ore: '#forge:ores/gold',
    mod: 'minecraft',
    crushed: 'create:crushed_raw_gold',
    compressed: true,
    washing: Item.of('minecraft:quartz').withChance(0.5),
  },
  zinc: {
    raw: { item: 'create:raw_zinc', count: 9 },
    ore: '#forge:ores/zinc',
    mod: 'create',
    crushed: 'create:crushed_raw_zinc',
    compressed: true,
    washing: Item.of('minecraft:gunpowder').withChance(0.25),
  },
  tungsten: {
    raw: { item: 'createmetallurgy:raw_wolframite', count: 3 },
    ore: '#forge:ores/wolframite',
    mod: 'createmetallurgy',
    crushed: 'createmetallurgy:crushed_raw_wolframite',
    compressed: false,
    washing: false,
  },
  lead: {
    raw: { item: 'tfmg:raw_lead', count: 3 },
    ore: '#forge:ores/lead',
    mod: 'tfmg',
    nugget: 'kubejs:lead_nugget',
    crushed: 'create:crushed_raw_lead',
    compressed: false,
    washing: false,
  },
  nickel: {
    raw: { item: 'tfmg:raw_nickel', count: 3 },
    ore: '#forge:ores/nickel',
    mod: 'tfmg',
    nugget: 'kubejs:nickel_nugget',
    crushed: 'create:crushed_raw_nickel',
    compressed: false,
    washing: Item.of('minecraft:glowstone_dust').withChance(0.25),
  },
  lithium: {
    raw: { item: 'tfmg:raw_lithium', count: 1 },
    ore: '#forge:ores/lithium',
    mod: 'tfmg',
    nugget: 'kubejs:lithium_nugget',
    crushed: false,
    compressed: false,
    washing: false,
  },
  aluminum: {
    raw: { item: 'creatingspace:raw_aluminum', count: 3 },
    ore: '#forge:raw_materials/aluminum',
    mod: 'creatingspace',
    crushed: 'create:crushed_raw_aluminum',
    compressed: false,
    washing: false,
  },
  cobalt: {
    raw: { item: 'creatingspace:raw_cobalt', count: 3 },
    ore: '#forge:raw_materials/cobalt',
    mod: 'creatingspace',
    crushed: 'creatingspace:crushed_cobalt_ore',
    compressed: false,
    washing: false,
  },
};

ServerEvents.tags('item', (x) => {
  for (const metal of Object.keys(metals)) {
    if (metals[metal].compressed) {
      x.add('create:compressed_raw_materials', `create_compressed:crushed_${metal}_pile`);
    }
  }
});

LootJS.modifiers((x) => {
  //console.log('LootJS.modifiers:');
  for (const metal of Object.keys(metals)) {
    let {
      ore,
      raw: { item: itemName, count },
    } = metals[metal];
    let item = Item.of(itemName, count);
    //console.log(`Updating ore ${ore} to drop ${item}`);
    x.addBlockLootModifier(ore).replaceLoot(itemName, item);
  }
});

ServerEvents.recipes((x) => {
  /**
   *
   * @param output {ItemStack|OutputItem|string|(string|ItemStack|OutputItem)[]}
   * @param input {string | ItemStack}
   */
  function seething(output, input) {
    if (!Array.isArray(output)) {
      output = [output];
    }
    output = output.map((item) => (typeof item === 'string' ? Item.of(item) : item));

    const recipe = {
      type: 'create_dd:seething',
      ingredients: [
        {
          item: input,
        },
      ],
      results: output.map((item) => {
        const outputItem = item instanceof OutputItem ? item : OutputItem.of(item);

        return {
          item: outputItem.item.id,
          chance: isNaN(outputItem.getChance()) ? 1 : outputItem.getChance(),
          count: isNaN(outputItem.getCount()) ? 1 : outputItem.getCount(),
        };
      }),
    };

    x.custom(recipe);
  }

  const test = {
    type: 'create_dd:seething',
    ingredients: [
      {
        item: 'minecraft:cobblestone',
      },
    ],
    results: [
      {
        item: 'minecraft:cobbled_deepslate',
        chance: 1.0,
        count: 1,
      },
    ],
  };

  for (const metal of ['lead', 'nickel', 'lithium']) {
    x.shapeless(`tfmg:${metal}_ingot`, Item.of(`kubejs:${metal}_nugget`, 9));
    x.shapeless(Item.of(`kubejs:${metal}_nugget`, 9), `tfmg:${metal}_ingot`);
    x.recipes.create.crushing(Item.of(`kubejs:${metal}_nugget`, 9), `tfmg:${metal}_ingot`);
  }

  // Remove all seething recipes, and add a few back
  console.log(`[REMOVE][create_dd:seething]`);
  x.remove({ type: 'create_dd:seething' });
  console.log(`[ADD][create_dd:seething] minecraft:obsidian -> minecraft:crying_obsidian`);
  seething('minecraft:crying_obsidian', 'minecraft:obsidian');
  console.log(`[ADD][create_dd:seething] minecraft:cobblestone -> minecraft:cobbled_deepslate`);
  seething('minecraft:cobbled_deepslate', 'minecraft:cobblestone');
  console.log(`[ADD][create_dd:seething] minecraft:netherrack -> minecraft:magma_block`);
  seething('minecraft:magma_block', 'minecraft:netherrack');
  console.log(`[ADD][create_dd:seething] minecraft:ender_pearl -> minecraft:ender_eye`);
  seething('minecraft:ender_eye', 'minecraft:ender_pearl');

  x.remove({
    type: 'create:mixing',
    input: ['minecraft:cobblestone', Fluid.lava(100)],
    output: 'create:andesite_alloy',
  });

  for (const metal of Object.keys(metals)) {
    let { mod, crushed, compressed, washing, raw, ore } = metals[metal];
    let compressedBlock = `create_compressed:crushed_${metal}_pile`;
    let ingot = metals[metal].nugget || `${mod}:${metal}`;
    let nugget = metals[metal].nugget || `${mod}:${metal}_nugget`;

    if (crushed) {
      for (const type of [
        'create:splashing',
        'create:fan_washing',
        'minecraft:smelting',
        'minecraft:blasting',
        'create:fan_blasting',
      ]) {
        console.log(`[REMOVE][${type}] ${crushed} & ${ore} & ${raw.item}`);
        x.remove({ type: type, input: crushed });
        x.remove({ type: type, input: ore });
        x.remove({ type: type, input: raw.item });
      }

      if (Item.exists(nugget)) {
        console.log(`[ADD][minecraft:smelting] ${ore} & ${raw.item} -> ${nugget}`);
        console.log(`[ADD][minecraft:blasting] ${ore} & ${raw.item} -> ${nugget}`);
        [ore, raw.item].forEach((item) => {
          x.smelting(nugget, item);
          x.blasting(nugget, item);
        });

        // @TODO Add smelter recipe here to smelt it differently
        // x.remove({ type: 'minecolonies:smelter', input: raw });
        // Replace smelter recipe: (in: ore, out: raw -> in:ore, out: raw * count)
        x.replaceOutput({ type: 'minecolonies:smelter', input: ore }, raw.item, Item.of(raw.item, raw.count));
        // Replace smelter recipe: (in: raw, out: ingot -> in:raw, out: nugget)
        x.replaceOutput({ type: 'minecolonies:smelter', input: raw.item }, ingot, nugget);
        console.log(`[ADD][minecraft:blasting] ${crushed} -> ${nugget}`);
        x.blasting(nugget, crushed);
        console.log(`[ADD][minecraft:seething] ${crushed} -> ${nugget} + .75% ${nugget}`);
        seething([nugget, Item.of(nugget).withChance(0.75)], crushed);
        console.log(
          `[ADD][create:compacting:superheated] ${raw.item} -> 5x ${crushed} + .3% create_simple_ore_doubling:slag`,
        );
        x.recipes.create
          .compacting([Item.of(crushed, 5), Item.of('create_simple_ore_doubling:slag').withChance(0.3)], raw.item)
          .superheated();
        console.log(`[UPDATE][create:crushing] ${raw.item} -> 2x ${crushed} + .75% create:experience_nugget`);
        x.remove({ type: 'create:crushing', input: raw.item });
        x.recipes.create.crushing(
          [Item.of(crushed, 2), Item.of('create:experience_nugget').withChance(0.75)],
          raw.item,
        );
        if (washing) {
          console.log(`[ADDING][create:splashing] ${crushed} -> ${washing}`);
          x.recipes.create.splashing(washing, crushed);
        }

        if (compressed) {
          let nuggets = Item.of(nugget, 9);
          x.forEachRecipe({ type: 'create:fan_washing', input: compressedBlock }, (recipe) => {
            console.log(`[UPDATE][${recipe.type}][${recipe.id}] Removing ${recipe.originalRecipeResult}`);
            x.replaceOutput({ output: recipe.originalRecipeResult }, recipe.originalRecipeResult, '');
          });
          for (const type of [
            'create:splashing',
            'create:fan_washing',
            'minecraft:smelting',
            'minecraft:blasting',
            'create:fan_blasting',
          ]) {
            console.log(`[REMOVE][${type}] ${compressedBlock}`);
            x.remove({ type: type, input: compressedBlock });
          }

          console.log(`[ADD][minecraft:blasting] ${compressedBlock} -> 9x ${nugget}`);
          x.blasting(nuggets, compressedBlock);
          console.log(`[ADD][create_dd:seething] ${compressedBlock} -> 9x ${nugget} + .75% 7x ${nugget}`);
          seething([nuggets, Item.of(nugget, 7).withChance(0.75)], compressedBlock);

          if (washing) {
            console.log(`[ADD][create:splashing] ${compressedBlock} -> 9x ${washing}`);
            x.recipes.create.splashing(washing.withCount(9), compressedBlock);
          }
        }
      }
    }
  }
});
