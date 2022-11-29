import Shoot from './../gameObjects/shoot.js';
import Asteroid from '../gameObjects/asteroid.js';

export default class PlayScene extends Phaser.Scene {

    constructor() {
        super({ key: 'PlayScene', active: true });
        this.lastFired = 0;
        
        this.asteroidElapsedTime = 2000 ;
        this.gameOver = false;
        this.score =false;
        this.score1 =0;
        this.scoreString ='Score = ';
        this.menu = true;
       
       
    }
    
    preload() {
       
        this.load.image('background', './img/background.png');
        this.load.image('ship', './img/ship.png');
        this.load.image('asteroid-1', './img/asteroid-1.png');
        this.load.image('shoot', './img/shoot.png');
        this.load.image('logo', './img/BANNER.png');
        this.load.audio('theme','music/theme.mp3');
    }

    create() {
        this.input.mouse.capture = true;
        var music = this.sound.add('theme');
        music.loop =true;
        music.play();
       
        
        
        
        
        this.add.image(400, 300, 'background');
        
        
        
        
                   
        

        this.ship = this.physics.add.image(400, 300, 'ship').setScale(0.07, 0.07);
        this.ship.setDamping(true);
        this.ship.setDrag(0.99);
        this.ship.setMaxVelocity(200);
        this.ship.setCollideWorldBounds(true);
        this.ship.setSize(20, 30);
        this.ship.rotation = 4.71239
        

        this.cursors = this.input.keyboard.createCursorKeys();

        this.shootsGroup = this.physics.add.group({
            classType: Shoot,
            maxSize: 10,
            runChildUpdate: true
        });

        this.asteroidsGroup = this.physics.add.group();

        this.asteroidsArray = [];
if(this.menu == false){
        this.asteroidsTimedEvent = this.time.addEvent({
            delay: this.asteroidElapsedTime ,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
        });
        this.asteroidsTimedEvent = this.time.addEvent({
            delay: this.asteroidElapsedTime - 1000,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
        });
        this.asteroidsTimedEvent = this.time.addEvent({
            delay: this.asteroidElapsedTime,
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true
        });}
        this.physics.add.overlap(this.ship, this.asteroidsGroup, this.hitShip, null, this);
        this.physics.add.collider(this.shootsGroup, this.asteroidsGroup, this.hitShoot, null, this);
        this.text = this.add.text(10, 10,  this.scoreString , { fontFamily: 'Arial', fontSize: 24, color: '#00ff00' });
        
       
      
    }
    
    
    update(time, delta) {
        
       if(this.score){
        this.score =false;
        this.score1 +=10;
        this.text.destroy();
        this.text = this.add.text(10, 10,  this.scoreString+ this.score1 , { fontFamily: 'Arial', fontSize: 24, color: '#00ff00' });;
       }
       if(this.menu){
        this.logo = this.physics.add.image(455,170, 'logo');
        
        this.physics.pause();
        this.text = this.add.text(190, 225,  'SPACE para dar start!' , { fontFamily: 'Arial', fontSize: 40, color: '#00ff00' });
        
        if(this.cursors.space.isDown){
            this.menu =false;
            this.logo.setVisible(false)
            this.scene.restart();
           
        }
        
            
       }
        if (this.gameOver) {
            this.gameOver = false;
            this.gameWait =true;
            this.physics.pause;
            this.text = this.add.text(10, 300,  'Você Morreu, click para dar restart!' , { fontFamily: 'Arial', fontSize: 40, color: '#00ff00' });
            this.input.on('pointerdown', function (pointer) {
                this.score1=0;
                
           this.scene.restart('PlayScene');
           this.sound.stopAll();
           
           
          
    
        }, this);
            
            
            
        }
      

        
      
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }

        if (this.cursors.space.isDown && time > this.lastFired) {
            let shoot = this.shootsGroup.get();

            if (shoot) {
                shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);

                this.lastFired = time + 50;
            }
        }

        if (this.cursors.left.isDown) {
            this.ship.setAngularVelocity(-300);
        } else if (this.cursors.right.isDown) {
            this.ship.setAngularVelocity(300);
        } else {
            this.ship.setAngularVelocity(0);
        }

        this.asteroidsArray = this.asteroidsArray.filter(function (asteroid) {
            return asteroid.active;
        });

        for (let asteroid of this.asteroidsArray) {
            if (!asteroid.isOrbiting()) {
                asteroid.fire(this.ship.x, this.ship.y);
            }

            asteroid.update(time, delta);
        }
       
    }
    

    addAsteroid() {
       
        let asteroid = new Asteroid(this, 200, 300, 'asteroid-1', 0);
        this.asteroidsGroup.add(asteroid, true);
        this.asteroidsArray.push(asteroid);
        let rdm = Math.floor(Math.random() * 300);
        asteroid.speed = Phaser.Math.GetSpeed(rdm, 1);
        
    }

    hitShip(ship, asteroid) {
        this.physics.pause();
        this.asteroidsTimedEvent.paused = true;
        
        
        this.ship.setTint(0x040404);
        this.ship.body.allowRotation = false;

        this.gameOver = true;
       this.sound.stopAll()
        
    }

    hitShoot(shoot, asteroid) {
        asteroid.disableBody(true, true);
        this.score =true;
        shoot.destroy();
        
    }
    
}
