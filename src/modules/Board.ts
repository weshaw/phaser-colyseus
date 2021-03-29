import IsoPlugin from 'phaser3-plugin-isometric';

export default class Board {

    private scene!: Phaser.Scene;
    private width: number;
    private height: number;
    public isoGroup!: Phaser.GameObjects.Group;

    constructor(width: integer, height: integer, scene: Phaser.Scene)
	{
        this.width = width;
        this.height = height;
        this.scene = scene;
	}
    
    preload()
    {
        this.isoGroup = this.scene.add.group();
        this.scene.load.image('tile', 'assets/cliff_blockQuarter.png');
        this.scene.load.scenePlugin({
          key: 'IsoPlugin',
          url: IsoPlugin,
          sceneKey: 'iso'
        });
        
        
        this.scene.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            console.log(this.scene.cameras.main);
            if(deltaY === -100) {
                this.scene.cameras.main.zoom += .1;
                if(this.scene.cameras.main.zoom > 2) {
                    this.scene.cameras.main.zoom = 2;
                }
           } 
            else if(deltaY === 100) {
                this.scene.cameras.main.zoom -= .1;
                if(this.scene.cameras.main.zoom < .5) {
                    this.scene.cameras.main.zoom = .5;
                }
            }
            this.scene.cameras.main.pan(pointer.worldX, pointer.worldY, 200);
        });
        this.scene.input.on('pointerdown', (pointer, currentlyOver) => {
            console.log(pointer);
        })
    }

    spawnTiles()
    {
        let tile;
        const tilesize = 71;
        for (var xx = 0; xx < tilesize * this.width; xx += 71) {
            for (var yy = 0; yy < tilesize * this.height; yy += 71) {
                tile = this.scene.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
                tile.setInteractive();

                tile.on('pointerover', function() {
                    this.setTint(0x86bfda);
                    this.isoZ -= 2;
                });

                tile.on('pointerout', function() {
                    this.clearTint();
                    this.isoZ += 2;
                });
            }
        }
        this.isoGroup;
    }

}