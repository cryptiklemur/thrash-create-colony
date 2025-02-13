/**
 * This file does a few things:
 *
 * - Add single tag for all crushed piles
 * - Create nugget/ingot/crushing recipes for the tfmg metals (nickel, lead, lithium)
 * - Fix the ore processing.
 *   - Update all metals[meta].ore to drop metals[metal].raw.item * metals[metal].raw.count
 *   - If metal has crushed, or nugget
 *     - Ore in crusher should give (raw.item * raw.count) + (75% raw.item * raw.count) + (25% raw.item * raw.count)
 *     - Add recipe for hammer + raw.item -> 2x crushed/nugget
 *     - Remove all smelting/blasting/etc recipes for ore, raw, and crushed
 *     - Add smelting/blasting/etc recipes for crushed to be metals[metal][nugget] with % for extra, or nothing
 * - Remove the OP recipe to create andesite alloy
 */

function debug() {
  if (false) {
    console.log(arguments);
  }
}

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
    ingot: 'minecraft:copper_ingot',
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
  crimson_iron: {
    raw: { item: 'silentgear:raw_crimson_iron', count: 9 },
    ore: 'silentgear:raw_crimson_iron',
    mod: 'silentgear',
    crushed: false,
    compressed: false,
    washing: Item.of('minecraft:quartz').withChance(0.25),
  },
  azure_silver: {
    raw: { item: 'silentgear:raw_azure_silver', count: 9 },
    ore: 'silentgear:raw_azure_silver',
    mod: 'silentgear',
    crushed: false,
    compressed: false,
  },
  silver: {
    raw: { item: 'oreganized:raw_silver', count: 5 },
    ore: '#forge:ores/silver',
    mod: 'oreganized',
    crushed: 'create:crushed_raw_silver',
    washing: Item.of('minecraft:emerald').withChance(0.5),
    compressed: false,
  },
};

ServerEvents.tags('item', (x) => {
  for (const metal of Object.keys(metals)) {
    if (metals[metal].compressed) {
      x.add(
        'create:compressed_raw_materials',
        `create_compressed:crushed_${metal}_pile`,
      );
    }
  }
});

