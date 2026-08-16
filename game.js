// ==========================================
// 1. INJEKSI UI TEKA-TEKI SILANG (BABAK 1)
// ==========================================
const ttsHTML = `
<div id="tts-container" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:#fff8dc; padding:20px; border:5px solid #8b4513; border-radius:15px; text-align:center; z-index:100; width:400px; box-shadow: 0px 0px 20px rgba(0,0,0,0.5);">
    <h2 style="margin-top:0; color:#8b4513;">📝 TTS Portal Rahasia</h2>
    <p style="font-size:14px; text-align:left; margin-bottom: 5px;"><b>1. Mendatar (5 Huruf):</b> Berpindahnya benda dari posisi asalnya.</p>
    <input type="text" id="tts-mendatar" placeholder="Ketik jawaban..." maxlength="5" style="width:90%; padding:10px; margin-bottom:15px; text-transform:uppercase; text-align:center; font-weight:bold; letter-spacing: 5px;">
    
    <p style="font-size:14px; text-align:left; margin-bottom: 5px;"><b>2. Menurun (4 Huruf):</b> Tarikan atau dorongan.</p>
    <input type="text" id="tts-menurun" placeholder="Ketik jawaban..." maxlength="4" style="width:90%; padding:10px; margin-bottom:15px; text-transform:uppercase; text-align:center; font-weight:bold; letter-spacing: 5px;">
    
    <br>
    <button id="tts-btn" style="padding:10px 20px; background:#4CAF50; color:white; border:none; border-radius:5px; font-weight:bold; cursor:pointer; font-size:16px;">Buka Portal</button>
    <p id="tts-feedback" style="font-weight:bold; margin-top:10px;"></p>
</div>
`;
if (!document.getElementById('tts-container')) document.body.insertAdjacentHTML('beforeend', ttsHTML);


// ==========================================
// 2. INJEKSI UI GEMBOK DIGITAL (BABAK 2)
// ==========================================
const gembokHTML = `
<div id="gembok-container" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:#2c3e50; color:white; padding:20px; border:5px solid #f1c40f; border-radius:15px; text-align:center; z-index:100; width:450px; box-shadow: 0px 0px 30px rgba(0,0,0,0.8);">
    <h2 style="margin-top:0; color:#f1c40f;">🔒 GEMBOK PORTAL BABAK 3</h2>
    <p style="font-size:13px; text-align:left; background:#34495e; padding:10px; border-radius:5px;">
        <b>Scroll angka untuk menjawab 3 Soal Gaya (Sandi 6 Digit):</b><br><br>
        1. Massa 10 kg, percepatan 2 m/s². (F = ?)<br>
        2. Dorongan 70 N, Gaya Gesek 20 N. (Resultan = ?)<br>
        3. Tarik ke kanan 50 N, ke kiri 15 N. (Resultan = ?)
    </p>
    
    <div style="display:flex; justify-content:center; gap:5px; margin-bottom:20px; margin-top:15px;">
        <input type="number" id="digit1" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
        <input type="number" id="digit2" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
        <span style="font-size:30px; margin: 0 5px;">-</span>
        <input type="number" id="digit3" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
        <input type="number" id="digit4" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
        <span style="font-size:30px; margin: 0 5px;">-</span>
        <input type="number" id="digit5" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
        <input type="number" id="digit6" min="0" max="9" value="0" style="width:45px; height:55px; font-size:28px; text-align:center; border-radius:5px; border:2px solid #7f8c8d;">
    </div>
    
    <button id="gembok-btn" style="padding:10px 20px; background:#f1c40f; color:black; border:none; border-radius:5px; font-weight:bold; cursor:pointer; font-size:16px;">🔓 ENTER SANDI</button>
    <button id="gembok-close" style="padding:10px 20px; background:#e74c3c; color:white; border:none; border-radius:5px; font-weight:bold; cursor:pointer; font-size:16px; margin-left:10px;">BATAL</button>
    <p id="gembok-feedback" style="font-weight:bold; margin-top:10px;"></p>
</div>
`;
if (!document.getElementById('gembok-container')) document.body.insertAdjacentHTML('beforeend', gembokHTML);

