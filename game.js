// ==========================================
// DATA BANK SOAL FISIKA
// ==========================================
const soalBabak1 = [
    { tanya: "Jarak jembatan 10 m. Dodi melayang selama 2 s, berapa kecepatan awalnya (m/s)? (v = s/t)", jawab: "5" },
    { tanya: "Dodi berlari dengan kecepatan 4 m/s selama 3 s. Berapa jarak yang ditempuh (meter)? (s = v x t)", jawab: "12" },
    { tanya: "Dari keadaan diam, percepatan Dodi 2 m/s². Kecepatannya setelah 4 s adalah (m/s)? (v = a x t)", jawab: "8" }
];

const soalBabak2 = [
    { tanya: "Massa 40 kg, gravitasi 10 m/s². Berapa Gaya Berat (Newton)? (W = m x g)", jawab: "400" },
    { tanya: "Dodi mendorong batu 10 kg dengan gaya 50 N. Berapa percepatan batu (m/s²)? (a = F/m)", jawab: "5" },
    { tanya: "Gaya tarik 20 N ke kanan, gaya gesek 5 N ke kiri. Berapa Resultan Gayanya (N)?", jawab: "15" }
];

const soalBabak3 = [
    { tanya: "Batu 2 kg dilontarkan dengan kecepatan 10 m/s. Berapa Energi Kinetiknya (Joule)? (EK = 1/2 x m x v²)", jawab: "100" },
    { tanya: "Batu 4 kg diangkat setinggi 5 meter (g=10). Berapa Energi Potensialnya (Joule)? (EP = m x g x h)", jawab: "200" },
    { tanya: "Dodi mendorong meriam 5 meter dengan gaya 10 N. Berapa Usahanya (Joule)? (W = F x s)", jawab: "50" }
];

// FUNGSI BANTUAN UNTUK MENAMPILKAN UI SOAL
function tampilkanSoal(scene, soalAcak, callbackBenar, callbackSalah) {
    scene.physics.pause();
    scene.dodi.anims.play('turn');
    
    let ui = document.getElementById('ui-container');
    let btnSubmit = document.getElementById('submit-btn');
    let input = document.getElementById('answer-input');
    let feedback = document.getElementById('feedback-text');

    ui.classList.remove('hidden');
    document.getElementById('question-desc').innerText = soalAcak.tanya;
    input.value = "";
    feedback.innerText = "";
    btnSubmit.disabled = false; // Aktifkan tombol

    btnSubmit.onclick = () => {
        btnSubmit.disabled = true; // Matikan tombol sementara agar tidak di-klik dobel
        if (input.value == soalAcak.jawab) {
            feedback.innerText = "BENAR!";
            feedback.style.color = "green";
            setTimeout(() => {
                ui.classList.add('hidden');
                callbackBenar();
                scene.physics.resume();
            }, 1500);
        } else {
            feedback.innerText = "SALAH! Coba hitung lagi.";
            feedback.style.color = "red";
            setTimeout(() => {
                ui.classList.add('hidden');
                callbackSalah();
                scene.physics.resume();
            }, 1500);
        }
    };
}


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
        this.load.image('peti', 'https://labs.phaser.io/assets/sprites/crate.png');
        this.load.image('batu', 'https://labs.phaser.io/assets/sprites/bomb.png');
    }

    create() {
        this.add.image(400, 300, 'langit');
        this.add.text(16, 16, 'Babak 1: Jawab 3 Tantangan untuk Buka Portal!', { fontSize: '18px', fill: '#000', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

        if (!this.anims.exists('left')) {
            this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('dodi', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'turn', frames: [ { key: 'dodi', frame: 4 } ], frameRate: 20 });
            this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('dodi', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });
        }

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // MEMBUAT 3 BINTANG TANTANGAN
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({
            key: 'bintang',
            repeat: 2, // Total 3 bintang
            setXY: { x: 250, y: 450, stepX: 150 } // Posisi x: 250, 400, 550
        });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.pemburu = this.physics.add.sprite(700, 450, 'pemburu').setScale(1.5);
        this.physics.add.collider(this.pemburu, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;

        this.physics.add.collider(this.dodi, this.pemburu, () => {
            this.physics.pause();
            this.dodi.setTint(0xff0000);
            setTimeout(() => { alert("Tertangkap!"); this.scene.restart(); }, 500);
        });

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken) {
                this.physics.pause();
                alert("Babak 1 Selesai! Lanjut ke Sungai Deras...");
                this.scene.start('Babak2');
            }
        });

        // LOGIKA KETIKA MENYENTUH BINTANG
        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak1);
            
            tampilkanSoal(this, soalAcak, 
                // Jika Benar
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    if (this.soalTerjawab === 3) {
                        this.punyaToken = true;
                        this.pemburu.disableBody(true, true); // Pemburu kabur
                        this.portal.setVisible(true); // Portal terbuka
                    }
                },
                // Jika Salah
                () => {
                    this.dodi.x -= 40; // Dodi terpental mundur
                }
            );
        });
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
        this.add.text(16, 16, 'Babak 2: Jawab 3 Soal untuk Membangun Jembatan!', { fontSize: '18px', fill: '#fff', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(150, 568, 'tanah').refreshBody(); 
        this.platforms.create(650, 568, 'tanah').refreshBody();

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(false); 
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // MEMBUAT 3 BINTANG DI TEBING KIRI
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({
            key: 'bintang',
            repeat: 2, 
            setXY: { x: 120, y: 450, stepX: 70 } // Kumpul di tebing kiri
        });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken) {
                this.physics.pause();
                alert("Babak 2 Selesai! Bersiap menuju Markas Boss!");
                this.scene.start('Babak3'); 
            }
        });

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak2);
            
            tampilkanSoal(this, soalAcak, 
                // Jika Benar
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    
                    // MEMBANGUN JEMBATAN BERTAHAP
                    let posisiX = 250 + (this.soalTerjawab * 65);
                    let jembatanBaru = this.platforms.create(posisiX, 568, 'tanah').setScale(0.2, 1).refreshBody();
                    jembatanBaru.setTint(0x8B4513); // Warna coklat kayu
                    
                    if (this.soalTerjawab === 3) {
                        this.punyaToken = true;
                        this.portal.setVisible(true);
                    }
                },
                // Jika Salah
                () => {
                    this.dodi.x -= 30; // Terpental mundur
                }
            );
        });
    }

    update() {
        if (this.cursors.left.isDown) { this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true); }
        else if (this.cursors.right.isDown) { this.dodi.setVelocityX(160); this.dodi.anims.play('right', true); }
        else { this.dodi.setVelocityX(0); this.dodi.anims.play('turn'); }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) { this.dodi.setVelocityY(-550); }
        if (this.dodi.y > 600) { this.scene.restart(); } // Jatuh = ulang level
    }
}

