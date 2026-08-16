// Konfigurasi Dunia Game
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }, // Percepatan gravitasi (semakin besar, jatuh semakin cepat)
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

// Variabel global agar bisa diakses di semua fungsi
let dodi;
let platforms;

// 1. PRELOAD: Memuat memori gambar sebelum game dimulai
function preload() {
    // Meminjam gambar sementara dari server Phaser agar Anda tidak perlu repot mengunggah gambar saat ini
    this.load.image('langit', 'https://labs.phaser.io/assets/skies/sky1.png');
    this.load.image('tanah', 'https://labs.phaser.io/assets/sprites/platform.png');
    this.load.image('dodi', 'https://labs.phaser.io/assets/sprites/dude.png');
}

// 2. CREATE: Menempatkan objek ke dalam layar
function create() {
    // A. Menambahkan background langit (koordinat x: 400, y: 300 adalah titik tengah layar)
    this.add.image(400, 300, 'langit');

    // B. Membuat Tanah (Benda Statis / Hukum I Newton: akan tetap diam)
    platforms = this.physics.add.staticGroup();
    
    // Meletakkan tanah di bawah layar dan memperbesar ukurannya 2 kali lipat (setScale)
    platforms.create(400, 568, 'tanah').setScale(2).refreshBody();

    // C. Memunculkan Dodi (Benda Dinamis / Akan ditarik oleh gravitasi bumi)
    dodi = this.physics.add.sprite(100, 450, 'dodi');
    
    // Memberikan sifat elastis (Pantulan/Restitusi). Nilai 0.2 berarti memantul sedikit.
    dodi.setBounce(0.2);
    
    // Membatasi Dodi agar tidak jatuh menembus batas kanvas game
    dodi.setCollideWorldBounds(true);

    // D. Hukum Aksi-Reaksi (Kolisi)
    // Memerintahkan mesin fisika agar Dodi berpijak pada tanah (tidak tembus)
    this.physics.add.collider(dodi, platforms);
}

// 3. UPDATE: Logika berulang (dikosongkan dulu untuk langkah 3 nanti)
function update() {
    // Menunggu Langkah 3...
}
