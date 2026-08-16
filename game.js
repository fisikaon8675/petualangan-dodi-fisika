// ==========================================
// KELAS BABAK 1 : TEPI HUTAN (KINEMATIKA)
// ==========================================
class Babak1 extends Phaser.Scene {
    constructor() { super('Babak1'); }

    preload() {
        this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
        this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bintang', 'https://labs.phaser.io/assets/sprites/star.png');
        this.load.image('pemburu', 'https://labs.phaser.io/assets/sprites/space-baddie.png');
        this.load.image('portal', 'https://labs.phaser.io/assets/sprites/diamond.png');
        
        // Aset baru untuk Babak 3 agar dimuat sejak awal
        this.load.image('peti', 'https://labs.phaser.io/assets/sprites/crate.png');
        this.load.image('batu', 'https://labs.phaser.io/assets/sprites/bomb.png');
    }

    create() {
        this.add.image(400, 300, 'langit');
        this.add.text(16, 16, 'Babak 1: Tepi Hutan (Kinematika)', { fontSize: '20px', fill: '#000', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

        this.dodi = this.physics.add.sprite(100, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

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
                this.scene.start('Babak2');
            }
        }, null, this);

        this.physics.add.overlap(this.dodi, this.misteriBox, () => {
            this.physics.pause();
            this.dodi.anims.play('turn');
            document.getElementById('ui-container').classList.remove('hidden');
            document.getElementById('question-desc').innerText = "Dodi harus melompat sejauh 10 meter selama 2 detik. Berapa kecepatan awalnya (m/s)? (v = s/t)";
            document.getElementById('answer-input').value = "";
            document.getElementById('feedback-text').innerText = "";

            document.getElementById('submit-btn').onclick = () => {
                if (document.getElementById('answer-input').value == "5") {
                    document.getElementById('feedback-text').innerText = "Benar! Pemburu lari.";
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
        if (this.cursors.left.isDown) { this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true); }
        else if (this.cursors.right.isDown) { this.dodi.setVelocityX(160); this.dodi.anims.play('right', true); }
        else { this.dodi.setVelocityX(0); this.dodi.anims.play('turn'); }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) { this.dodi.setVelocityY(-550); }
    }
}

// ==========================================
// KELAS BABAK 2 : SUNGAI DERAS (HUKUM NEWTON)
// ==========================================
class Babak2 extends Phaser.Scene {
    constructor() { super('Babak2'); }

    create() {
        this.add.image(400, 300, 'langit').setTint(0x999999);
        this.add.text(16, 16, 'Babak 2: Sungai Deras (Hukum Newton)', { fontSize: '20px', fill: '#fff', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 568, 'tanah').refreshBody(); 
        this.platforms.create(650, 568, 'tanah').refreshBody();

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(false); 
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.misteriBox = this.physics.add.image(250, 450, 'bintang');
        this.physics.add.collider(this.misteriBox, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken) {
                this.physics.pause();
                alert("Babak 2 Selesai! Saatnya Babak Final!");
                this.scene.start('Babak3'); // PINDAH KE BABAK 3
            }
        }, null, this);

        this.physics.add.overlap(this.dodi, this.misteriBox, () => {
            this.physics.pause();
            this.dodi.anims.play('turn');
            document.getElementById('ui-container').classList.remove('hidden');
            document.getElementById('question-desc').innerText = "Massa Dodi 40 kg dan gravitasi bumi 10 m/s². Berapa Gaya Berat (Newton) untuk mengaktifkan jembatan? (W = m x g)";
            document.getElementById('answer-input').value = "";
            document.getElementById('feedback-text').innerText = "";

            document.getElementById('submit-btn').onclick = () => {
                if (document.getElementById('answer-input').value == "400") {
                    document.getElementById('feedback-text').innerText = "Tepat! Jembatan turun.";
                    document.getElementById('feedback-text').style.color = "green";
                    this.punyaToken = true;
                    setTimeout(() => {
                        document.getElementById('ui-container').classList.add('hidden');
                        this.misteriBox.disableBody(true, true);
                        this.portal.setVisible(true);
                        let jembatan = this.platforms.create(400, 568, 'tanah');
                        jembatan.setTint(0x8B4513);
                        jembatan.refreshBody();
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
        if (this.cursors.left.isDown) { this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true); }
        else if (this.cursors.right.isDown) { this.dodi.setVelocityX(160); this.dodi.anims.play('right', true); }
        else { this.dodi.setVelocityX(0); this.dodi.anims.play('turn'); }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) { this.dodi.setVelocityY(-550); }
        if (this.dodi.y > 600) { this.scene.restart(); }
    }
}

// ==========================================
// KELAS BABAK 3 : MARKAS PEMBURU (ENERGI & PARABOLA)
// ==========================================
class Babak3 extends Phaser.Scene {
    constructor() { super('Babak3'); }

    create() {
        // Latar belakang diwarnai kemerahan (Markas Boss)
        this.add.image(400, 300, 'langit').setTint(0xffcccc);
        this.add.text(16, 16, 'Babak 3: Markas Pemburu (Energi Kinetik)', { fontSize: '20px', fill: '#990000', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'tanah').setScale(2).refreshBody(); 
        
        // Tebing tinggi tempat kurungan Orangutan
        this.platforms.create(700, 350, 'tanah').setScale(0.5).refreshBody();

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        // Tombol pengaktif Pelontar
        this.misteriBox = this.physics.add.image(200, 450, 'bintang');
        this.physics.add.collider(this.misteriBox, this.platforms);

        // Orangutan (Kita pinjam sprite baddie dan warnai oranye)
        this.orangutan = this.physics.add.sprite(700, 250, 'pemburu');
        this.orangutan.setTint(0xffa500); // Warna oranye
        this.orangutan.setVisible(false); // Disembunyikan dulu di dalam peti
        this.physics.add.collider(this.orangutan, this.platforms);

        // Peti Kurungan (Membungkus Orangutan)
        this.peti = this.physics.add.image(700, 250, 'peti').setScale(1.5);
        this.physics.add.collider(this.peti, this.platforms);

        // Logika Tabrakan Soal Terakhir
        this.physics.add.overlap(this.dodi, this.misteriBox, () => {
            this.physics.pause();
            this.dodi.anims.play('turn');
            document.getElementById('ui-container').classList.remove('hidden');
            
            // SOAL ENERGI KINETIK
            document.getElementById('question-desc').innerText = "Orangutan dikurung! Pelontar harus menembakkan batu bermassa 2 kg dengan kecepatan 10 m/s. Berapa Energi Kinetik (Joule) yang dihasilkan agar kandang hancur? (EK = 1/2 x m x v²)";
            document.getElementById('answer-input').value = "";
            document.getElementById('feedback-text').innerText = "";

            document.getElementById('submit-btn').onclick = () => {
                if (document.getElementById('answer-input').value == "100") {
                    document.getElementById('feedback-text').innerText = "TEMBAK! Energi yang sangat kuat!";
                    document.getElementById('feedback-text').style.color = "green";
                    
                    setTimeout(() => {
                        document.getElementById('ui-container').classList.add('hidden');
                        this.misteriBox.disableBody(true, true);
                        this.physics.resume(); // Waktu berjalan lagi
                        
                        // EFEK GERAK PARABOLA (MEMUNCULKAN BATU)
                        let batu = this.physics.add.sprite(200, 450, 'batu');
                        this.physics.add.collider(batu, this.platforms);
                        batu.setBounce(0.5);
                        
                        // Memberikan kecepatan ke kanan (350) dan lompatan ke atas (-600) secara bersamaan!
                        batu.setVelocity(350, -600); 

                        // Tabrakan antara batu dan peti
                        this.physics.add.collider(batu, this.peti, () => {
                            batu.disableBody(true, true); // Batu hancur
                            this.peti.disableBody(true, true); // Peti hancur
                            
                            // Orangutan bebas dan melompat girang!
                            this.orangutan.setVisible(true);
                            this.orangutan.setVelocityY(-300);
                            
                            // Pesan Kemenangan
                            setTimeout(() => {
                                alert("TAMAT! Dodi berhasil menyelamatkan Orangutan dan menguasai Fisika Dasar! Selamat!");
                            }, 500);
                        });

                    }, 1500);
                } else {
                    document.getElementById('feedback-text').innerText = "Salah! (1/2 x 2 x 10² = ...)";
                    document.getElementById('feedback-text').style.color = "red";
                }
            };
        }, null, this);
    }

    update() {
        if (this.cursors.left.isDown) { this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true); }
        else if (this.cursors.right.isDown) { this.dodi.setVelocityX(160); this.dodi.anims.play('right', true); }
        else { this.dodi.setVelocityX(0); this.dodi.anims.play('turn'); }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) { this.dodi.setVelocityY(-550); }
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
            debug: false // Ubah jadi 'true' jika ingin melihat kotak fisika
        }
    },
    scene: [Babak1, Babak2, Babak3] 
};

const game = new Phaser.Game(config);
