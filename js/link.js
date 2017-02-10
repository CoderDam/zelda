var link = {
  /*
   * 1. Créer un élément DOM
   * 2. Le positioner à map.startPosition
   * 3. poser les évenements clavier
   */
  create: function() {
    link.dom = document.createElement('div');
    link.dom.id = 'link';
    link.dom.className = 'front';




    return link.dom;
  },


  /*
   * Pour faire bouger link
   * Utilise isMovementAllowed
   *
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch
   */
  move: function(posX, posY) {

  },


  /*
   * Pour faire bouger link dans un sens, et lui rajouter une classe
   * Utilise move
   */
  moveLeft: function() {

  },

  moveRight: function() {

  },

  moveTop: function() {

  },

  moveBottom: function() {

  },


  /*
   * Déclenche les fonctions moveTop, moveRight, moveBottom, moveLeft
   * en fonction de la touche qui a été appuyée
   */
  moveHandler: function(event) {

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
