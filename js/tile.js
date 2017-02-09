var tile = {
  /*
   * 1. Dans js/tile.js, on va créer un objet tile responsable de
	 la création des tuiles. On peut créer une méthode create
	 chargé de créer une tuile.
   */
  create: function(posX, posY) {
		// récupération de la div où créer la tuile
		var map = document.getElementById('map');
		// création d'une tuile
		var tile = document.createElement('div');
		// attibution des classes
		tile.className = this.getClasses(posX,posY);
		// attribution du style position
		tile.style = this.getStyle(posX,posY);
		// envoi de la tuile dans map
		map.appendChild(tile);
  },


  /*
   * 2. Pour créer une tuile, il faut lui donner les bonnes classes,
	 comme décrit plus haut. Pour cela, on peut créer une méthode
	 getClassname.
   */
  getClasses: function(posX, posY) {
		// première classe : tile
		var classes = 'tile';
		// on regarde son type en fonction de X et Y
		classes += ' ' + tile.getType(posX,posY);
		// on regarde le type de chacune des 4 tuiles autour
		// top
		classes += (posY>0) ? (' top-' + tile.getType(posX,posY-1)) : (' no-top');
		// right
		classes += ' right-' + tile.getType(posX+1,posY);
		// bottom
		classes += ' bottom-' + tile.getType(posX,posY+1);
		// left
		classes += (posX>0) ? (' left-' + tile.getType(posX-1,posY)) : (' no-left');
		// on retourne la liste des classes
		return classes;
  },


  /*
   * 3. Pour venir positionner les tuiles, on utilise des
	 position: absolute. Il faut donc ajouter du style
	 (top et left) pour venir placer la tuile au bon endroit,
	 avec une méthode getStyle.
   */
  getStyle: function(posX, posY) {
		// on donne l'alignement horizontal
		var style = 'left:';
		style += (posX*16);
		style += 'px;';
		// on donne l'alignement vertical
		style += 'top:';
		style += (posY*16);
		style += 'px;';
		return style;
  },


  /*
   * 4. Pour chaque tuile, on peut aussi utiliser une méthode
	 getType qui sera chargé de récupérer le type de tuile,
	 en utilisant l'objet map.
   */
  getType: function(posX, posY) {
		// on récupère le symbole dans le tableau map.tiles
		var tileType = map.tiles[posY].indexOf(posX);
		// on converti le symbole en mot
		var tileWordType = map.tiles[tileType];
		// on retourne le nom du type de sol pour la class
		return tileWordType;
  },
};
