var link = {
	/**
	*	Variables
	*/
	posX: 2,
	posY: map.tiles.length-1,
	allowedMove: {
		left: false,
		right: true,
		top: true,
		bottom: false,
	},
  /*
   * 1. Créer un élément DOM
   * 2. Le positioner à map.startPosition
   * 3. poser les évenements clavier
   */
  create: function() {
    link.dom = document.createElement('div');
    link.dom.id = 'link';
    link.dom.className = 'front';
		// on fixe la position initiale
		link.dom.style.left = link.getGraphicPosition('x',link.posX)+'px';
		link.dom.style.top = link.getGraphicPosition('y',link.posY)+'px';

    return link.dom;
  },


	/*
	* Déclenche les fonctions moveTop, moveRight, moveBottom, moveLeft
	* en fonction de la touche qui a été appuyée
	*/
	moveHandler: function(event) {
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
	},


  /*
   * Pour faire bouger link
   * Utilise isMovementAllowed
   *
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
   */
  move: function(axis, pos) {
		// si le déplacement est validé
		if (link.isMovementAllowed(axis,pos)) {
			// on sépare les 2 type de déplacement possible
			switch (axis) {
				// horizontal
				case 'x'||'X'||'left':
						// on ajuste la nouvelle position
						link.posX = pos;
						// et on applique le changement graphique
						link.dom.style.left = link.getGraphicPosition('x',link.posX)+'px';
					break;
				// vertical
				case 'y'||'Y'||'top':
						// on ajuste la nouvelle position
						link.posY = pos;
						// et on applique le changement graphique
						link.dom.style.top = link.getGraphicPosition('y',link.posY)+'px';
					break;
			};
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
   * Renvoie true ou false
   * - true si la position est de type 'soil' ou 'stone'
   * - true ou false au hasard, si de type 'mud'
   * - false si de type bush
   *
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
   */
  isMovementAllowed: function(axis,pos) {
		console.info('x'+link.posX,'y'+link.posY);
		console.warn(axis,pos);
		// on sépare les 2 axes de déplacement possible
		switch (axis) {
			case 'x'||'X'||'left':
				return (map.tiles[link.posY].charAt(pos) === (' ' || '$')) ? true : false;
				break;
			case 'y'||'Y'||'top':
				return (map.tiles[pos].charAt(link.posX) === (' ' || '$')) ? true : false;
				break;
		}
		return true;
  },

	getGraphicPosition: function(axis,pos) {
		switch (axis) {
			case 'x'||'X'||'left':
				return pos*16-2.5;
				break;
			case 'y'||'Y'||'top':
				return pos*16-6;
				break;
		}
	},
};
