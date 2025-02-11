ServerEvents.recipes((x) => {
  x.shaped('minecraft:hopper', ['A  A', 'ABA', ' A '], {
    A: 'minecraft:iron_ingot',
    B: 'woddenhopper:wooden_hopper',
  });
});
