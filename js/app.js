var app = {

  level: 0,
  startX: 0,
  startY: 0,
  timing: {
    tenth: 0,
    sec: 0,
    min: 0,
  },
  screens: {
    gameOver: {
      className: 'game-over',
      text: 'OMG, you killed Link!<br />(in the mud, what a shame...)',
    },
    gameWon: {
      className: 'game-won',
      text:'Congrats, you ended the game!',
    },
  },


  /*
   * 1. Dans js/app.js, on va créer un objet app responsable de l'ajout des objets dans le DOM. On va créer un conteneur #map.
   * 2. L'élément #map doit aussi recevoir en style des dimensions, en fonction de la longueur de l'objet map (de js/map.js). Chaque tuile est un carré 16 pixels.
   */
  init: function() {
    console.info('app.init');

    // on crée le panneau de stats
    app.createStatsPanel();
    // on crée le menu de démarrage
    app.startMenu();
  },


  createStatsPanel: function() {
    console.info('app.createStatsPanel');

    // on crée #stats, lui ajoute id et style
    // et on l'envoie dans #container
    app.$statsDOM = $('<aside>')
      .attr({ id: 'stats' })
      .css({ height: map.tiles[app.level].length*16 })
      .appendTo($('#container'));

    console.log(app.$statsDOM);
  },


  startMenu: function() {
    console.info('app.startMenu');

    app.$startButtonDOM = $('<button>')
      .attr({ id: 'start-button' })
      .text('Start')
      .appendTo(app.$statsDOM)
      .on('click',app.startGame);
  },


  startGame: function() {
    console.info('app.startGame');

    app.level=0;
    app.$startButtonDOM.remove();
    // on crée les stats
    stats.create();
    // on crée le jeu
    app.createGame();
    // on écoute les touches de mvt
    $(document).off('keydown');
    $(document).on('keydown',link.moveHandler);
  },


  createGame: function() {
    console.info('app.createGame');

    // s'il y a déjà une map, on la supprime
    if ($('#map').length !== 0) {
      app.removeMap();
    }
    // on crée #map
    app.createMap();
    // on crée les tuiles
    app.createTiles();
    // console.info(app.startX,app.startY)
    // on crée le personnage
    link.create();
    console.info(link.posX,link.posY);
    // on crée le timer
    app.createTimer();
    // on lance le timer
    app.timer = setInterval(app.increaseTimer,100);
  },


  createMap: function() {
    console.info('app.createMap');

    // on crée #map
    app.$mapDOM = $('<div>')
      .attr({ id: 'map' })
      .css({
        height: map.tiles[app.level].length*16,
        width: map.tiles[app.level][0].length*16
      })
      .appendTo('#container');
  },


  removeMap: function() {
    $('#map').remove();
  },


  /*
   * 3. Dans #map, on va venir ajouter en enfant toutes les tuiles .tile.
   */
  createTiles: function() {
    //Parcours de la liste des tuiles pour récupérer chaque tuile.
    for (var line = 0; line < map.tiles[app.level].length; line++) {
      for (var column = 0; column < map.tiles[app.level][line].length; column++) {
        // Préparation de la création de la tuile.
        tile.create(column, line);
      }
    }
  },


  createTimer: function() {
    if (app.timer) {
      app.resetTimer;
    }
    app.$timerDOM = $('<div>')
      .attr({ id: 'timer'})
      .text(app.displayTimer(app.timing))
      .appendTo(app.$mapDOM);
  },


  increaseTimer: function() {
    app.timing.tenth++;
    if (app.timing.tenth>=10) {
      app.timing.tenth = 0;
      app.timing.sec++;
    }
    if (app.timing.sec>=60) {
      app.timing.sec = 0;
      app.timing.min++;
    }
    app.$timerDOM.text(app.displayTimer(app.timing));
  },


  displayTimer: function(timingArray) {
    app.timerText = app.convertTwoDigits(timingArray.min);
    app.timerText += ':' + app.convertTwoDigits(timingArray.sec);
    app.timerText += '.' + timingArray.tenth;
    return app.timerText;
  },


  convertTwoDigits: function(number) {
    app.tempNumber = number.toString();
    if (app.tempNumber.length<2) {
      app.tempNumber = '0' + number;
    }
    return app.tempNumber;
  },


  resetTimer: function() {
    clearInterval(app.timer);
    app.timing.tenth = 0;
    app.timing.sec = 0;
    app.timing.min = 0;
  },


  changeLevel: function() {
    // on enregistre le timer dans stats
    stats.times.push(app.displayTimer(app.timing));
    app.resetTimer();
    console.log(stats.times);
    // s'il existe un niveau suivant
    if (map.tiles[app.level+1]) {
      // on va au niveau suivant
      app.level++;
      app.createGame();
    }
    // sinon
    else {
      // en envoie l'écran de fin
      app.gameEnd('gameWon');
    }
  },


  gameEnd: function(endType) {
    clearInterval(app.timer);
    link.kill();
    stats.removeBackPack();
    app.displayGameEnd(endType);
    app.displayGameTimes();
    app.startMenu();
  },


  displayGameEnd: function(endType) {
    app.$gameEndScreen = app.displayScreen(endType);
    // on crée le texte
    app.$gameEndText = $('<span>')
      .html(app.screens[endType].text)
      .addClass('text')
      .appendTo(app.$gameEndScreen);
  },


  displayScreen: function(endType) {
    // création écran
    app.$gameScreen = $('<div>')
      .addClass('screen')
      .attr({ id: app.screens[endType].className})
      .css({
        height: map.tiles[app.level].length*16,
        width: map.tiles[app.level][0].length*16
      })
      .appendTo(app.$mapDOM);
    return app.$gameScreen;
  },


  displayGameTimes: function() {
    app.$gameTimesDOM = $('<div>')
      .attr({ id: 'game-times' })
      .text('Your times');

    for (var timers = 0; timers < stats.times.length; timers++) {
      app.$playerTimer = $('<div>')
        .addClass('timer')
        .text('level ' + (timers+1) + ': ' + (stats.times[timers]))
        .appendTo(app.$gameTimesDOM);
    }
    app.$mapDOM.append(app.$gameTimesDOM);
  },
};


/*
 * Chargement du DOM
 */
$(app.init);
