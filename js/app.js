var app = {
  /*
   * 1. Dans js/app.js, on va créer un objet app responsable de l'ajout des objets dans le DOM. On va créer un conteneur #map.
   * 2. L'élément #map doit aussi recevoir en style des dimensions, en fonction de la longueur de l'objet map (de js/map.js). Chaque tuile est un carré 16 pixels.
   */
  init: function() {
    // on crée #stats
    app.createStats();
    // on crée #map
		app.createMap();
    // on crée les tuiles
    app.createTiles();
    // on crée le personnage
    app.mapDOM.appendChild(link.create());
		// on écoute les touches de mvt
		document.addEventListener('keydown',link.moveHandler);

  },


  /*
   * 3. Dans #map, on va venir ajouter en enfant toutes les tuiles .tile.
   */
  createTiles: function() {
    //Parcours de la liste des tuiles pour récupérer chaque tuile.
    for (var line = 0; line < map.tiles.length; line++) {
      for (var column = 0; column < map.tiles[line].length; column++) {
        // Préparation de la création de la tuile.
        tile.create(column, line);
      }
    }
  },

	createMap: function() {
		// on crée #map
		app.mapDOM = document.createElement('div');
		// on lui ajoute l'id
		app.mapDOM.id = 'map';
		// on la style
		app.mapDOM.style.height = map.tiles.length*16+'px';
		app.mapDOM.style.width = map.tiles[0].length*16+'px';
		// on l'envoie dans #container
		var container = document.getElementById('container');
		container.appendChild(app.mapDOM);
	},

	createStats: function() {
		// on crée #stats
		app.statsDOM = document.createElement('aside');
		// on lui ajoute l'id
		app.statsDOM.id = 'stats';
		// on la style
		app.statsDOM.style.height = map.tiles.length*16+'px';
		app.statsDOM.style.width = 250+'px';
		// on l'envoie dans #container
		var container = document.getElementById('container');
		container.appendChild(app.statsDOM);
		// on crée les stats
		stats.create();
	},

  gameOver: function() {
    // création écran fin
    app.gameOverScreen = document.createElement('div');
    // on lui ajoute d'id
    app.gameOverScreen.id = 'game-over';
    // on lui ajoute une class
    app.gameOverScreen.className = 'screen';
    // on le style
    app.gameOverScreen.style.height = map.tiles.length*16+'px';
    app.gameOverScreen.style.width = map.tiles[0].length*16+'px';
    // on crée le texte
    app.gameOverText = document.createElement('span');
    app.gameOverText.textContent = 'OMG, you\'ve killed link!';
    // on lui donne la class
    app.gameOverText.className = 'text';
    // on l'envoie dans #game-over
    app.gameOverScreen.appendChild(app.gameOverText);
    // on l'envoie dans #map
    app.mapDOM.appendChild(app.gameOverScreen);
    // on lui ajoute la class visible
    app.gameOverScreen.className += ' screen--visible';
  },

}


/*
 * Chargement du DOM
 */
document.addEventListener('DOMContentLoaded', app.init);
