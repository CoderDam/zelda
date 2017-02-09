var app = {
  /*
   * 1. Dans js/app.js, on va créer un objet app responsable de l'ajout des objets dans le DOM. On va créer un conteneur #map.
   * 2. L'élément #map doit aussi recevoir en style des dimensions, en fonction de la longueur de l'objet map (de js/map.js). Chaque tuile est un carré 16 pixels.
   */
  init: function() {

  },


  /*
   * 3. Dans #map, on va venir ajouter en enfant toutes les tuiles .tile.
   */
  createTiles: function() {

    //Parcours de la liste des tuiles pour récupérer chaque tuile.
    for (var line = 0; line < map.tiles.length; line++) {

      for (var column = 0; column < map.tiles[line].length; column++) {
        // Préparation de la création de la tuile.
        //tileCharacter correpond au motif de la tuile: +, $, X
        var tileCharacter = map.tiles[line][column];
        tile.create(0,0);
      }
    }

  },
}


/*
 * Chargement du DOM
 */
document.addEventListener('DOMContentLoaded', app.init);