// ==========================================
// DATA BANK SOAL FISIKA (BINTANG)
// ==========================================
const soalBabak1 = [
    { tanya: "Jarak jembatan 10 m. Dodi melayang 2 s, berapa kecepatan awalnya (m/s)? (v = s/t)", jawab: "5" },
    { tanya: "Dodi berlari 4 m/s selama 3 s. Berapa jarak tempuhnya (meter)? (s = v x t)", jawab: "12" },
    { tanya: "Dari keadaan diam, percepatan 2 m/s². Kecepatannya setelah 4 s adalah (m/s)? (v = a x t)", jawab: "8" }
];
const soalBabak2 = [
    { tanya: "Massa 40 kg, g=10. Berapa Gaya Berat (Newton)? (W = m x g)", jawab: "400" },
    { tanya: "Dorong batu 10 kg gaya 50 N. Berapa percepatannya (m/s²)? (a = F/m)", jawab: "5" },
    { tanya: "Tarik 20 N ke kanan, gesek 5 N ke kiri. Resultan (N)?", jawab: "15" }
];
const soalBabak3 = [
    { tanya: "Batu 2 kg kecepatan 10 m/s. Energi Kinetiknya (Joule)? (EK = 1/2 x m x v²)", jawab: "100" },
    { tanya: "Angkat batu 4 kg setinggi 5 meter. Energi Potensialnya (Joule)? (EP = m.g.h)", jawab: "200" },
    { tanya: "Dorong meriam 5 m dengan gaya 10 N. Usahanya (Joule)? (W = F x s)", jawab: "50" }
];

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
    btnSubmit.disabled = false;

    btnSubmit.onclick = () => {
        btnSubmit.disabled = true; 
        if (input.value == soalAcak.jawab) {
            feedback.innerText = "BENAR!";
            feedback.style.color = "green";
            setTimeout(() => { ui.classList.add('hidden'); callbackBenar(); scene.physics.resume(); }, 1500);
        } else {
            feedback.innerText = "SALAH! Coba hitung lagi.";
            feedback.style.color = "red";
            setTimeout(() => { ui.classList.add('hidden'); callbackSalah(); scene.physics.resume(); }, 1500);
        }
    };
}

