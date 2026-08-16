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
let misteriBox; // Variabel baru untuk item soal fisika

function preload() {
    this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
    
    // Memuat gambar bintang sebagai "Misteri Box"
    this.load.image('bintang', 'https://labs.phaser.io/assets/sprites/star.png');
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

    // --- FITUR BARU LANGKAH 4 --- //
    
    // Menambahkan Bintang di posisi x: 600, y: 450
    misteriBox = this.physics.add.image(600, 450, 'bintang');
    this.physics.add.collider(misteriBox, platforms);

    // Mendeteksi tabrakan (overlap) antara Dodi dan Bintang.
    // Jika bersentuhan, jalankan fungsi "sentuhKotakMisteri"
    this.physics.add.overlap(dodi, misteriBox, sentuhKotakMisteri, null, this);

    // Logika tombol "Jawab" pada HTML
    document.getElementById('submit-btn').addEventListener('click', function() {
        let jawaban = document.getElementById('answer-input').value;
        let teksFeedback = document.getElementById('feedback-text');
        
        // Jawaban yang benar adalah 5 (karena 10 meter / 2 detik = 5 m/s)
        if (jawaban == "5") {
            teksFeedback.innerText = "Tepat Sekali! Rumus: v = s / t (10/2 = 5). Kamu dapat Token!";
            teksFeedback.style.color = "green";
            
            // Setelah 2 detik, sembunyikan soal dan lanjutkan game
            setTimeout(() => {
                document.getElementById('ui-container').classList.add('hidden');
                misteriBox.disableBody(true, true); // Hilangkan bintang dari layar
                game.scene.scenes[0].physics.resume(); // Jalankan waktu game kembali
            }, 2000);
            
        } else {
            teksFeedback.innerText = "Salah! Coba ingat rumusnya (Kecepatan = Jarak dibagi Waktu).";
            teksFeedback.style.color = "red";
        }
    });
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

// Fungsi yang dipanggil saat Dodi menyentuh Bintang
function sentuhKotakMisteri(dodi, kotak) {
    // 1. Hentikan waktu dan gerakan game
    this.physics.pause();
    dodi.anims.play('turn'); // Paksa Dodi menghadap depan
    
    // 2. Tampilkan HTML UI Soal
    document.getElementById('ui-container').classList.remove('hidden');
    
    // 3. Masukkan Soal Fisika ke dalam HTML
    document.getElementById('question-desc').innerText = "Jembatan putus! Dodi harus melompat sejauh 10 meter. Jika ia akan berada di udara selama 2 detik, berapa kecepatan awal horisontal (m/s) yang dibutuhkan Dodi? (Abaikan gesekan udara)";
    
    // 4. Bersihkan kolom input dari jawaban sebelumnya (jika ada)
    document.getElementById('answer-input').value = "";
    document.getElementById('feedback-text').innerText = "";
}
