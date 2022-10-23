function preload() {
    this.load.image('fundo', 'assets/fundo.jpg');
    this.load.image('player', 'assets/nave.png');
    this.load.image('player2', 'assets/pinto.png');

    
}
var pad1;
var pad2;



function create() {
    
    
    
    
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    
    this.add.image(config.width / 2, config.height / 2, 'fundo');
   
    this.player = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(0.25, 0.25);
    this.player.setCollideWorldBounds(true);
    this.player2 = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(0.25, 0.25);
    this.player2.setCollideWorldBounds(true);
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (( this.a.isDown) || ( this.d.isDown)) this.player.setVelocityX( this.a.isDown ? -160 : 160);
    else this.player.setVelocityX(0);
    if (( this.w.isDown) || ( this.s.isDown)) this.player.setVelocityY( this.w.isDown ? -160 : 160);
    else this.player.setVelocityY(0);
    
    if ((cursors.left.isDown ) || (cursors.right.isDown )) this.player2.setVelocityX(cursors.left.isDown  ? -160 : 160);
    else this.player2.setVelocityX(0);
    if ((cursors.up.isDown)  || (cursors.down.isDown )) this.player2.setVelocityY(cursors.up.isDown  ? -160 : 160);
    else this.player2.setVelocityY(0);
    
   
}

const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1080,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y:0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);