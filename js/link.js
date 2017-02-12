var link = {
	/**
	*	Variables
	*/
	posX: 0,
	posY: 0,
  /*
   * 1. Créer un élément DOM
   * 2. Le positioner à map.startPosition
   * 3. poser les évenements clavier
   */
  create: function() {
		// on crée la div
    link.dom = document.createElement('div');
		// on l'id
    link.dom.id = 'link';
		// on la class
    link.dom.className = 'front';
		// on fixe sa position initiale
		link.posX = app.startX;
		link.posY = app.startY;
		// console.log(link.posX,link.posY);
		link.dom.style.left = link.getGraphicPosition('x',link.posX)+'px';
		link.dom.style.top = link.getGraphicPosition('y',link.posY)+'px';
		// on l'affiche
    app.mapDOM.appendChild(link.dom);
  },


	kill: function() {
		// on s'assure que le compteur de vies revienne à 0
		stats.removeLives(stats.lives);
		// on récupère la map (au cas où)
		app.mapDOM = document.getElementById('map');
		// on supprime le personnage
		app.mapDOM.removeChild(document.getElementById('link'));
	},


	getGraphicPosition: function(axis,pos) {
		switch (axis) {
			case 'x':
			return pos*16-4;
			break;
			case 'y':
			return pos*16-6;
			break;
		}
	},


	/*
	* Déclenche les fonctions moveTop, moveRight, moveBottom, moveLeft
	* en fonction de la touche qui a été appuyée
	*/
	moveHandler: function(event) {
		// on vérifie que Link existe
		if (document.getElementById('link')) {
			// console.warn(link.posX,link.posY);
			// on sépare les 4 déplacement possibles
			// en fonction de la touche pressée
			switch (event.key) {
				case 'ArrowLeft':
					// on appelle la fonction correspondante
					link.moveLeft();
					break;
				case 'ArrowRight':
					// on appelle la fonction correspondante
					link.moveRight();
					break;
				case 'ArrowUp':
					// on appelle la fonction correspondante
					link.moveTop();
					break;
				case 'ArrowDown':
					// on appelle la fonction correspondante
					link.moveBottom();
					break;
			}
		}
	},


  /*
   * Pour faire bouger link dans un sens, et lui rajouter une classe
   * Utilise move
   */
  moveLeft: function() {
		// on change la class en fonction de la nouvelle orientation
		link.dom.className = 'left';
		// on appelle la fonction en lui passant
		// la nouvelle position souhaitée
		link.move('x',link.posX-1);
  },

  moveRight: function() {
		// on change la class en fonction de la nouvelle orientation
		link.dom.className = 'right';
		// on appelle la fonction en lui passant
		// la nouvelle position souhaitée
		link.move('x',link.posX+1);
  },

  moveTop: function() {
		// on change la class en fonction de la nouvelle orientation
		link.dom.className = 'back';
		// on appelle la fonction en lui passant
		// la nouvelle position souhaitée
		link.move('y',link.posY-1);
  },

  moveBottom: function() {
		// on change la class en fonction de la nouvelle orientation
		link.dom.className = 'front';
		// on appelle la fonction en lui passant
		// la nouvelle position souhaitée
		link.move('y',link.posY+1);
  },


	/*
	* Pour faire bouger link
	* Utilise isMovementAllowed
	*/
	move: function(axis, pos) {
		// si le déplacement est validé
		if (link.isMovementAllowed(axis,pos)) {
			// on sépare les 2 type de déplacement possible
			switch (axis) {
				// horizontal
				case 'x':
				// on ajuste la nouvelle position
				link.posX = pos;
				// et on applique le changement graphique
				link.dom.style.left = link.getGraphicPosition('x',link.posX)+'px';
				break;
				// vertical
				case 'y':
				// on ajuste la nouvelle position
				link.posY = pos;
				// et on applique le changement graphique
				link.dom.style.top = link.getGraphicPosition('y',link.posY)+'px';
				break;
			};
			console.log(link.posX,link.posY);
		}
	},


  /*
   * Renvoie true ou false
   * - true si la position est de type 'soil' ou 'stone'
   * - true ou false au hasard, si de type 'mud'
   * - false si de type bush
   */
  isMovementAllowed: function(axis,pos) {
		// console.info('x'+link.posX,'y'+link.posY);
		// console.warn(axis,pos);

		// on sépare les 2 axes de déplacement possible
		switch (axis) {
			case 'x':
				// on vérifie que la position souhaitée est dans le tableau
				if (pos>=0 && pos<map.tiles[app.level][link.posY].length) {
					// console.warn(map.tiles[link.posY].charAt(pos));

					// on retourne la réponse en fonction du terrain
					return link.movementOptions(map.tiles[app.level][link.posY].charAt(pos));
				}
				break;

			case 'y':
				// on vérifie que la position souhaitée est dans le tableau
				if (pos>=0 && pos<map.tiles[app.level].length) {
					// console.warn(map.tiles[pos].charAt(link.posX));

					// on retourne la réponse en fonction du terrain
					return link.movementOptions(map.tiles[app.level][pos].charAt(link.posX));
				}
				break;
		}
  },


	movementOptions: function(toGo) {
		switch (toGo) {
			case ' ':
				return true;
				break;
			case 'o':
				return true;
				break;
			case '#':
				app.changeLevel();
				break;
			case '$':
				link.getObject(map.types[toGo]);
				tile.removeTile(map.types[toGo]);
				return true;
				break;
			case 'x':
				var moveRand = Math.random();
				if (moveRand<.5) {
					return true;
				}
				else {
					stats.removeLives(1);
				}
				break;
			default:
				return false;
		}
	},


	getObject: function(objectName) {
		// si elle n'existe pas déjà
		if (!document.getElementById('object-'+objectName)) {
			// création div
			app.objectDOM = document.createElement('div');
			// attribution id
			app.objectDOM.id = 'object-'+objectName;
			// attribution classes
			app.objectDOM.className = 'tile';
			app.objectDOM.className += ' stone';
			app.objectDOM.className += ' '+objectName;
			// affiliation à #stats
			stats.backPack = document.getElementById('back-pack');
			stats.backPack.appendChild(app.objectDOM);
			// ajout à l'inventaire
			stats.objects.stone = true;
			// ajout d'une vie
			stats.createLives(1);
		}
	}
};
