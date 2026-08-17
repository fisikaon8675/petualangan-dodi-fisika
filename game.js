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
// KONTROL LAYAR SENTUH (HP)
// ==========================================
const touchUI = `
<div id="touch-controls" style="position:absolute; bottom:20px; left:0; width:100%; display:flex; justify-content:space-between; padding:0 40px; box-sizing:border-box; z-index:100; pointer-events:none;">
    <div style="display:flex; gap:20px; pointer-events:auto;">
        <button id="btn-kiri" style="width:70px; height:70px; font-size:35px; border-radius:50%; background:rgba(255,255,255,0.6); border:3px solid #333; cursor:pointer;">⬅️</button>
        <button id="btn-kanan" style="width:70px; height:70px; font-size:35px; border-radius:50%; background:rgba(255,255,255,0.6); border:3px solid #333; cursor:pointer;">➡️</button>
    </div>
    <div style="pointer-events:auto;">
        <button id="btn-lompat" style="width:70px; height:70px; font-size:35px; border-radius:50%; background:rgba(255,255,255,0.6); border:3px solid #333; cursor:pointer;">⬆️</button>
    </div>
</div>
`;
// Menambahkan UI ke layar jika belum ada
if (!document.getElementById('touch-controls')) document.body.insertAdjacentHTML('beforeend', touchUI);

// Variabel Global untuk membaca tombol
window.tombolKiri = false;
window.tombolKanan = false;
window.tombolLompat = false;

// Fungsi pembantu membaca sentuhan (Touch) dan klik (Mouse)
function pasangTombol(id, namaVariabel) {
    let btn = document.getElementById(id);
    // Untuk HP
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); window[namaVariabel] = true; });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); window[namaVariabel] = false; });
    // Untuk Komputer (bisa diklik)
    btn.addEventListener('mousedown', (e) => { window[namaVariabel] = true; });
    btn.addEventListener('mouseup', (e) => { window[namaVariabel] = false; });
    btn.addEventListener('mouseleave', (e) => { window[namaVariabel] = false; });
}

pasangTombol('btn-kiri', 'tombolKiri');
pasangTombol('btn-kanan', 'tombolKanan');
pasangTombol('btn-lompat', 'tombolLompat');

