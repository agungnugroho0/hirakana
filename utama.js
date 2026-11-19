document.querySelector('#btn-hiragana').addEventListener('click',() => window.location.href = 'hiragana.html');
document.querySelector('#btn-katakana').addEventListener('click',() => window.location.href = 'katakana.html');




// const data = [];
// try {
//     fetch(`hirakata.json`)
//         .then(response => response.json())
//         .then(hasil => {
//             data.push(...hasil);
//             init()
//         }
//         );
// }
// catch (err) { `alert(${err})` };

// const tester = document.querySelector('.kana');
// // const filter = { kelompok: 'ka' , type:'hiragana'};
// const filter = null;
// let hasilfilter = null;

// function init() {
//     if (filter !== null) { hasilfilter = data.filter(e => e.kelompok === filter.kelompok && e.type === filter.type) } else { hasilfilter = data };

//     let acak = Math.floor(Math.random() * (hasilfilter.length));
//     let isi = '';

//     isi += `${hasilfilter[acak].kana}`
//     tester.innerHTML = isi;
//     // console.log(data)
// }