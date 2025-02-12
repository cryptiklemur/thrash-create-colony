ServerEvents.recipes((x) => {
  x.forEachRecipe(
    { output: '#forge:dyes', type: 'minecraft:crafting_shapeless' },
    (r) => {
      x.shapeless(
        r.originalRecipeResult,
        [Item.of('croptopia:mortar_and_pestle')].concat(
          r.originalRecipeIngredients,
        ),
      ).id(r.getId() + '_manual_only');
      x.recipes.create.mixing(
        r.originalRecipeResult,
        r.originalRecipeIngredients,
      );

      x.remove({ id: r.getId() });
    },
  );

  x.shapeless('2x minecraft:green_dye', [
    ['minecraft:large_fern', 'minecraft:fern'],
  ]);
});
