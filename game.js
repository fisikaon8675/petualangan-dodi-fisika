const config = {
    type: Phaser.AUTO,
    width: 800,        // Lebar kanvas game
    height: 600,       // Tinggi kanvas game
    parent: 'game-container', // Div ID dari index.html tempat game akan dimuat
    physics: {
        default: 'arcade', // Sistem fisika bawaan yang sangat cocok untuk game platformer
        arcade: {
            gravity: { y: 500 }, // Nilai gravitasi. Makin besar makin cepat jatuh. (Fisika Kinematika!)
            debug: false // Nanti kita ubah 'true' untuk melihat kotak deteksi tabrakan
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Menginisialisasi game Phaser dengan konfigurasi di atas
const game = new Phaser.Game(config);

// 1. PRELOAD: Tempat kita memasukkan memori gambar, karakter, dan suara
function preload() {
    console.log("Memuat aset...");
    // Nanti kita akan memuat gambar Dodi dan tanah di sini
}

// 2. CREATE: Tempat kita membuat objek muncul di layar
function create() {
    // Mewarnai langit menjadi biru muda
    this.cameras.main.setBackgroundColor('#87CEEB');

    // Menampilkan teks sambutan (x, y, teks, style)
    this.add.text(400, 300, 'Babak 1: Tepi Hutan\n(Menunggu Karakter Dodi...)', {
        fontSize: '32px',
        fill: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
        stroke: '#000000',
        strokeThickness: 5
    }).setOrigin(0.5); // Memastikan jangkar titik berada persis di tengah teks
}

// 3. UPDATE: Tempat logika utama terjadi berulang-ulang (sekitar 60 frame per detik)
function update() {
    // Logika kontrol keyboard dan interaksi akan kita tulis di sini
}
