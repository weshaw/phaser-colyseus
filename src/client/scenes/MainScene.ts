import Phaser from 'phaser'
import * as Colyseus from 'colyseus.js';
import Board from '../../modules/Board';

export default class MainScene extends Phaser.Scene
{
    private client!: Colyseus.Client;
    board!: Board;
    iso: any;

	constructor()
	{
        const sceneConfig = {
            key: 'MainSceneTest',
            mapAdd: { isoPlugin: 'iso' }
        };
        super(sceneConfig);
 
        this.board = new Board(8, 8, this);
	}

    init()
    {
        this.client = new Colyseus.Client('ws://localhost:2567');
    }

	preload()
    {
        this.board.preload();
    }

    async create()
    {
        const room = await this.client.joinOrCreate('my_room');

        room.onMessage('keydown', (message) => {
            console.log(message)
        })

        console.log("joined ",room.name);
        console.log("session ",room.sessionId);
        this.input.keyboard.on('keydown', (e: KeyboardEvent) => {
            room.send('keydown', e.key);
        })

        this.iso.projector.origin.setTo(0.5, 0.3);

        // Add some tiles to our scene
        this.board.spawnTiles();
    }
    
}
