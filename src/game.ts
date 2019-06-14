class FlappyBird extends Phaser.Scene {

    bird: Phaser.Physics.Arcade.Sprite;
    pipe: Phaser.Physics.Arcade.Sprite;

    pipes: Phaser.GameObjects.Group;

    timer: Phaser.Time.TimerEvent;

    score: number = 0;

    labelScore: Phaser.GameObjects.Text;

    jumpSound: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: 'FlappyBird'
        });
    }

    preload(): void {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        this.load.image('bird', 'assets/bird2.png');
        this.load.image('pipe', 'assets/pipe.png');
        this.load.audio('jump', 'assets/jump.wav');
    }

    create(): void {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.

        this.jumpSound = this.sound.add('jump');

        this.pipes = this.physics.add.group();

        this.bird = this.physics.add.sprite(100, 245, 'bird');
        this.bird.setFlipX(true);
        this.bird.setGravityY(1000);


        const space_key: Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        space_key.on('down', this.jump.bind(this));

        this.timer = this.time.addEvent({
            delay: 1500,
            callback: this.addRowOfPipes.bind(this),
            loop: true
        });

        this.labelScore = this.add.text(20, 20, '0', {font: "30px Arial", fill: "#ffffff"})
    }

    update(timestep: number, delta: number): void {
        // This function is called 60 times per second
        // It contains the game's logic

        if (this.bird.y < 0 || this.bird.y > 480) {
            this.restartGame();
        }

        this.physics.add.overlap(this.bird, this.pipes, this.hitPipe.bind(this));


        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }
    }


    jump(): void {
        // this.bird.angle = -20;
        if (this.bird.active != true) {
            return;
        }

        this.jumpSound.play();

        this.tweens.add({
            targets: [this.bird],
            angle: {value: -20, duration: 100}
        });

        this.bird.setVelocityY(-350);
    }

    restartGame(): void {
        this.scene.restart();
        this.score = 0;
    }


    addOnePipe(x: number, y: number): void {
        this.pipe = this.physics.add.sprite(x, y, 'pipe');

        this.pipes.add(this.pipe);

        this.pipe.setVelocityX(-200);
    }

    addRowOfPipes(): void {
        // 1-5
        // This will be the hole position
        let hole = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i * 60 + 30);
            }
        }

        this.score += 1;
        this.labelScore.text = String(this.score);
    }

    hitPipe(): void {
        // this.restartGame()
        this.bird.setActive(false);

        this.timer.destroy();

        this.pipes.children.each((p: Phaser.Physics.Arcade.Sprite) => {
            p.body.velocity.x = 0;
        })
        // this.timer.
    }
}

export default FlappyBird;
