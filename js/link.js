var link = {
	/**
	*	Variables
	*/
	posX: (2*16-2.5),
	posY: (map.tiles.length*16-22),
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
		link.dom.style.top = link.posY+'px';
		link.dom.style.left = link.posX+'px';

    return link.dom;
  },


	/*
	* Déclenche les fonctions moveTop, moveRight, moveBottom, moveLeft
	* en fonction de la touche qui a été appuyée
	*/
	moveHandler: function(event) {

	},


  /*
   * Pour faire bouger link
   * Utilise isMovementAllowed
   *
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
   */
  move: function(posX, posY) {
		if (isMovementAllowded(posX) || isMovementAllowded(posY)) {

		}
  },


  /*
   * Pour faire bouger link dans un sens, et lui rajouter une classe
   * Utilise move
   */
  moveLeft: function() {
		link.dom.className = 'left';
		link.posX -= 16;
		link.dom.style.left = link.posX+'px';
  },

  moveRight: function() {
		link.dom.className = 'right';
		link.posX += 16;
		link.dom.style.left = link.posX+'px';
  },

  moveTop: function() {
		link.dom.className = 'back';
		link.posY -= 16;
		link.dom.style.top = link.posY+'px';
  },

  moveBottom: function() {
		link.dom.className = 'front';
		link.posY += 16;
		link.dom.style.top = link.posY+'px';
  },


  /*
   * Renvoie true ou false
   * - true si la position est de type 'soil' ou 'stone'
   * - true ou false au hasard, si de type 'mud'
   * - false si de type bush
   *
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
   */
  isMovementAllowed: function(pos) {

  },
};
