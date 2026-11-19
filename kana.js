let kunci = document.getElementById('hira').getAttribute('data-kana');

let kelompok = document.querySelectorAll('.kelompok');
let acak = 0;
let data = [];
let hasilfilter = [];
let hasilJawaban = [];
let riwayatacak = [];


// Ambil data JSON
fetch(`data/${kunci}.json`)
    .then(r => r.json())
    .then(hasil => {
        data.push(...hasil);
    });



// Pilih kelompok kana
kelompok.forEach(i => {

    i.addEventListener('click', () => {
        hasilfilter = [];
        hasilJawaban = [];
        riwayatacak = [];
        if (data.length === 0) {
            console.log('Data belum selesai dimuat');
            return;
        }

        let kelompoks = i.getAttribute('data-kelompok');
        let categori = i.getAttribute('data-category');
        if (kelompoks !== "" || categori !== "") {
            hasilfilter = data.filter(e => e.kelompok === kelompoks && e.category === categori
            );
        } else {
            hasilfilter.push(...data);
        }

        console.table(hasilfilter);
        if (hasilfilter.length === 0) {
            console.log('Data kelompok tidak ditemukan');
            return;
        }

        acak = acakkartu(hasilfilter);
        kartu(hasilfilter[acak]);
        riwayatacak.push(acak);

    });

});


// Random kartu
function acakkartu(kana) {
    return Math.floor(Math.random() * kana.length);
}


// Menampilkan kartu
function kartu(kana) {

    const card = document.querySelector('.card');
    const wadah = document.querySelector('.wadah');

    card.classList.remove('hidden');
    wadah.classList.add('hidden');

    // Isi kartu
    card.innerHTML = `
        <div
            id="kartu-flip"
            class="w-64 h-96 bg-white rounded-2xl shadow-2xl
                   flex flex-col justify-center items-center
                   p-6
                   transition-transform duration-500 ease-in-out
                   [backface-visibility:hidden]"
        >

            <div class="text-8xl font-bold text-gray-800">
                ${kana.kana}
            </div>

            <input
                type="text"
                placeholder="Masukkan Jawaban"
                class=" text-center w-full
                       bg-transparent text-gray-800
                       text-lg pt-6 focus:outline-none"
                id="jawaban"
            >

            <button
                onclick="next()"
                class="mt-6 bg-blue-700 text-white
                       px-8 py-3 rounded-lg
                       hover:bg-blue-800
                       active:scale-95 transition"
                       id="btn-next"
            >
                Next
            </button>

            <p class="text-lg font-semibold text-gray-800 mt-4 hidden" id="keterangan">
            </p>
        </div>
    `;

    const flip = document.querySelector('#kartu-flip');

    // Posisi awal kartu
    flip.style.transform = 'rotateY(90deg)';

    // Animasi menuju posisi normal
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            flip.style.transform = 'rotateY(0deg)';
        });
    });

}

// Tombol Next
function next() {
    let jawaban = document.querySelector('#jawaban');
    let ket = document.querySelector('#keterangan');
    let btnNext = document.querySelector('#btn-next');

    if (jawaban.value.trim() === '') {
        alert('Masukkan jawaban terlebih dahulu');
        return;
    }

    btnNext.disabled = true;

    ket.classList.remove('hidden');

    // Periksa jawaban
    let cek = hasilfilter[acak].romaji === jawaban.value.trim().toLowerCase();

    if (cek) {
        ket.classList.add('text-green-600');
        ket.classList.remove('text-red-600');
        ket.innerHTML = 'Jawaban Benar';
    } else {
        ket.classList.add('text-red-600');
        ket.classList.remove('text-green-600');

        ket.innerHTML = `Salah, Yang benar adalah 
        <span class="font-bold">${hasilfilter[acak].romaji}</span>`;
    }

    // Simpan hasil jawaban
    hasilJawaban.push({
        kana: hasilfilter[acak].kana,
        jawaban: jawaban.value.trim().toLowerCase(),
        benar: cek
    });

    // Tunggu 2 detik sebelum kartu berikutnya
    setTimeout(() => {

        // Ambil indeks kartu yang belum pernah muncul
        let kartutersedia = hasilfilter
            .map((e, index) => index)
            .filter(index => !riwayatacak.includes(index));

        // Periksa apakah semua kartu sudah ditampilkan
        if (kartutersedia.length === 0) {

            alert('Yeey! Kamu telah menyelesaikan semua kartu!');

            console.log('Hasil jawaban:', hasilJawaban);

            window.location.href = "index.html"
            return
        }

        // Pilih kartu secara acak dari kartu yang tersedia
        let acak1 = Math.floor(Math.random() * kartutersedia.length);

        // Ambil indeks asli dari kartu yang tersedia
        acak = kartutersedia[acak1];

        // Masukkan indeks ke riwayat
        riwayatacak.push(acak);

        // Tampilkan kartu berikutnya
        kartu(hasilfilter[acak]);

        console.log('Riwayat:', riwayatacak);
        console.log('Hasil jawaban:', hasilJawaban);

    }, 2000);
}
