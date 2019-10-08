
const folderData = require('../../../folderData');

const createFolder = (knex, folder) => {
  return knex('folders').insert({
    name: folder.name
  }, 'id')
    .then(folderId => {
      let palettePromises = [];

      folder.palettes.forEach(palette => {
        palettePromises.push(
          createPalette(knex, {
            name: palette.name,
            c1: palette.c1,
            c2: palette.c2,
            c3: palette.c3,
            c4: palette.c4,
            c5: palette.c5,
            folder_id: folderId[0]
          })
        )
      })

      return Promise.all(palettePromises)
    })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
};

exports.seed = (knex) => {
  return knex('palettes').del()
    .then(() => knex('folders').del())
    .then(() => {
      let folderPromises = [];

      folderData.forEach(folder => { 
        folderPromises.push(createFolder(knex, folder))
      });

      return Promise.all(folderPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
