var stats = {
	lives: 5,
	objects: {
		stone: false,
	},

	create: function() {
		stats.createLives(stats.lives);
		stats.createBackPack();
	},

	createLives: function(number) {
		for (var lives = 0; lives < number; lives++) {
			stats.heart = document.createElement('div');
			stats.heart.className = 'heart';
			app.statsDOM.appendChild(stats.heart);
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
