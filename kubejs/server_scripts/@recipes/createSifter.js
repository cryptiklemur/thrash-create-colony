const map = {
  'minecraft:sand': {
    'minecraft:redstone': [0.025, 0.05, 0.075, 0.125, [0.225, 0.075]],
    'minecraft:bone_meal': [0.05, 0.1, 0.15, 0.2, 0.25],
    'minecraft:quartz': [0, 0, 0.025, 0.05, [0.15, 0.05]],
    'create:experience_nugget': [0, 0, 0.05, 0.05, 0.1],
    'minecraft:blaze_powder': [0, 0, 0, 0.025, 0.05],
    'minecraft:glowstone_dust': [0, 0, 0, 0.075, 0.1],
  },
  'minecraft:gravel': {
    'minecraft:lapis_lazuli': [0, 0, 0.01, 0.05, 0.05],
    'minecraft:coal': [0, 0.05, 0.05, 0.1, 0.1],
    'minecraft:flint': [0, 0.05, 0.05, 0.05, 0.05],
    'minecraft:diamond': [0, 0, 0, 0, 0.01],
    'minecraft:emerald': [0, 0, 0, 0, 0.005],
    'create:experience_nugget': [0, 0, 0.05, 0.05, 0.1],
    'create:crushed_raw_copper': [0, 0, 0.025, 0.05, [0.05, 0.05]],
    'create:crushed_raw_iron': [0, 0.005, 0.025, 0.05, [0.075, 0.025]],
    'create:crushed_raw_zinc': [0, 0.025, 0.05, [0.05, 0.05], [0.1, 0.05]],
    'create:crushed_raw_gold': [0, 0, 0.005, 0.025, [0.05, 0.025]],
  },
};

const meshes = [
  'createsifter:string_mesh',
  'createsifter:andesite_mesh',
  'createsifter:zinc_mesh',
  'createsifter:brass_mesh',
  'createsifter:advanced_brass_mesh',
];

ServerEvents.recipes((x) => {
  for (const type of Object.keys(map)) {
    x.remove({ mod: 'createsifter', input: type });
    for (let i = 0; i < 5; i++) {
      let mesh = meshes[i];
      let ingredients = [type, mesh];
      let results = Object.keys(map[type]).reduce((curr, output) => {
        let chances = map[type][output][i];
        if (!Array.isArray(chances)) {
          chances = [chances];
        }
        for (const chance of chances) {
          if (chance > 0) {
            curr.push(Item.of(output).withChance(chance));
          }
        }

        return curr;
      }, []);

      x.recipes.createsifter.sifting(results, ingredients);
    }
  }
});
