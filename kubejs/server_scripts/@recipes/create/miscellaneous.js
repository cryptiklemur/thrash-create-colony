ServerEvents.recipes((x) => {
  x.shapeless('9x createloveandwar:brass_mix', [
    '#forge:ingots/zinc',
    '#forge:ingots/zinc',
    '#forge:ingots/copper',
    '#forge:ingots/copper',
  ]);

  x.custom({
    type: 'create_new_age:energising',
    energy_needed: 10000,
    ingredients: [
      {
        tag: 'forge:ores/iron',
      },
    ],
    results: [
      {
        item: 'create_new_age:magnetite_block',
      },
    ],
  });
});
