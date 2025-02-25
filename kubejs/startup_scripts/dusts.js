StartupEvents.registry('item', (x) => {
  x.create('silver_dust')
    .maxStackSize(64)
    .displayName('Silver Dust')
    .tag('c:dusts')
    .tag('forge:dusts')
    .tag('forge:dusts/silver');
  x.create('aluminum_dust')
    .maxStackSize(64)
    .displayName('Aluminum Dust')
    .tag('c:dusts')
    .tag('forge:dusts')
    .tag('forge:dusts/aluminum');
});
