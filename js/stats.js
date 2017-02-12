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
		stats.backPack = document.createElement('div');
		stats.backPack.id = 'back-pack';
		app.statsDOM.appendChild(stats.backPack);

		stats.backPackTitle = document.createElement('span');
		stats.backPackTitle.className = 'stats-title';
		stats.backPackTitle.textContent = 'Inventory';
		stats.backPack.appendChild(stats.backPackTitle);
	},


}
