
// ==========================================
// KONFIGURASI UNDANGAN YOGA & SUCI
// ==========================================

const CONFIG = {
    date: "2031-09-25T08:00:00+07:00",
    whatsapp: "" // Isi nomor WhatsApp tujuan
};


// ==========================================
// DATA TAMU UNDANGAN
// ==========================================

const params = new URLSearchParams(window.location.search);
const guestElement = document.getElementById("guest");

if (params.get("to") && guestElement) {
    guestElement.textContent = params.get("to");
}


// ==========================================
// FITUR MUSIK
// ==========================================

const audio = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const musicStatus = document.getElementById("musicStatus");

// Fungsi memutar musik
function playMusic() {
    if (!audio) return;

    audio.play()
        .then(() => {
            musicBtn.classList.add("playing");
            musicStatus.textContent = "MUSIK ON";
        })
        .catch((error) => {
            console.log("Musik tidak dapat diputar:", error);
            musicStatus.textContent = "MUSIK OFF";
        });
}

// Fungsi menghentikan musik
function stopMusic() {
    audio.pause();

    musicBtn.classList.remove("playing");
    musicStatus.textContent = "MUSIK OFF";
}

// Tombol musik pojok kanan atas
musicBtn.addEventListener("click", () => {
    if (audio.paused) {
        playMusic();
    } else {
        stopMusic();
    }
});


// ==========================================
// BUKA UNDANGAN + MUSIK OTOMATIS
// ==========================================

const openButton = document.getElementById("open");
const cover = document.getElementById("cover");
const site = document.getElementById("site");

openButton.addEventListener("click", function () {

    // Putar musik langsung ketika tombol diklik
    // Tidak perlu klik tombol musik di pojok kanan atas
    playMusic();

    // Hilangkan halaman cover
    cover.classList.add("fade");

    // Tampilkan halaman utama
    setTimeout(() => {
        cover.style.display = "none";
        site.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        observe();

    }, 650);

});


// ==========================================
// COUNTDOWN PERNIKAHAN
// ==========================================

function countdown() {

    const target = new Date(CONFIG.date).getTime();
    const now = Date.now();

    let distance = Math.max(0, target - now);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    distance %= (1000 * 60 * 60 * 24);

    const hours = Math.floor(distance / (1000 * 60 * 60));

    distance %= (1000 * 60 * 60);

    const minutes = Math.floor(distance / (1000 * 60));

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

countdown();

setInterval(countdown, 1000);


// ==========================================
// ANIMASI SCROLL
// ==========================================

const io = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            io.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

function observe() {

    document.querySelectorAll(".reveal").forEach((element) => {
        io.observe(element);
    });

}

observe();


// ==========================================
// RSVP / KONFIRMASI KEHADIRAN
// ==========================================

const rsvpForm = document.getElementById("rsvp");

rsvpForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const form = new FormData(e.target);

    const nama = form.get("nama");
    const status = form.get("status");
    const pesan = form.get("pesan") || "-";

    const message =
        `Assalamu'alaikum, saya ${nama}. ` +
        `Konfirmasi: ${status}. ` +
        `Ucapan: ${pesan}`;

    if (!CONFIG.whatsapp) {

        alert("Nomor WhatsApp tujuan belum diatur di script.js.");

        return;
    }

    const url =
        `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener");

});


// ==========================================
// FOTO MEMPELAI DAN GALERI
// ==========================================

const photos = [
    ["groomPhoto", "assets/yoga.jpg"],
    ["bridePhoto", "assets/suci.jpg"],
    ["gallery1", "assets/galeri-1.jpg"],
    ["gallery2", "assets/galeri-2.jpg"],
    ["gallery3", "assets/galeri-3.jpg"]
];

photos.forEach(([id, src]) => {

    const element = document.getElementById(id);

    if (!element) return;

    const image = new Image();

    image.onload = () => {

        element.style.background =
            `url("${src}") center/cover`;

        const placeholder = element.querySelector("span");

        if (placeholder) {
            placeholder.style.display = "none";
        }
    };

    image.src = src;

});


// ==========================================
// SCRIPT SELESAI
// ==========================================
