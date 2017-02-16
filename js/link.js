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
    // on fixe sa position initiale
    link.posX = app.startX;
    link.posY = app.startY;
    // on crée la div
    link.$DOM = $('<div>')
      .attr({
        id: 'link',
        class: 'front',
      })
      .css({
        left: link.getGraphicPosition('x',link.posX),
        top: link.getGraphicPosition('y',link.posY),
      })
      .appendTo(app.$mapDOM);
    // console.log(link.posX,link.posY);
  },


  kill: function() {
    // on s'assure que le compteur de vies revienne à 0
    stats.removeLives(stats.lives);
    // on supprime le personnage
    $('#link').remove();
  },


  getGraphicPosition: function(axis,pos) {
    switch (axis) {
      case 'x':
        return pos*16-4;
      case 'y':
        return pos*16-6;
    }
  },


  /*
  * Déclenche les fonctions moveTop, moveRight, moveBottom, moveLeft
  * en fonction de la touche qui a été appuyée
  */
  moveHandler: function(event) {
    // on vérifie que Link existe
    if ($('#link').length !== 0) {
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
    link.$DOM.attr({ class: 'left' });
    // on appelle la fonction en lui passant
    // la nouvelle position souhaitée
    link.move('x',link.posX-1);
  },

  moveRight: function() {
    // on change la class en fonction de la nouvelle orientation
    link.$DOM.attr({ class: 'right' });
    // on appelle la fonction en lui passant
    // la nouvelle position souhaitée
    link.move('x',link.posX+1);
  },

  moveTop: function() {
    // on change la class en fonction de la nouvelle orientation
    link.$DOM.attr({ class: 'back' });
    // on appelle la fonction en lui passant
    // la nouvelle position souhaitée
    link.move('y',link.posY-1);
  },

  moveBottom: function() {
    // on change la class en fonction de la nouvelle orientation
    link.$DOM.attr({ class: 'front' });
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
          link.$DOM.css({ left: link.getGraphicPosition('x',link.posX) });
          break;
        // vertical
        case 'y':
          // on ajuste la nouvelle position
          link.posY = pos;
          // et on applique le changement graphique
          link.$DOM.css({ top: link.getGraphicPosition('y',link.posY) });
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
      case 'o':
        return true;
      case '#':
        app.changeLevel();
        break;
      case '$':
        if (stats.objects[map.types[toGo]]===false) {
          link.getObject(map.types[toGo]);
          tile.removeTile(map.types[toGo]);
        }
        return true;
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
    if ($('#object-'+objectName).length === 0) {
      // création div
      app.$objectDOM = $('<div>')
        .attr({ id: 'object-' + objectName })
        .addClass('tile stone ' + objectName)
        .appendTo($('#back-pack'));
      // ajout à l'inventaire
      stats.objects[objectName] = true;
      // ajout d'une vie
      stats.createLives(1);
    }
  }
};
