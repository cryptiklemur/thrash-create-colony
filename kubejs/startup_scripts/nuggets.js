StartupEvents.registry('item', (x) => {
  x.create('lead_nugget')
    .maxStackSize(64)
    .displayName('Lead Nugget')
    .tag('c:nuggets')
    .tag('forge:nuggets')
    .tag('forge:nuggets/lead');
  x.create('nickel_nugget')
    .maxStackSize(64)
    .displayName('Nickel Nugget')
    .tag('c:nuggets')
    .tag('forge:nuggets')
    .tag('forge:nuggets/nickel');
  x.create('lithium_nugget')
    .maxStackSize(64)
    .displayName('Lithium Nugget')
    .tag('c:nuggets')
    .tag('forge:nuggets')
    .tag('forge:nuggets/lithium');
});
