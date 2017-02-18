var tile = {
  /*
   * 1. Dans js/tile.js, on va créer un objet tile responsable de
   la création des tuiles. On peut créer une méthode create
   chargé de créer une tuile.
   */
  create: function(posX, posY) {
    // création d'une tuile
    tile.$tile = $('<div>')
      .attr({ class: tile.getClasses(posX,posY) })
      .css(tile.getStyle(posX,posY))
      .appendTo($('#map'));
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
    classes += (posX+1<map.tiles[app.level][posY].length) ? (' right-' + tile.getType(posX+1,posY)) : ('');
    // bottom
    classes += (posY+1<map.tiles[app.level].length) ? (' bottom-' + tile.getType(posX,posY+1)) : ('');
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
    return style = {
      left: (posX*16),
      top: (posY*16)
    };
  },


  /*
   * 4. Pour chaque tuile, on peut aussi utiliser une méthode
   getType qui sera chargé de récupérer le type de tuile,
   en utilisant l'objet map.
   */
  getType: function(posX, posY) {
    // on récupère le symbole dans le tableau map.tiles
    var tileType = map.tiles[app.level][posY].charAt(posX);
    // si c'est le start point, on le précise dans l'app
    if (tileType === 'o') {
      app.startX = posX;
      app.startY = posY;
    }
    // on converti le symbole en mot
    var tileWordType = map.types[tileType];
    // on retourne le nom du type de sol pour la class
    return tileWordType;
  },


  isObject: function(posX, posY) {
    if (tile.getType(posX,posY) === 'stone') {
      return true;
    }
    return false;
  },


  removeTile: function(posX,posY) {
    // console.info('removeTile');

    // on récupère la tuile
    // tile.$toRemoveDOM = $('#map .tile').css({
    //   left: 16*posX,
    //   top: 16*posY,
    // });
    // console.info(tile.$toRemoveDOM);
    // tile.$toRemoveDOM.remove();
  },


};
