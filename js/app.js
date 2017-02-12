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
    // on crée le panneau de stats
    app.createStatsPanel();
    // on crée le menu de démarrage
    app.startMenu();
  },


  createStatsPanel: function() {
    // on crée #stats
    app.statsDOM = document.createElement('aside');
    // on lui ajoute l'id
    app.statsDOM.id = 'stats';
    // on la style
    app.statsDOM.style.height = map.tiles[app.level].length*16+'px';
    // on l'envoie dans #container
    app.containerDOM = document.getElementById('container');
    app.containerDOM.appendChild(app.statsDOM);
  },


  startMenu: function() {
    app.startButton = document.createElement('button');
    app.startButton.id = 'start-button';
    app.startButton.textContent = 'Start';
    app.statsDOM.appendChild(app.startButton);
    app.startButton.addEventListener('click',app.startGame);
  },


  startGame: function() {
    app.level=0;
    app.statsDOM.removeChild(app.startButton);
    // on crée les stats
    stats.create();
    // on crée le jeu
    app.createGame();
  },


  createGame: function() {
    // s'il y a déjà une map, on la supprime
    if (document.getElementById('map')) {
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
    // on écoute les touches de mvt
    document.addEventListener('keydown',link.moveHandler);
  },


  createMap: function() {
    // on crée #map
    app.mapDOM = document.createElement('div');
    // on lui ajoute l'id
    app.mapDOM.id = 'map';
    // on la style
    app.mapDOM.style.height = map.tiles[app.level].length*16+'px';
    app.mapDOM.style.width = map.tiles[app.level][0].length*16+'px';
    // on l'envoie dans #container
    var container = document.getElementById('container');
    container.appendChild(app.mapDOM);
  },


  removeMap: function() {
    var container = document.getElementById('container');
    container.removeChild(document.getElementById('map'));
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
      clearInterval(app.timer);
      app.timing.tenth = 0;
      app.timing.sec = 0;
      app.timing.min = 0;
    }
    app.timerDOM = document.createElement('div');
    app.timerDOM.id = 'timer';
    app.timerDOM.textContent = app.displayTimer(app.timing);
    app.mapDOM.appendChild(app.timerDOM);
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
    app.timerDOM.textContent = app.displayTimer(app.timing);
  },


  displayTimer: function(timingArray) {
    app.timerText = app.convertTwoDigits(timingArray.min);
    app.timerText += ":" + app.convertTwoDigits(timingArray.sec);
    app.timerText += "." + timingArray.tenth;
    return app.timerText;
  },


  convertTwoDigits: function(number) {
    app.tempNumber = number.toString()
    if (app.tempNumber.length<2) {
      app.tempNumber = '0' + number;
    }
    return app.tempNumber;
  },


  resetTimer: function() {
    for (var duration in app.timing) {
      app.timing[duration] = 0;
    }
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
    app.gameEndScreen = app.displayScreen(endType);
    // on crée le texte
    app.gameEndText = document.createElement('span');
    app.gameEndText.innerHTML = app.screens[endType].text;
    // on lui donne la class
    app.gameEndText.className = 'text';
    // on l'envoie dans le screen
    app.gameEndScreen.appendChild(app.gameEndText);
    // on lui ajoute la class visible
    app.gameEndScreen.className += ' screen--visible';
  },


  displayScreen: function(endType) {
    // création écran
    app.gameScreen = document.createElement('div');
    // on lui ajoute une class
    app.gameScreen.className = 'screen';
    // on lui ajoute d'id
    app.gameScreen.id = app.screens[endType].className;
    // on le style
    app.gameScreen.style.height = map.tiles[app.level].length*16+'px';
    app.gameScreen.style.width = map.tiles[app.level][0].length*16+'px';
    // on l'envoie dans #map
    app.mapDOM.appendChild(app.gameScreen);
    return app.gameScreen;
  },


  displayGameTimes: function() {
    app.gameTimesDOM = document.createElement('div');
    app.gameTimesDOM.id = 'game-times';
    app.gameTimesDOM.textContent = 'Your times';
    for (var timers = 0; timers < stats.times.length; timers++) {
      app.playerTimer = document.createElement('div');
      app.playerTimer.className = 'timer';
      app.playerTimer.textContent = 'level ' + (timers+1) + ': ' + (stats.times[timers]);
      app.gameTimesDOM.appendChild(app.playerTimer);
    }
    app.mapDOM.appendChild(app.gameTimesDOM);
  },
}


/*
 * Chargement du DOM
 */
document.addEventListener('DOMContentLoaded', app.init);