// ==========================================
// KELAS BABAK 3 : MARKAS PEMBURU (ENERGI & PARABOLA)
// ==========================================
class Babak3 extends Phaser.Scene {
    constructor() { super('Babak3'); }

    create() {
        this.add.image(400, 300, 'langit').setTint(0xffcccc);
        this.add.text(16, 16, 'Babak 3: Jawab 3 Soal untuk Menembak Meriam!', { fontSize: '18px', fill: '#990000', fontStyle: 'bold' });

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'tanah').setScale(2).refreshBody(); 
        this.platforms.create(700, 350, 'tanah').setScale(0.5).refreshBody();

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // MEMBUAT 3 BINTANG PENGISI DAYA PELONTAR
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({
            key: 'bintang',
            repeat: 2, 
            setXY: { x: 150, y: 450, stepX: 100 }
        });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.orangutan = this.physics.add.sprite(700, 250, 'pemburu');
        this.orangutan.setTint(0xffa500); 
        this.orangutan.setVisible(false); 
        this.physics.add.collider(this.orangutan, this.platforms);

        this.peti = this.physics.add.image(700, 250, 'peti').setScale(1.5);
        this.physics.add.collider(this.peti, this.platforms);

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak3);
            
            tampilkanSoal(this, soalAcak, 
                // Jika Benar
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    
                    if (this.soalTerjawab === 3) {
                        // BINTANG KETIGA MENGAKTIFKAN MERIAM!
                        let batu = this.physics.add.sprite(350, 450, 'batu').setScale(1.5);
                        this.physics.add.collider(batu, this.platforms);
                        batu.setBounce(0.5);
                        
                        // Menembak Parabola
                        batu.setVelocity(400, -600); 

                        this.physics.add.collider(batu, this.peti, () => {
                            batu.disableBody(true, true); 
                            this.peti.disableBody(true, true); 
                            
                            this.orangutan.setVisible(true);
                            this.orangutan.setVelocityY(-300);
                            
                            setTimeout(() => {
                                alert("TAMAT! Dodi berhasil menyelamatkan Orangutan! Kamu adalah Master Fisika!");
                            }, 500);
                        });
                    }
                },
                // Jika Salah
                () => {
                    this.dodi.x -= 40; 
                }
            );
        });
    }

    update() {
        if (this.cursors.left.isDown) { this.dodi.setVelocityX(-160); this.dodi.anims.play('left', true); }
        else if (this.cursors.right.isDown) { this.dodi.setVelocityX(160); this.dodi.anims.play('right', true); }
        else { this.dodi.setVelocityX(0); this.dodi.anims.play('turn'); }
        if (this.cursors.up.isDown && this.dodi.body.touching.down) { this.dodi.setVelocityY(-550); }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 800 }, debug: false }
    },
    scene: [Babak1, Babak2, Babak3] 
};

const game = new Phaser.Game(config);
