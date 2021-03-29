import 'regenerator-runtime';
import Phaser from 'phaser'

import MainScene from './scenes/MainScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1024,
	height: 768,
	scene: [MainScene],
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT
	}
}

export default new Phaser.Game(config)
