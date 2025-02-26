ServerEvents.recipes((x) => {
  x.replaceInput(
    {
      type: 'create:mixing',
      input: 'tfmg:limesand',
      output: 'tfmg:blasting_mixture',
    },
    'create:crushed_raw_iron',
    [
      'create:crushed_raw_iron',
      'createmetallurgy:dirty_iron_dust',
      'createmetallurgy:iron_dust',
    ],
  );

  x.remove({ output: 'createloveandwar:steel_ingot' });
});
