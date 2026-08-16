const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }, 
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

// Kita tambahkan variabel 'cursors' untuk mendeteksi tombol keyboard
let dodi;
let platforms;
let cursors; 

function preload() {
    this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
    
    // PENTING: Kita ubah Dodi menjadi 'spritesheet' agar bisa dianimasikan saat berjalan
    this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Latar belakang dan tanah
    this.add.image(400, 300, 'langit');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

    // Memunculkan Dodi
    dodi = this.physics.add.sprite(100, 450, 'dodi');
    dodi.setBounce(0.2);
    dodi.setCollideWorldBounds(true);
    this.physics.add.collider(dodi, platforms);

    // MEMBUAT ANIMASI BERJALAN
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dodi', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dodi', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dodi', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Mengaktifkan sensor tombol panah pada keyboard
    cursors = this.input.keyboard.createCursorKeys();
}

// 3. UPDATE: Di sinilah logika pergerakan (Kinematika) terjadi!
function update() {
    // JIKA tombol panah kiri ditekan...
    if (cursors.left.isDown) {
        dodi.setVelocityX(-160); // Kecepatan ke sumbu X negatif (kiri)
        dodi.anims.play('left', true); // Mainkan animasi kiri
    } 
    // JIKA tombol panah kanan ditekan...
    else if (cursors.right.isDown) {
        dodi.setVelocityX(160); // Kecepatan ke sumbu X positif (kanan)
        dodi.anims.play('right', true); // Mainkan animasi kanan
    } 
    // JIKA tidak ada tombol ditekan...
    else {
        dodi.setVelocityX(0); // Kecepatan 0 (Hukum I Newton: Diam)
        dodi.anims.play('turn'); // Mainkan animasi menghadap depan
    }

    // MELOMPAT (Gerak Vertikal ke Atas)
    // Syarat melompat: Tombol atas ditekan DAN kaki Dodi menyentuh tanah
    if (cursors.up.isDown && dodi.body.touching.down) {
        dodi.setVelocityY(-550); // Memberikan kecepatan awal ke atas (melawan gravitasi)
    }
}
