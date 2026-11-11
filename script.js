// ===== Manga Oyinlar - JavaScript =====

// Boshlang'ich manga ma'lumotlari
let mangas = [
    {
        title: "One Piece",
        author: "Eiichiro Oda",
        genre: "Aksiya",
        rating: 9,
        review: "Eng zo'r sarguzisht mangalaridan biri. Luffy va uning ekipaji haqida hayajonli hikoya."
    },
    {
        title: "Naruto",
        author: "Masashi Kishimoto",
        genre: "Aksiya",
        rating: 8,
        review: "Ninja dunyosida o'sib ulg'aygan yigitning orzu va kurashlari haqida."
    },
    {
        title: "Death Note",
        author: "Tsugumi Ohba",
        genre: "Drama",
        rating: 9,
        review: "Aqlli o'quvchi va detektiv o'rtasidagi qiziqarli aqliy jang."
    },
    {
        title: "Attack on Titan",
        author: "Hajime Isayama",
        genre: "Aksiya",
        rating: 10,
        review: "Insoniyatning omon qolish uchun kurashi. Hayajonli va favqulodda syujet."
    },
    {
        title: "Demon Slayer",
        author: "Koyoharu Gotouge",
        genre: "Fantastika",
        rating: 9,
        review: "Chirtakchi bilan jinlar bilan jang qiladigan bolaning hikoyasi. Ajoyib animatsiya."
    },
    {
        title: "My Hero Academia",
        author: "Kohei Horikoshi",
        genre: "Aksiya",
        rating: 8,
        review: "Super qahramonlar dunyosida o'sgan yigitning kashfiyotlari."
    }
];

// DOM elementlarini olish
const mangaContainer = document.getElementById('mangaContainer');
const mangaForm = document.getElementById('mangaForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// ===== Mangalarni ko'rsatish funksiyasi =====
function displayMangas(mangaList) {
    mangaContainer.innerHTML = '';

    if (mangaList.length === 0) {
        mangaContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 2rem; color: #636e72;">Manga topilmadi.</p>';
        return;
    }

    mangaList.forEach((manga, index) => {
        const card = document.createElement('div');
        card.className = 'manga-card';

        // Reytingni yulduzchalarga aylantirish
        const stars = '★'.repeat(Math.round(manga.rating / 2)) + '☆'.repeat(5 - Math.round(manga.rating / 2));

        // Bosh harfni olish
        const firstLetter = manga.title.charAt(0).toUpperCase();

        card.innerHTML = `
            <div class="manga-cover">${firstLetter}</div>
            <div class="manga-info">
                <h3>${manga.title}</h3>
                <p class="manga-author">Muallif: ${manga.author}</p>
                <span class="manga-genre">${manga.genre}</span>
                <p class="manga-review-text">${manga.review}</p>
                <div class="manga-rating">
                    <span class="rating-stars">${stars} ${manga.rating}/10</span>
                    <button class="delete-btn" onclick="deleteManga(${index})">O'chirish</button>
                </div>
            </div>
        `;
        mangaContainer.appendChild(card);
    });
}

// ===== Yangi manga qo'shish =====
mangaForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newManga = {
        title: document.getElementById('mangaTitle').value.trim(),
        author: document.getElementById('mangaAuthor').value.trim(),
        genre: document.getElementById('mangaGenre').value,
        rating: parseInt(document.getElementById('mangaRating').value),
        review: document.getElementById('mangaReview').value.trim()
    };

    // Validatsiya
    if (newManga.rating < 1 || newManga.rating > 10) {
        alert('Reyting 1 dan 10 gacha bo\'lishi kerak!');
        return;
    }

    mangas.push(newManga);
    saveToLocalStorage();
    displayMangas(mangas);
    mangaForm.reset();
    alert('Manga sharhi muvaffaqiyatli qo\'shildi!');
});

// ===== Mangani o'chirish =====
function deleteManga(index) {
    if (confirm('Bu manga sharhini o\'chirishni istaysizmi?')) {
        mangas.splice(index, 1);
        saveToLocalStorage();
        displayMangas(mangas);
    }
}

// ===== Qidirish funksiyasi =====
function searchMangas() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = mangas.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.author.toLowerCase().includes(query) ||
        m.genre.toLowerCase().includes(query)
    );
    displayMangas(filtered);
}

searchBtn.addEventListener('click', searchMangas);
searchInput.addEventListener('keyup', searchMangas);

// ===== Local Storage ga saqlash =====
function saveToLocalStorage() {
    localStorage.setItem('mangas', JSON.stringify(mangas));
}

// ===== Local Storage dan yuklash =====
function loadFromLocalStorage() {
    const stored = localStorage.getItem('mangas');
    if (stored) {
        mangas = JSON.parse(stored);
    }
}

// ===== Sahifa yuklanganda =====
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    displayMangas(mangas);
    console.log('Manga Oyinlar loyihasi ishga tushdi!');
});
