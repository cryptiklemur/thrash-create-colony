ServerEvents.recipes((x) => {
  x.remove({ output: 'prettypipes:item_terminal' });
  x.remove({ output: 'prettypipes:crafting_terminal' });

  x.remove({ input: 'ppfluids:fluid_pipe' });
  x.remove({ output: 'ppfluids:fluid_pipe' });
  x.shapeless('ppfluids:fluid_pipe', [
    'prettypipes:pipe',
    '#forge:empty_buckets',
  ]);
  x.shapeless('prettypipes:pipe', ['ppfluids:fluid_pipe', '#forge:glass']);
  x.shaped(Item.of('ppfluids:fluid_pipe', 4), [' A ', 'BCB', ' D '], {
    A: '#forge:dusts/redstone',
    B: 'minecraft:iron_bars',
    C: '#forge:empty_buckets',
    D: '#forge:ingots/copper',
  });
});
