ServerEvents.recipes((x) => {
  x.shapeless('9x createloveandwar:brass_mix', [
    '#forge:ingots/zinc',
    '#forge:ingots/zinc',
    '#forge:ingots/copper',
    '#forge:ingots/copper',
  ]);

  x.recipes.create.crushing([
    Item.of('biomesoplenty:rose_quartz_chunk', 4),
    Item.of('biomesoplenty:rose_quartz_chunk', 4).withChance(0.75),
    Item.of('biomesoplenty:rose_quartz_chunk', 4).withChance(0.25),
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
