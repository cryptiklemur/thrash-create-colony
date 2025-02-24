// Wash ancient debris into Washed Ancient Debris (new item, same item/block as chipped:sanded_ancient_debris)
StartupEvents.registry('block', (x) => {
  x.create('washed_ancient_debris')
    .displayName('Washed Ancient Debris')
    .soundType(SoundType.ANCIENT_DEBRIS);
});
