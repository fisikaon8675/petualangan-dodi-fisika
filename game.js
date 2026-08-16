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

let dodi;
let platforms;
let cursors;
let misteriBox;
let pemburu;
let portal;
let punyaToken = false; // Memori untuk mengingat apakah Dodi sudah menjawab benar

function preload() {
    this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('bintang', 'https://labs.phaser.io/assets/sprites/star.png');
    
    // Memuat aset baru: Pemburu (musuh) dan Portal (garis finish)
    this.load.image('pemburu', 'https://labs.phaser.io/assets/sprites/space-baddie.png');
    this.load.image('portal', 'https://labs.phaser.io/assets/sprites/diamond.png');
}

function create() {
    this.add.image(400, 300, 'langit');
    
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

    dodi = this.physics.add.sprite(100, 450, 'dodi');
    dodi.setBounce(0.2);
    dodi.setCollideWorldBounds(true);
    this.physics.add.collider(dodi, platforms);

    this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dodi', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'turn', frames: [ { key: 'dodi', frame: 4 } ], frameRate: 20 });
    this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dodi', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

    cursors = this.input.keyboard.createCursorKeys();

    // 1. Misteri Box (Geser sedikit ke kiri agar tidak menempel dengan pemburu)
    misteriBox = this.physics.add.image(450, 450, 'bintang');
    this.physics.add.collider(misteriBox, platforms);
    this.physics.add.overlap(dodi, misteriBox, sentuhKotakMisteri, null, this);

    // 2. Pemburu (Menghalangi jalan ke portal)
    pemburu = this.physics.add.sprite(600, 450, 'pemburu').setScale(1.5);
    this.physics.add.collider(pemburu, platforms);
    this.physics.add.collider(dodi, pemburu, sentuhPemburu, null, this); // Jika Dodi menabrak pemburu

    // 3. Portal (Disembunyikan di awal game)
    portal = this.physics.add.image(750, 450, 'portal');
    this.physics.add.collider(portal, platforms);
    portal.setVisible(false); // Sembunyikan gambar portal
    this.physics.add.overlap(dodi, portal, masukPortal, null, this); // Jika Dodi mencapai portal

    // Logika Tombol Jawab (Menggunakan onclick agar lebih stabil saat level diulang)
    document.getElementById('submit-btn').onclick = () => {
        let jawaban = document.getElementById('answer-input').value;
        let teksFeedback = document.getElementById('feedback-text');
        
        if (jawaban == "5") {
            teksFeedback.innerText = "Benar! (v = s/t). Kamu dapat Token. Pemburu lari ketakutan!";
            teksFeedback.style.color = "green";
            punyaToken = true; // Tandai bahwa Dodi sudah punya token
            
            setTimeout(() => {
                document.getElementById('ui-container').classList.add('hidden');
                misteriBox.disableBody(true, true); 
                
                // Kalahkan pemburu dan munculkan portal
                pemburu.disableBody(true, true); 
                portal.setVisible(true); 
                
                // Lanjutkan game
                game.scene.scenes[0].physics.resume(); 
            }, 2000);
            
        } else {
            teksFeedback.innerText = "Salah! Ingat, kecepatan awal = jarak / waktu (10 / 2).";
            teksFeedback.style.color = "red";
        }
    };
}

function update() {
    if (cursors.left.isDown) {
        dodi.setVelocityX(-160);
        dodi.anims.play('left', true);
    } else if (cursors.right.isDown) {
        dodi.setVelocityX(160);
        dodi.anims.play('right', true);
    } else {
        dodi.setVelocityX(0);
        dodi.anims.play('turn');
    }

    if (cursors.up.isDown && dodi.body.touching.down) {
        dodi.setVelocityY(-550);
    }
}

// Fungsi Tabrakan dengan Pemburu
function sentuhPemburu(dodi_obj, pemburu_obj) {
    this.physics.pause(); // Hentikan game
    dodi_obj.setTint(0xff0000); // Warnai Dodi jadi merah
    dodi_obj.anims.play('turn');
    
    // Beri peringatan dan ulang level dari awal
    setTimeout(() => {
        alert("Oh tidak! Dodi tertangkap pemburu. Ayo coba lagi dari awal!");
        punyaToken = false; // Reset token
        this.scene.restart(); // Fitur Phaser untuk mengulang layar
    }, 500);
}

// Fungsi Tabrakan dengan Bintang Soal
function sentuhKotakMisteri(dodi_obj, kotak_obj) {
    this.physics.pause();
    dodi_obj.anims.play('turn');
    document.getElementById('ui-container').classList.remove('hidden');
    document.getElementById('question-desc').innerText = "Jembatan putus! Dodi harus melompat sejauh 10 meter. Jika ia akan berada di udara selama 2 detik, berapa kecepatan awal horisontal (m/s) yang dibutuhkan Dodi? (Abaikan gesekan udara)";
    document.getElementById('answer-input').value = "";
    document.getElementById('feedback-text').innerText = "";
}

// Fungsi Memasuki Portal Kemenangan
function masukPortal(dodi_obj, portal_obj) {
    if (punyaToken === true) {
        this.physics.pause();
        alert("SELAMAT! Dodi berhasil melewati Babak 1: Tepi Hutan. Bersiap untuk Babak 2!");
        // Di masa depan, kita akan menambahkan kode untuk pindah ke Peta Babak 2 di sini.
    }
}