// ==========================================
// DATA BANK SOAL FISIKA (BINTANG)
// ==========================================
const soalBabak1 = [
    { tanya: "Jarak jembatan 10 m. Dodi melayang 2 s, berapa kecepatan awalnya (m/s)? (v = s/t)", jawab: "5" },
    { tanya: "Dodi berlari 4 m/s selama 3 s. Berapa jarak tempuhnya (meter)? (s = v x t)", jawab: "12" },
    { tanya: "Dari keadaan diam, percepatan 2 m/s². Kecepatannya setelah 4 s adalah (m/s)? (v = a x t)", jawab: "8" },
    { tanya: "Jarak tempuh sebuah mobil adalah 20 meter dan ditempuh dalam waktu 4 sekon. Berapa kecepatannya (m/s)? (v = s / t)", jawab: "5" },
    { tanya: "Sebuah sepeda bergerak dengan kecepatan konstan 15 m/s selama 3 sekon. Berapa jarak yang ditempuhnya (meter)? (s = v x t)", jawab: "45" },
    { tanya: "Benda diam mengalami percepatan konstan 3 m/s². Berapa kecepatannya setelah 5 sekon (m/s)? (v = a x t)", jawab: "15" },
    { tanya: "Seorang atlet berlari dengan kecepatan 6 m/s untuk menempuh lintasan sejauh 42 meter. Berapa waktu yang dibutuhkan (sekon)? (t = s / v)", jawab: "7" },
    { tanya: "Mobil memiliki kecepatan awal 4 m/s dan dipercepat 2 m/s². Kecepatannya setelah 3 sekon adalah (m/s)? (vt = v0 + a x t)", jawab: "10" },
    { tanya: "Sepeda motor menambah kecepatan dari 10 m/s menjadi 30 m/s dalam waktu 5 sekon. Berapa percepatannya (m/s²)? (a = (vt - v0) / t)", jawab: "4" },
    { tanya: "Dari keadaan diam, mobil balap dipercepat 4 m/s² selama 3 sekon. Berapa jarak yang ditempuhnya (meter)? (s = 1/2 x a x t²)", jawab: "18" },
    { tanya: "Buah kelapa jatuh bebas dari pohon dan mencapai tanah dalam 2 sekon (g = 10 m/s²). Berapa ketinggian jatuhnya (meter)? (h = 1/2 x g x t²)", jawab: "20" },
    { tanya: "Truk direm dari kecepatan 8 m/s hingga berhenti dengan perlambatan 2 m/s². Berapa jarak pengeremannya (meter)? (s = v0² / (2 x a))", jawab: "16" }
];
const soalBabak2 = [
    { tanya: "Massa 40 kg, g=10. Berapa Gaya Berat (Newton)? (W = m x g)", jawab: "400" },
    { tanya: "Dorong batu 10 kg gaya 50 N. Berapa percepatannya (m/s²)? (a = F/m)", jawab: "5" },
    { tanya: "Tarik 20 N ke kanan, gesek 5 N ke kiri. Resultan (N)?", jawab: "15" },
    { tanya: "Benda bermassa 5 kg diberi percepatan 4 m/s². Berapa gaya yang bekerja pada benda tersebut (Newton)? (F = m x a)", jawab: "20" },
    { tanya: "Gaya sebesar 30 N bekerja pada benda bermassa 6 kg. Berapa percepatan yang dialami benda (m/s²)? (a = F / m)", jawab: "5" },
    { tanya: "Sebuah lemari ditarik dengan gaya 50 N sehingga mengalami percepatan 10 m/s². Berapa massa lemari tersebut (kg)? (m = F / a)", jawab: "5" },
    { tanya: "Sebuah batu bermassa 8 kg berada di bumi (g = 10 m/s²). Berapa berat batu tersebut (Newton)? (w = m x g)", jawab: "80" },
    { tanya: "Dua orang mendorong mobil mogok ke arah yang sama. Orang pertama memberi gaya 15 N dan orang kedua 25 N. Berapa resultan gayanya (Newton)? (R = F1 + F2)", jawab: "40" },
    { tanya: "Dalam tarik tambang, regu A menarik ke kanan dengan gaya 50 N dan regu B ke kiri dengan gaya 20 N. Berapa besar resultan gayanya (Newton)? (R = F_kanan - F_kiri)", jawab: "30" },
    { tanya: "Sebuah balok menekan lantai dengan gaya normal 40 N. Jika koefisien gesek kinetisnya 0,5, berapa gaya geseknya (Newton)? (f = μ x N)", jawab: "20" },
    { tanya: "Benda bermassa 4 kg didorong dengan gaya 30 N, namun terhambat gaya gesek 10 N. Berapa percepatan benda (m/s²)? (a = (F - f) / m)", jawab: "5" },
    { tanya: "Benda ditarik ke kanan oleh gaya 12 N dan 18 N, serta ditarik ke kiri oleh gaya 10 N. Berapa resultan gayanya (Newton)? (R = total gaya kanan - gaya kiri)", jawab: "20" }
];
const soalBabak3 = [
    { tanya: "Batu 2 kg kecepatan 10 m/s. Energi Kinetiknya (Joule)? (EK = 1/2 x m x v²)", jawab: "100" },
    { tanya: "Angkat batu 4 kg setinggi 5 meter. Energi Potensialnya (Joule)? (EP = m.g.h)", jawab: "200" },
    { tanya: "Dorong meriam 5 m dengan gaya 10 N. Usahanya (Joule)? (W = F x s)", jawab: "50" },
    { tanya: "Sebuah balok ditarik dengan gaya 20 N sehingga berpindah sejauh 5 meter. Berapa usaha yang dilakukan (Joule)? (W = F x s)", jawab: "100" },
    { tanya: "Sebuah kelapa bermassa 4 kg berada pada ketinggian 5 meter dari tanah (g = 10 m/s²). Berapa energi potensialnya (Joule)? (EP = m x g x h)", jawab: "200" },
    { tanya: "Benda bermassa 2 kg bergerak dengan kecepatan 6 m/s. Berapa energi kinetiknya (Joule)? (EK = 1/2 x m x v²)", jawab: "36" },
    { tanya: "Sebuah mesin melakukan usaha sebesar 120 Joule dalam waktu 4 sekon. Berapa daya mesin tersebut (Watt)? (P = W / t)", jawab: "30" },
    { tanya: "Usaha sebesar 150 Joule digunakan untuk mendorong meja dengan gaya 30 N. Berapa jarak perpindahannya (meter)? (s = W / F)", jawab: "5" },
    { tanya: "Untuk memindahkan kotak sejauh 4 meter diperlukan usaha sebesar 80 Joule. Berapa gaya yang diberikan (Newton)? (F = W / s)", jawab: "20" },
    { tanya: "Benda bermassa 3 kg diangkat dari ketinggian 2 m ke 6 m (g = 10 m/s²). Berapa usaha yang dilakukan (Joule)? (W = m x g x (h2 - h1))", jawab: "120" },
    { tanya: "Mobil mainan bermassa 4 kg dipercepat dari kecepatan 2 m/s menjadi 4 m/s. Berapa usaha yang dilakukan (Joule)? (W = 1/2 x m x (vt² - v0²))", jawab: "24" },
    { tanya: "Benda bermassa 6 kg memiliki energi potensial 300 Joule (g = 10 m/s²). Berapa ketinggian benda tersebut (meter)? (h = EP / (m x g))", jawab: "5" },
    { tanya: "Benda bermassa 2 kg memiliki energi kinetik 64 Joule. Berapa kecepatan benda tersebut (m/s)? (v = √( (2 x EK) / m ))", jawab: "8" }
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

// Fungsi pembantu untuk menggambar pohon
function gambarPohon(scene, x, y) {
    let batang = scene.add.rectangle(x, y, 20, 100, 0x5C4033);
    let daun = scene.add.circle(x, y - 50, 45, 0x228B22);
}

// ==========================================
// KELAS BABAK 1 : TEPI HUTAN 
// ==========================================
class Babak1 extends Phaser.Scene {
    constructor() { super('Babak1'); }

    preload() {
        // Load latar belakang yang berbeda
        this.load.image('bg1', 'https://labs.phaser.io/assets/skies/sky1.png');
        this.load.image('bg2', 'https://labs.phaser.io/assets/skies/sky4.png');
        this.load.image('bg3', 'https://labs.phaser.io/assets/skies/sunset.png');
        
        this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.spritesheet('dodi', 'https://labs.phaser.io/assets/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bintang', 'https://labs.phaser.io/assets/sprites/star.png');
        this.load.image('pemburu', 'https://labs.phaser.io/assets/sprites/space-baddie.png');
        this.load.image('portal', 'https://labs.phaser.io/assets/sprites/diamond.png');
        this.load.image('peti', 'https://labs.phaser.io/assets/sprites/crate.png');
        this.load.image('batu', 'https://labs.phaser.io/assets/sprites/bomb.png');
    }

    create() {
        // Set background penuh 1066x600
        this.add.image(533, 300, 'bg1').setDisplaySize(1066, 600); 
        // Hiasan Pohon diratakan sepanjang layar 1066px
        gambarPohon(this, 100, 480);
        gambarPohon(this, 350, 480);
        gambarPohon(this, 650, 480);
        gambarPohon(this, 900, 480);

        this.add.text(16, 16, 'Babak 1: Jawab 3 Tantangan di Hutan!', { fontSize: '20px', fill: '#000', fontStyle: 'bold', backgroundColor: '#fff' });


        this.platforms = this.physics.add.staticGroup();
        // Tanah membentang penuh sepanjang 1066px
        this.platforms.create(533, 568, 'tanah').setDisplaySize(1066, 64).refreshBody();
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
        // Kombinasi deteksi Keyboard (komputer) dan Layar Sentuh (HP)
        if (this.cursors.left.isDown || window.tombolKiri) { 
            this.dodi.setVelocityX(-160); 
            this.dodi.anims.play('left', true); 
        }
        else if (this.cursors.right.isDown || window.tombolKanan) { 
            this.dodi.setVelocityX(160); 
            this.dodi.anims.play('right', true); 
        }
        else { 
            this.dodi.setVelocityX(0); 
            this.dodi.anims.play('turn'); 
        }
        
        // Logika lompat
        if ((this.cursors.up.isDown || window.tombolLompat) && this.dodi.body.touching.down) { 
            this.dodi.setVelocityY(-550); 
        }
        
        // (Khusus di Babak 2 saja, biarkan kode jika jatuh ke sungai tetap ada)
        // if (this.dodi.y > 600) { this.scene.restart(); } 
    }
}

// ==========================================
// KELAS BABAK 2 : SUNGAI DERAS
// ==========================================
class Babak2 extends Phaser.Scene {
    constructor() { super('Babak2'); }

    create() {
        // Set background penuh 1066x600
        this.add.image(533, 300, 'bg2').setDisplaySize(1066, 600); 

        // Air Sungai membentang penuh 1066px
        let airSungai = this.add.rectangle(533, 580, 1066, 60, 0x1E90FF);
        this.physics.add.existing(airSungai, true);

        // Hiasan Pohon tepi sungai
        gambarPohon(this, 80, 480);
        gambarPohon(this, 980, 480);

        this.add.text(16, 16, 'Babak 2: Bangun Jembatan di Atas Sungai!', { fontSize: '20px', fill: '#000', fontStyle: 'bold', backgroundColor: '#fff' });

        this.platforms = this.physics.add.staticGroup();
        // Tanah awal dan akhir saja
        this.platforms.create(200, 550, 'tanah').setScale(0.5, 1).refreshBody(); 
        this.platforms.create(968, 550, 'tanah').setScale(0.5, 1).refreshBody();

        this.dodi = this.physics.add.sprite(50, 400, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(false); // Bisa jatuh
        this.physics.add.collider(this.dodi, this.platforms);

        // Kematian jika jatuh ke sungai
        this.physics.add.overlap(this.dodi, airSungai, () => {
            this.scene.restart(); // Mengulang babak ini jika jatuh
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({ key: 'bintang', repeat: 2, setXY: { x: 120, y: 400, stepX: 70 } });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        // Portal dipindah ke ujung kanan layar baru
        this.portal = this.physics.add.image(980, 450, 'portal');

        this.physics.add.collider(this.portal, this.platforms);
        this.portal.setVisible(false);
        this.punyaToken = false;
        this.gembokSedangAktif = false; 

        this.physics.add.overlap(this.dodi, this.bintangGroup, (dodi, bintang) => {
            let soalAcak = Phaser.Math.RND.pick(soalBabak2);
            tampilkanSoal(this, soalAcak, 
                () => {
                    bintang.disableBody(true, true);
                    this.soalTerjawab++;
                    // Membuat pijakan jembatan gantung (kayu kecil)
                    let posisiX = 200 + (this.soalTerjawab * 125);
                    let pijakan = this.platforms.create(posisiX, 550, 'tanah').setScale(0.2, 0.4).refreshBody();
                    pijakan.setTint(0x8B4513); // Warna Coklat Kayu
                    
                    if (this.soalTerjawab === 3) { this.punyaToken = true; this.portal.setVisible(true); }
                },
                () => { this.dodi.x -= 30; }
            );
        });

        this.physics.add.overlap(this.dodi, this.portal, () => {
            if (this.punyaToken && !this.gembokSedangAktif) {
                this.gembokSedangAktif = true;
                this.physics.pause();
                this.dodi.anims.play('turn');

                let gembokUI = document.getElementById('gembok-container');
                gembokUI.style.display = 'block';
                document.getElementById('gembok-feedback').innerText = "";

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
                        setTimeout(() => { gembokUI.style.display = 'none'; this.scene.start('Babak3'); }, 1500);
                    } else {
                        document.getElementById('gembok-feedback').innerText = "SANDI SALAH! AKSES DITOLAK.";
                        document.getElementById('gembok-feedback').style.color = "red";
                    }
                };

                document.getElementById('gembok-close').onclick = () => {
                    gembokUI.style.display = 'none';
                    this.gembokSedangAktif = false;
                    this.dodi.x -= 40; 
                    this.physics.resume();
                };
            }
        });
    }

    update() {
        // Kombinasi deteksi Keyboard (komputer) dan Layar Sentuh (HP)
        if (this.cursors.left.isDown || window.tombolKiri) { 
            this.dodi.setVelocityX(-160); 
            this.dodi.anims.play('left', true); 
        }
        else if (this.cursors.right.isDown || window.tombolKanan) { 
            this.dodi.setVelocityX(160); 
            this.dodi.anims.play('right', true); 
        }
        else { 
            this.dodi.setVelocityX(0); 
            this.dodi.anims.play('turn'); 
        }
        
        // Logika lompat
        if ((this.cursors.up.isDown || window.tombolLompat) && this.dodi.body.touching.down) { 
            this.dodi.setVelocityY(-550); 
        }
        
        // (Khusus di Babak 2 saja, biarkan kode jika jatuh ke sungai tetap ada)
        if (this.dodi.y > 600) { this.scene.restart(); } 
    }
}

// ==========================================
// KELAS BABAK 3 : MARKAS PEMBURU (SENJA)
// ==========================================
class Babak3 extends Phaser.Scene {
    constructor() { super('Babak3'); }

    create() {
        // Set background penuh 1066x600
        this.add.image(533, 300, 'bg3').setDisplaySize(1066, 600); 
        
        this.add.text(16, 16, 'Babak 3: Lepaskan Meriam untuk Menyelamatkan Orangutan!', { fontSize: '20px', fill: '#000', fontStyle: 'bold', backgroundColor: '#fff' });

        this.platforms = this.physics.add.staticGroup();
        // Tanah membentang penuh sepanjang 1066px
        this.platforms.create(533, 568, 'tanah').setDisplaySize(1066, 64).refreshBody();
        // Pijakan markas pemburu dipindah ke area kanan layar baru (x: 900)
        this.platforms.create(900, 350, 'tanah').setScale(0.5).refreshBody();

        // Pohon gundul / markas
        gambarPohon(this, 950, 270);

        this.dodi = this.physics.add.sprite(50, 450, 'dodi');
        this.dodi.setBounce(0.2);
        this.dodi.setCollideWorldBounds(true);
        this.physics.add.collider(this.dodi, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.soalTerjawab = 0;
        this.bintangGroup = this.physics.add.group({ key: 'bintang', repeat: 2, setXY: { x: 150, y: 450, stepX: 100 } });
        this.physics.add.collider(this.bintangGroup, this.platforms);

        // Orangutan (disembunyikan di dalam peti)
        this.orangutan = this.physics.add.sprite(900, 250, 'pemburu').setTint(0xffa500).setVisible(false); 
        this.physics.add.collider(this.orangutan, this.platforms);

        this.peti = this.physics.add.image(900, 250, 'peti').setScale(1.5);
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

                        // Ketika meriam menabrak peti
                        this.physics.add.collider(batu, this.peti, () => {
                            batu.disableBody(true, true); 
                            this.peti.disableBody(true, true); 
                            
                            // Tampilkan Orangutan
                            this.orangutan.setVisible(true).setPosition(this.peti.x, this.peti.y - 30);
                            
                            // Animasi Orangutan melompat berayun ke Dodi
                            this.tweens.add({
                                targets: this.orangutan,
                                x: this.dodi.x + 30, // Mendarat di samping Dodi
                                y: this.dodi.y,
                                duration: 1200,
                                ease: 'Bounce.easeOut',
                                onComplete: () => {
                                    // Teks Kemenangan Besar
                                    this.add.text(400, 200, 'SELAMAT!\nKAMU MENYELAMATKAN\nORANGUTAN!', { 
                                        fontSize: '40px', fill: '#FFD700', fontStyle: 'bold', align: 'center', 
                                        stroke: '#000', strokeThickness: 6 
                                    }).setOrigin(0.5);
                                    
                                    this.physics.pause();
                                    this.dodi.anims.play('turn');
                                }
                            });
                        });
                    }
                },
                () => { this.dodi.x -= 40; }
            );
        });
    }

    update() {
        // Kombinasi deteksi Keyboard (komputer) dan Layar Sentuh (HP)
        if (this.cursors.left.isDown || window.tombolKiri) { 
            this.dodi.setVelocityX(-160); 
            this.dodi.anims.play('left', true); 
        }
        else if (this.cursors.right.isDown || window.tombolKanan) { 
            this.dodi.setVelocityX(160); 
            this.dodi.anims.play('right', true); 
        }
        else { 
            this.dodi.setVelocityX(0); 
            this.dodi.anims.play('turn'); 
        }
        
        // Logika lompat
        if ((this.cursors.up.isDown || window.tombolLompat) && this.dodi.body.touching.down) { 
            this.dodi.setVelocityY(-550); 
        }
        
        // (Khusus di Babak 2 saja, biarkan kode jika jatuh ke sungai tetap ada)
        // if (this.dodi.y > 600) { this.scene.restart(); } 
    }
}

const config = {
    type: Phaser.AUTO,
    // Pengaturan Skala 16:9 dan Auto-Fit untuk HP
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1066, // Lebar 16:9
        height: 600  // Tinggi tetap 600
    },
    parent: 'game-container',
    physics: { default: 'arcade', arcade: { gravity: { y: 800 }, debug: false } },
    scene: [Babak1, Babak2, Babak3] 
};
const game = new Phaser.Game(config);
