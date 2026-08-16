// ==========================================
// KELAS BABAK 1 : TEPI HUTAN (KINEMATIKA)
// ==========================================
class Babak1 extends Phaser.Scene {
    constructor() {
        super('Babak1'); // Nama unik untuk level ini
    }

    preload() {
        this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
        this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bintang', 'https://labs.phaser.io/assets/sprites/star.png');
        this.load.image('pemburu', 'https://labs.phaser.io/assets/sprites/space-baddie.png');
        this.load.image('portal', 'https://labs.phaser.io/assets/sprites/diamond.png');
    }

    create() {
        this.add.image(400, 300, 'langit');
        
        // Teks Judul Level
        this.add.text(16, 16, 'Babak 1: Tepi Hutan (Kinematika)', { fontSize: '20px', fill: '#000', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

        this.dodi = this.physics.add.sprite(100, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

        // Animasi Dodi (dibuat global agar bisa dipakai di Babak 2)
        if (!this.anims.exists('left')) {
            this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dodi', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'turn', frames: [ { key: 'dodi', frame: 4 } ], frameRate: 20 });
            this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dodi', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.misteriBox = this.physics.add.image(450, 450, 'bintang');
        this.physics.add.collider(this.misteriBox, this.platforms);

        this.pemburu = this.physics.add.sprite(600, 450, 'pemburu').setScale(1.5);
        this.physics.add.collider(this.pemburu, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);

        this.punyaToken = false;

        // Aturan Tabrakan
        this.physics.add.collider(this.dodi, this.pemburu, () => {
            this.physics.pause();
            this.dodi.setTint(0xff0000);
            this.dodi.anims.play('turn');
            setTimeout(() => { alert("Tertangkap!"); this.scene.restart(); }, 500);
        }, null, this);

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken) {
                this.physics.pause();
                alert("Babak 1 Selesai! Meluncur ke Babak 2...");
                this.scene.start('Babak2'); // PINDAH KE LEVEL 2
            }
        }, null, this);

        // Sentuh Bintang Soal
        this.physics.add.overlap(this.dodi, this.misteriBox, () => {
            this.physics.pause();
            this.dodi.anims.play('turn');
            document.getElementById('ui-container').classList.remove('hidden');
            document.getElementById('question-desc').innerText = "Jembatan putus! Dodi harus melompat 10 meter selama 2 detik. Berapa kecepatan awal (m/s)? (v = s/t)";
            document.getElementById('answer-input').value = "";
            document.getElementById('feedback-text').innerText = "";

            // Tombol Jawab Babak 1
            document.getElementById('submit-btn').onclick = () => {
                if (document.getElementById('answer-input').value == "5") {
                    document.getElementById('feedback-text').innerText = "Benar! Pemburu musnah.";
                    document.getElementById('feedback-text').style.color = "green";
                    this.punyaToken = true;
                    setTimeout(() => {
                        document.getElementById('ui-container').classList.add('hidden');
                        this.misteriBox.disableBody(true, true);
                        this.pemburu.disableBody(true, true);
                        this.portal.setVisible(true);
                        this.physics.resume();
                    }, 1500);
                } else {
                    document.getElementById('feedback-text').innerText = "Salah!";
                    document.getElementById('feedback-text').style.color = "red";
                }
            };
        }, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.dodi.setVelocityX(160); this.dodi.anims.play('right', true);
        } else {
            this.dodi.setVelocityX(0); this.dodi.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) {
            this.dodi.setVelocityY(-550);
        }
    }
}

// ==========================================
// KELAS BABAK 2 : SUNGAI DERAS (HUKUM NEWTON)
// ==========================================
class Babak2 extends Phaser.Scene {
    constructor() {
        super('Babak2');
    }

    create() {
        // Latar belakang sedikit digelapkan dengan 'setTint'
        this.add.image(400, 300, 'langit').setTint(0x999999);
        this.add.text(16, 16, 'Babak 2: Sungai Deras (Hukum Newton)', { fontSize: '20px', fill: '#fff', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        
        // Tanah terpisah! Kiri dan Kanan. Tengahnya bolong (Sungai).
        this.platforms.create(150, 568, 'tanah').refreshBody(); 
        this.platforms.create(650, 568, 'tanah').refreshBody();

        // Dodi muncul di sebelah kiri
        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        
        // PERHATIAN: Di level ini world bounds dihilangkan pada sumbu Y agar Dodi bisa jatuh ke sungai
        this.dodi.setCollideWorldBounds(false); 
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Bintang soal diletakkan di ujung jurang kiri
        this.misteriBox = this.physics.add.image(250, 450, 'bintang');
        this.physics.add.collider(this.misteriBox, this.platforms);

        // Portal kemenangan di sebelah kanan
        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken) {
                this.physics.pause();
                alert("LUAR BIASA! Babak 2 Selesai!");
                // Nanti kita arahkan ke Babak 3 di sini
            }
        }, null, this);

        // Logika Tabrakan Soal Babak 2
        this.physics.add.overlap(this.dodi, this.misteriBox, () => {
            this.physics.pause();
            this.dodi.anims.play('turn');
            document.getElementById('ui-container').classList.remove('hidden');
            document.getElementById('question-desc').innerText = "Untuk menurunkan jembatan, masukkan kode gaya berat. Jika massa Dodi 40 kg dan gravitasi (g) 10 m/s², berapa Gaya Berat (Newton) yang menarik Dodi? (W = m x g)";
            document.getElementById('answer-input').value = "";
            document.getElementById('feedback-text').innerText = "";

            // Tombol Jawab Khusus Babak 2
            document.getElementById('submit-btn').onclick = () => {
                if (document.getElementById('answer-input').value == "400") {
                    document.getElementById('feedback-text').innerText = "Tepat! Jembatan diaktifkan!";
                    document.getElementById('feedback-text').style.color = "green";
                    this.punyaToken = true;
                    setTimeout(() => {
                        document.getElementById('ui-container').classList.add('hidden');
                        this.misteriBox.disableBody(true, true);
                        this.portal.setVisible(true);
                        
                        // Memunculkan jembatan kayu di tengah jurang
                        let jembatan = this.platforms.create(400, 568, 'tanah');
                        jembatan.setTint(0x8B4513); // Warna cokelat
                        jembatan.refreshBody();

                        this.physics.resume();
                    }, 1500);
                } else {
                    document.getElementById('feedback-text').innerText = "Salah! Ingat rumusnya: m dikali g.";
                    document.getElementById('feedback-text').style.color = "red";
                }
            };
        }, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.dodi.setVelocityX(160); this.dodi.anims.play('right', true);
        } else {
            this.dodi.setVelocityX(0); this.dodi.anims.play('turn');
        }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) {
            this.dodi.setVelocityY(-550);
        }

        // JIKA DODI JATUH KE SUNGAI (Melewati batas bawah layar y > 600)
        if (this.dodi.y > 600) {
            this.scene.restart(); // Ulang level 2
        }
    }
}

// ==========================================
// KONFIGURASI GAME UTAMA
// ==========================================
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
    // Memasukkan kedua adegan ke dalam game. Yang pertama ditulis akan dijalankan lebih dulu.
    scene: [Babak1, Babak2] 
};

const game = new Phaser.Game(config);
