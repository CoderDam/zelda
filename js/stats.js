var stats = {
	startLives: 5,
	lives: 0,
	objects: {
		stone: false,
	},

	create: function() {
		stats.createLives(stats.startLives);
		stats.createBackPack();
	},

	createLives: function(number) {
		for (var lives = 0; lives < number; lives++) {
			if (stats.lives<30) {
				stats.lives++;
				console.warn('lives:',stats.lives);
				stats.heart = document.createElement('div');
				stats.heart.className = 'heart';
				app.statsDOM.appendChild(stats.heart);
			}
		}
	},

	removeLives: function(number) {
		for (var lives = 0; lives < number; lives++) {
			if (stats.lives>0) {
				stats.lives--;
				console.warn('lives:',stats.lives);
				stats.heart = document.querySelector('.heart');
				app.statsDOM.removeChild(stats.heart);
			}
			else {
				app.gameEnd('gameOver');
			}
		}
	},


	createBackPack: function() {
		// si l'inventaire n'existe pas déjà
		if (!document.getElementById('back-pack')) {
			// on le crée
			stats.backPackDOM = document.createElement('div');
			// on l'id
			stats.backPackDOM.id = 'back-pack';
			// on l'attache à #stats
			app.statsDOM.appendChild(stats.backPackDOM);
			// on crée l'élément de texte
			stats.backPackTitle = document.createElement('span');
			// on le class
			stats.backPackTitle.className = 'stats-title';
			// on lui entre le texte
			stats.backPackTitle.textContent = 'Inventory';
			// on attache à l'inventaire
			stats.backPackDOM.appendChild(stats.backPackTitle);
		}
	},

	removeBackPack: function() {
		// si l'inventaire existe
		if (document.getElementById('back-pack')) {
			app.statsDOM.removeChild(stats.backPackDOM);
		}
	},


}