LootJS.modifiers((x) => {
  //debug('LootJS.modifiers:');
  for (const metal of Object.keys(metals)) {
    let {
      ore,
      raw: { item: itemName, count },
    } = metals[metal];
    let item = Item.of(itemName, count);
    //debug(`Updating ore ${ore} to drop ${item}`);
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
    output = output.map((item) =>
      typeof item === 'string' ? Item.of(item) : item,
    );

    const recipe = {
      type: 'create_dd:seething',
      ingredients: [
        {
          item: input,
        },
      ],
      results: output.map((item) => {
        const outputItem =
          item instanceof OutputItem ? item : OutputItem.of(item);

        return {
          item: outputItem.item.id,
          chance: isNaN(outputItem.getChance()) ? 1 : outputItem.getChance(),
          count: isNaN(outputItem.getCount()) ? 1 : outputItem.getCount(),
        };
      }),
    };

    debug(`[ADD][create_dd:seething] ${input} -> ${output.join(' & ')}`);
    x.custom(recipe);
  }

  for (const metal of ['lead', 'nickel', 'lithium']) {
    x.shapeless(`tfmg:${metal}_ingot`, Item.of(`kubejs:${metal}_nugget`, 9));
    x.shapeless(Item.of(`kubejs:${metal}_nugget`, 9), `tfmg:${metal}_ingot`);
    x.recipes.create.crushing(
      Item.of(`kubejs:${metal}_nugget`, 9),
      `tfmg:${metal}_ingot`,
    );
  }

  // Remove all seething recipes, and add a few back
  debug(`[REMOVE][create_dd:seething]`);
  x.remove({ type: 'create_dd:seething' });
  seething('minecraft:crying_obsidian', 'minecraft:obsidian');
  seething('minecraft:cobbled_deepslate', 'minecraft:cobblestone');
  seething('minecraft:magma_block', 'minecraft:netherrack');
  seething('minecraft:ender_eye', 'minecraft:ender_pearl');

  x.remove({
    type: 'create:mixing',
    input: ['minecraft:cobblestone', Fluid.lava(100)],
    output: 'create:andesite_alloy',
  });

  const slag = Item.of('create_simple_ore_doubling:slag');
  for (const metal of Object.keys(metals)) {
    let { mod, crushed, compressed, washing, raw, ore } = metals[metal];
    let compressedBlock = `create_compressed:crushed_${metal}_pile`;
    let ingot = metals[metal].ingot || `${mod}:${metal}_ingot`;
    let nugget = metals[metal].nugget || `${mod}:${metal}_nugget`;
    let crushedOrNugget =
      crushed && Item.exists(crushed)
        ? crushed
        : Item.exists(nugget)
          ? nugget
          : null;
    let nuggetOrIngot = Item.exists(nugget)
      ? nugget
      : Item.exists(ingot)
        ? ingot
        : null;
    if (!crushedOrNugget) {
      console.error(`${metal} doesn't have crushed or nugget`);
      continue;
    }

    // Simple Raw Ore Doubling Recipe
    x.shapeless(Item.of(crushedOrNugget, 2), [
      '#forge:hammers',
      raw.item,
    ]).damageIngredient(0);

    x.remove({ type: 'create:crushing', input: ore });
    // Ore Block "doubler"
    x.recipes.create.crushing(
      [
        Item.of(raw.item, raw.count),
        Item.of(raw.item, raw.count).withChance(0.75),
        Item.of(raw.item, raw.count).withChance(0.25),
      ],
      ore,
    );

    for (const type of [
      'create:splashing',
      'create:fan_washing',
      'minecraft:smelting',
      'minecraft:blasting',
      'create:fan_blasting',
    ]) {
      debug(`[REMOVE][${type}] ${crushed} & ${ore} & ${raw.item}`);
      x.remove({ type: type, input: crushed });
      x.remove({ type: type, input: ore });
      x.remove({ type: type, input: raw.item });
    }

    //
    debug(`[REMOVE][create:compacting] ${raw.item}`);
    x.remove({ type: 'create:compacting', input: raw.item });

    x.recipes.create.compacting(
      [Item.of(crushedOrNugget, 2), slag.withChance(0.05)],
      [raw.item, Fluid.lava(50)],
    );
    x.recipes.create
      .compacting(
        [Item.of(crushedOrNugget, 3), slag.withChance(0.15)],
        raw.item,
      )
      .heated();
    x.recipes.create
      .compacting([Item.of(crushedOrNugget, 5), slag.withChance(0.3)], raw.item)
      .superheated();

    // @TODO Revamp how minecolonies does all this. It should work together
    x.remove({ type: 'minecolonies:smelter' });
    // Replace smelter recipe: (in: ore, out: raw -> in:ore, out: raw * count)
    // x.replaceOutput({ type: 'minecolonies:smelter', input: ore }, raw.item, Item.of(raw.item, raw.count));
    // Replace smelter recipe: (in: raw, out: ingot -> in:raw, out: crushedOrNugget)
    // x.replaceOutput({ type: 'minecolonies:smelter', input: raw.item }, ingot, crushedOrNugget);
    // Add recipe: (in: crushed, out: nugget)

    if (Item.exists(nugget) && !Item.exists(crushed)) {
      debug(`[ADD][minecraft:smelting] ${ore} & ${raw.item} -> ${nugget}`);
      debug(`[ADD][minecraft:blasting] ${ore} & ${raw.item} -> ${nugget}`);
      [ore, raw.item].forEach((item) => {
        x.smelting(nugget, item);
        x.blasting(nugget, item);
      });
    }

    if (Item.exists(nugget) && Item.exists(crushed)) {
      debug(`[ADD][minecraft:blasting] ${crushed} -> ${nuggetOrIngot}`);
      x.blasting(nuggetOrIngot, crushed);
      debug(
        `[ADD][minecraft:seething] ${crushed} -> ${nuggetOrIngot} + .75% ${nuggetOrIngot}`,
      );
      seething(
        [nuggetOrIngot, Item.of(nuggetOrIngot).withChance(0.75)],
        crushed,
      );
      debug(
        `[UPDATE][create:crushing] ${raw.item} -> 2x ${crushed} + .75% create:experience_nugget`,
      );
      x.remove({ type: 'create:crushing', input: raw.item });
      x.recipes.create.crushing(
        [
          Item.of(crushed, 2),
          Item.of('create:experience_nugget').withChance(0.75),
        ],
        raw.item,
      );
      if (washing) {
        debug(`[ADDING][create:splashing] ${crushed} -> ${washing}`);
        x.recipes.create.splashing(washing, crushed);
      }
    }

    if (compressed) {
      x.forEachRecipe(
        { type: 'create:fan_washing', input: compressedBlock },
        (recipe) => {
          debug(
            `[UPDATE][${recipe.type}][${recipe.id}] Removing ${recipe.originalRecipeResult}`,
          );
          x.replaceOutput(
            { output: recipe.originalRecipeResult },
            recipe.originalRecipeResult,
            '',
          );
        },
      );
      for (const type of [
        'create:splashing',
        'create:fan_washing',
        'minecraft:smelting',
        'minecraft:blasting',
        'create:fan_blasting',
      ]) {
        debug(`[REMOVE][${type}] ${compressedBlock}`);
        x.remove({ type: type, input: compressedBlock });
      }

      debug(`[ADD][minecraft:blasting] ${compressedBlock} -> ${ingot}`);
      x.blasting(ingot, compressedBlock);
      debug(
        `[ADD][create_dd:seething] ${compressedBlock} -> ${ingot} + .6666% ${ingot}`,
      );
      seething([ingot, Item.of(ingot).withChance(0.6666666)], compressedBlock);

      if (washing) {
        debug(`[ADD][create:splashing] ${compressedBlock} -> 9x ${washing}`);
        x.recipes.create.splashing(washing.withCount(9), compressedBlock);
      }
    }
  }
});