// ==========================================
// KELAS BABAK 1 : TEPI HUTAN (Dengan TTS)
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
        
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({ key: 'bintang', repeat: 2, setXY: { x: 250, y: 450, stepX: 150 } });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.pemburu = this.physics.add.sprite(700, 450, 'pemburu').setScale(1.5);
        this.physics.add.collider(this.pemburu, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;
        this.ttsSedangAktif = false;

        this.physics.add.collider(this.dodi, this.pemburu, () => {
            this.physics.pause();
            this.dodi.setTint(0xff0000);
            setTimeout(() => { alert("Tertangkap!"); this.scene.restart(); }, 500);
        });

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak1);
            tampilkanSoal(this, soalAcak, 
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    if (this.soalTerjawab === 3) {
                        this.punyaToken = true;
                        this.pemburu.disableBody(true, true); 
                        this.portal.setVisible(true); 
                    }
                },
                () => { this.dodi.x -= 40; }
            );
        });

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken && !this.ttsSedangAktif) {
                this.ttsSedangAktif = true;
                this.physics.pause();
                this.dodi.anims.play('turn');

                let ttsUI = document.getElementById('tts-container');
                ttsUI.style.display = 'block';
                document.getElementById('tts-mendatar').value = "";
                document.getElementById('tts-menurun').value = "";
                document.getElementById('tts-feedback').innerText = "";
                
                document.getElementById('tts-btn').onclick = () => {
                    let mendatar = document.getElementById('tts-mendatar').value.toUpperCase().trim();
                    let menurun = document.getElementById('tts-menurun').value.toUpperCase().trim();
                    let feedback = document.getElementById('tts-feedback');

                    if (mendatar === "GERAK" && menurun === "GAYA") {
                        feedback.innerText = "KODE PORTAL DITERIMA! MELUNCUR...";
                        feedback.style.color = "green";
                        setTimeout(() => {
                            ttsUI.style.display = 'none';
                            this.scene.start('Babak2');
                        }, 1500);
                    } else {
                        feedback.innerText = "Jawaban Salah! Coba baca soalnya lagi.";
                        feedback.style.color = "red";
                    }
                };
            }
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
// KELAS BABAK 2 : SUNGAI DERAS (Dengan Gembok)
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
        
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({ key: 'bintang', repeat: 2, setXY: { x: 120, y: 450, stepX: 70 } });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.portal = this.physics.add.image(750, 450, 'portal');
        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;
        this.gembokSedangAktif = false; // State untuk mencegah UI terbuka dobel

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak2);
            tampilkanSoal(this, soalAcak, 
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    let posisiX = 250 + (this.soalTerjawab * 65);
                    let jembatanBaru = this.platforms.create(posisiX, 568, 'tanah').setScale(0.2, 1).refreshBody();
                    jembatanBaru.setTint(0x8B4513); 
                    if (this.soalTerjawab === 3) { this.punyaToken = true; this.portal.setVisible(true); }
                },
                () => { this.dodi.x -= 30; }
            );
        });

        // LOGIKA GEMBOK 6 ANGKA
        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken && !this.gembokSedangAktif) {
                this.gembokSedangAktif = true;
                this.physics.pause();
                this.dodi.anims.play('turn');

                let gembokUI = document.getElementById('gembok-container');
                gembokUI.style.display = 'block';
                document.getElementById('gembok-feedback').innerText = "";

                // Tombol ENTER Sandi
                document.getElementById('gembok-btn').onclick = () => {
                    let d1 = document.getElementById('digit1').value;
                    let d2 = document.getElementById('digit2').value;
                    let d3 = document.getElementById('digit3').value;
                    let d4 = document.getElementById('digit4').value;
                    let d5 = document.getElementById('digit5').value;
                    let d6 = document.getElementById('digit6').value;

                    let sandi = d1 + d2 + d3 + d4 + d5 + d6;

                    if (sandi === "205035") {
                        document.getElementById('gembok-feedback').innerText = "SANDI BENAR! GEMBOK TERBUKA!";
                        document.getElementById('gembok-feedback').style.color = "lime";
                        setTimeout(() => {
                            gembokUI.style.display = 'none';
                            this.scene.start('Babak3');
                        }, 1500);
                    } else {
                        document.getElementById('gembok-feedback').innerText = "SANDI SALAH! AKSES DITOLAK.";
                        document.getElementById('gembok-feedback').style.color = "red";
                    }
                };

                // Tombol BATAL (Agar Dodi tidak terjebak jika ingin hitung ulang)
                document.getElementById('gembok-close').onclick = () => {
                    gembokUI.style.display = 'none';
                    this.gembokSedangAktif = false;
                    this.dodi.x -= 40; // Terpental mundur
                    this.physics.resume();
                };
            }
        });
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
// KELAS BABAK 3 : MARKAS PEMBURU 
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
        
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({ key: 'bintang', repeat: 2, setXY: { x: 150, y: 450, stepX: 100 } });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        this.orangutan = this.physics.add.sprite(700, 250, 'pemburu').setTint(0xffa500).setVisible(false); 
        this.physics.add.collider(this.orangutan, this.platforms);

        this.peti = this.physics.add.image(700, 250, 'peti').setScale(1.5);
        this.physics.add.collider(this.peti, this.platforms);

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak3);
            tampilkanSoal(this, soalAcak, 
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    if (this.soalTerjawab === 3) {
                        let batu = this.physics.add.sprite(350, 450, 'batu').setScale(1.5);
                        this.physics.add.collider(batu, this.platforms);
                        batu.setBounce(0.5);
                        batu.setVelocity(400, -600); 

                        this.physics.add.collider(batu, this.peti, () => {
                            batu.disableBody(true, true); 
                            this.peti.disableBody(true, true); 
                            this.orangutan.setVisible(true).setVelocityY(-300);
                            setTimeout(() => { alert("TAMAT! Dodi berhasil menyelamatkan Orangutan! Kamu adalah Master Fisika!"); }, 500);
                        });
                    }
                },
                () => { this.dodi.x -= 40; }
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
    type: Phaser.AUTO, width: 800, height: 600, parent: 'game-container',
    physics: { default: 'arcade', arcade: { gravity: { y: 800 }, debug: false } },
    scene: [Babak1, Babak2, Babak3] 
};
const game = new Phaser.Game(config);
