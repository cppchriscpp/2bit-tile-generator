export const AVAILABLE_TILE_TYPES = [
    'block',
    'brick', 
    //'plant', // Aka "bush"
    'grass', 
    'hole',
    'water', 
    // Unimplemented tile types (so far!) 
    // 'lava', 
    // 'rock', 
    // NOTE: Rock is easier than it seems! Copy circle but let it crop to the bottom of the image automatically. 
    // The bottom will flatten out and it looks almost perfect. Just need to colorize and add some texture
    // Dummied out it below
    // 'sand'
  ];

  export const DEFAULT_TILE_TYPE = 'block';
  // FIXME
  // export const DEFAULT_TILE_TYPE = 'plant';

  export const TILE_BACKGROUND_COLORS = {
    grass: 3,
    water: 2,
    lava: 3,
    rock: 3, 
    brick: 2,
    hole: 0,
    plant: 3,
    block: 3
  };
  
  export const TILE_NAMES = {
    grass: 'Grass',
    water: 'Water',
    lava: 'Lava',
    block: 'Block / Tile',
    brick: 'Brick Wall',
    rock: 'Rock',
    hole: 'Hole / Gap',
    plant: 'Bush',
  }
  
  export const TILE_OPTIONS = {
    grass: [
      {name: 'Short Blades', min: 0, max: 10, type: 'range'},
      {name: 'Tall Blades', min: 0, max: 10, type: 'range'},
      {name: 'Triangles', min: 0, max: 8, type: 'range'}
    ],
    water: [
      {name: 'Lines', min: 2, max: 4, type: 'range'},
      // Couldn't quite get what I wanted out of this - the areas kind of need to be relative to the lines, and 
      // that's a bit more complex than I'd hoped.
      {name: 'Deeper Areas', min: 0, max: 3, type: 'range', disabled: true, defaultValue: 0}
    ],
    lava: [],
    rock: [],
    brick: [
      {name: 'Brick Width', min: 5, max: 12, type: 'range'},
      {name: 'Brick Height', min: 2, max: 12, type: 'range'},
      {name: 'Brick Color', type: 'palette', defaultValue: 2}
    ],
    block: [
      // {name: 'Color', type: 'palette', defaultValue: 2}
      {name: 'Height', min: 2, max: 8, type: 'range'}
    ],
    hole: [
      {name: 'Hole Size', min: 6, max: 14, type: 'range', step: 2},
      {name: 'Fuzz Area', min: 1, max: 2, type: 'range', defaultValue: 1}
    ],
    plant: [
      {name: 'Bush Size', min: 3, max: 7, type: 'range'},
      {name: 'Bush Color', type: 'palette', defaultValue: 2},
      {name: 'Freckle Count', min: 3, max: 8, type: 'range'}
    ]
  }
  