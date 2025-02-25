const colorMixtures = {
  brown: [
    ['red', 'yellow', 'blue'],
    ['orange', 'blue', 'green'],
  ],
  black: [
    ['red', 'green', 'blue'],
    ['blue', 'brown'],
  ],
};

const defaultOptions = { shapeless: true, milling: true, crushing: true };

ServerEvents.tags('item', (x) => {
  x.add(
    'forge:millable_to_green_dye',
    '#minecraft:saplings',
    '#minecraft:leaves',
    '#vintagedelight:slime_ball_fermenting',
    '#chipped:vine',
    'minecraft:tall_grass',
    'minecraft:grass',
    'minecraft:fern',
    'minecraft:large_fern',
  );
  x.add(
    'forge:millable_to_yellow_dye',
    '#forge:ingots/gold',
    'biomesoplenty:goldenrod',
  );
});

ServerEvents.recipes((x) => {
  const mp = Item.of('croptopia:mortar_and_pestle');

  function createRecipes(output, input, options) {
    if (options === undefined) {
      options = defaultOptions;
    }

    if (options.shapeless !== false) {
      x.shapeless(output, [mp, input]);
    }
    if (options.milling !== false) {
      x.recipes.create.milling(Item.of(output, 2), input);
    }
    if (options.crushing !== false) {
      x.recipes.create.crushing(
        [Item.of(output, 2), Item.of(output, 1).withChance(0.1)],
        input,
      );
    }
  }

  x.forEachRecipe(
    { output: '#forge:dyes', type: 'minecraft:crafting_shapeless' },
    (r) => {
      x.shapeless(
        r.originalRecipeResult,
        [mp].concat(r.originalRecipeIngredients),
      ).id(r.getId() + '_manual_only');
      x.recipes.create.mixing(
        r.originalRecipeResult,
        r.originalRecipeIngredients,
      );

      x.remove({ id: r.getId() });
    },
  );

  for (const color of Object.keys(colorMixtures)) {
    colorMixtures[color].forEach((recipe) => {
      x.shapeless(
        `minecraft:${color}_dye`,
        [mp].concat(recipe.map((c) => Item.of(`minecraft:${c}_dye`))),
      );
    });
  }

  createRecipes('minecraft:green_dye', '#forge:millable_to_green_dye');

  x.remove({
    output: Item.of('minecraft:gold_nugget', 9),
    input: 'minecraft:gold_ingot',
    type: 'create:crushing',
  });
  createRecipes('minecraft:yellow_dye', '#forge:millable_to_yellow_dye');

  // Mortar and pestle any mud into brown dye
  x.recipes.create.mixing('2x minecraft:brown_dye', 'minecraft:mud').heated();
  x.recipes.create
    .mixing('5x minecraft:brown_dye', 'minecraft:mud')
    .superheated();
});
