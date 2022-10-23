function preload() {
    this.load.image('fundo', 'assets/fundo.jpg');
    this.load.image('player', 'assets/nave2.png');
    this.load.image('player2', 'assets/pinto.png');

    
}
var player;
var player2;


function create() {
    
    
    
    
 
    this.add.image(config.width / 2, config.height / 2, 'fundo');
   
    player = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(0.25, 0.25);
   
    player.setCollideWorldBounds(true);
    
    player.setDrag(100);
    player.setMaxVelocity(200);
    player.rotation = 4.71239
   
}

function update() {
   
    let cursors = this.input.keyboard.createCursorKeys();
    
    if (cursors.up.isDown)
    {
        this.physics.velocityFromRotation(player.rotation,200, player.body.acceleration);
    }
    else
    {
        player.setAcceleration(0);
    }

    if (cursors.left.isDown)
    {
        player.setAngularVelocity(-300);
    }
    else if (cursors.right.isDown)
    {
        player.setAngularVelocity(300);
    }
    else
    {
        player.setAngularVelocity(0);
    }

    
   
}

const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1080,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
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