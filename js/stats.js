var stats = {
  startLives: 5,
  lives: 0,
  objects: {
    stone: false,
  },
  times: [],

  create: function() {
    stats.times = [];
    stats.createLives(stats.startLives);
    stats.createBackPack();
  },

  createLives: function(number) {
    for (var lives = 0; lives < number; lives++) {
      if (stats.lives<30) {
        stats.lives++;

        console.warn('lives:',stats.lives);

        stats.$heartDOM = $('<div>')
          .addClass('heart')
          .appendTo(app.$statsDOM);
      }
    }
  },

  removeLives: function(number) {
    for (var lives = 0; lives < number; lives++) {
      if (stats.lives>0) {
        stats.lives--;

        console.warn('lives:',stats.lives);

        stats.$heartDOM = $('.heart').last().remove();
      }
      else {
        app.gameEnd('gameOver');
      }
    }
  },


  createBackPack: function() {
    console.info('createBackPack');

    // si l'inventaire n'existe pas déjà
    if ($('#back-pack').length === 0) {
      console.log('back-pack n\'existe pas');
      // on le crée
      stats.$backPackDOM = $('<div>')
        .attr({ id: 'back-pack' })
        .appendTo(app.$statsDOM);
      // on crée et ajoute son texte
      stats.$backPackTitle = $('<span>')
        .addClass('stats-title')
        .text('Inventory')
        .appendTo(stats.$backPackDOM);
    }
  },

  removeBackPack: function() {
    // si l'inventaire existe
    if ($('<back-pack>')) {
      stats.$backPackDOM.remove();
    }
  },


};
