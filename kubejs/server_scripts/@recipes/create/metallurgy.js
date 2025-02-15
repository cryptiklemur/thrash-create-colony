const dusts = ['copper', 'iron', 'gold', 'zinc'];

ServerEvents.recipes((x) => {
  dusts.forEach((dust) => {
    const dirty = Item.of(`createmetallurgy:dirty_${dust}_dust`);
    const clean = Item.of(`createmetallurgy:${dust}_dust`);
  });
});
