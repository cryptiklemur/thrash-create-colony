ServerEvents.tags('item', (x) => {
  x.add('forge:empty_bucket', 'woodenbucket:wooden_bucket');
  x.add('forge:empty_buckets', 'woodenbucket:wooden_bucket');
  x.add('forge:buckets/empty', 'woodenbucket:wooden_bucket');
  x.add('c:empty_buckets', 'woodenbucket:wooden_bucket');
  x.add('create:ignored_in_automatic_shapeless', 'woodenbucket:wooden_bucket');
  x.add('create:upright_on_belt', 'woodenbucket:wooden_bucket');
  x.add('bakery:container', 'woodenbucket:wooden_bucket');
  x.add('ae2:p2p_attunements/fluid_p2p_tunnel', 'woodenbucket:wooden_bucket');
  x.add('vintagedelight:container_items', 'woodenbucket:wooden_bucket');
  x.add('farmersdelight:serving_containers', 'woodenbucket:wooden_bucket');
});

ServerEvents.recipes((x) => {
  x.shaped('minecraft:hopper', ['A  A', 'ABA', ' A '], {
    A: 'minecraft:iron_ingot',
    B: 'woddenhopper:wooden_hopper',
  });
});
