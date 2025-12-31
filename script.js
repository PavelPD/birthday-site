/* ===== ПЛАВНЫЙ СКРОЛЛ ===== */
const scrollDownBtn = document.getElementById('scrollDownBtn');

scrollDownBtn.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});


/* ===== СЧЁТЧИК ДНЕЙ ВМЕСТЕ ===== */
const togetherCounter = document.getElementById('togetherCounter');

const startDate = new Date(2025, 5, 20); 
// формат: (год, месяц-1, день)

function updateCounter() {
    const today = new Date();

    today.setHours(0, 0, 0, 0,);
    startDate.setHours(0, 0, 0, 0,);

    const diffTime = today - startDate;
    const days = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

    togetherCounter.textContent = `${days} дней ❤️`;
}

updateCounter();


/* ===== TIMELINE SCROLL ===== */
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineList = document.querySelector('.timeline-list');

let currentIndex = 0;

function updateTimeline() {
    timelineItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');

        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === currentIndex - 1) {
            item.classList.add('prev');
        } else if (index === currentIndex + 1) {
            item.classList.add('next');
        }
    });

    const itemHeight = timelineItems[0].offsetHeight + 20; // + margin
    const windowHeight = document.querySelector('.timeline-window').offsetHeight;

    const totalHeight = timelineItems.length * itemHeight;
    // исходный расчёт
    let offset =
        currentIndex * itemHeight -
        windowHeight / 2 +
        itemHeight / 2;

    // ограничения
    const minOffset = 0;
    const maxOffset = totalHeight - windowHeight;

    // clamp
    offset = Math.max(minOffset, Math.min(offset, maxOffset));

    timelineList.style.transform = `translateY(-${offset}px)`;
}

updateTimeline();


/* ===== СЛАЙДЕР TIMELINE ===== */
/*const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});*/


/* ===== СЛАЙДЕР ФОТО ===== */
const photoSlider = document.getElementById('photoSlider');
const photoSlides = document.querySelectorAll('.photo-slide');

const photonextBtn = document.getElementById('next');
const photoprevBtn = document.getElementById('prev');

let photoIndex = 0;
let startX = 0;
let endX = 0;

function showPhoto(index) {
    if (!photoSlides[index]) return;
    photoSlides.forEach(slide => slide.classList.remove('active'));
    photoSlides[index].classList.add('active');
}

/*  КНОПКИ  */
photonextBtn.addEventListener('click', () => {
    photoIndex = (photoIndex + 1) % photoSlides.length;
    showPhoto(photoIndex);
});

photoprevBtn.addEventListener('click', () => {
    photoIndex = (photoIndex - 1 + photoSlides.length) % photoSlides.length;
    showPhoto(photoIndex);
});

/*  СВАЙП  */
photoSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

photoSlider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handlePhotoSwipe();
});

function handlePhotoSwipe() {
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
        photoIndex = (photoIndex + 1) % photoSlides.length;
    } else {
        photoIndex = (photoIndex - 1 + photoSlides.length) % photoSlides.length;
    }

    showPhoto(photoIndex);
}


/* ===== ПОДАРОК ===== */
const cards = document.querySelectorAll('.card');
const finalText = document.getElementById('finalText');

const showBirthdayBtn = document.getElementById('showBirthdayBtn');
const birthdayMessage = document.getElementById('birthdayMessage');

showBirthdayBtn.addEventListener('click', () => {
    showBirthdayBtn.classList.remove('show');
    showBirthdayBtn.classList.add('hidden');

    birthdayMessage.classList.remove('hidden');
    birthdayMessage.classList.add('show');
});

let openedCount = 0;

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.classList.contains('open')) return; // нельзя открыть дважды
        
        card.classList.add('open');
        openedCount++;
        
        // эффект сердечек при открытии
        for (let i = 0; i < 5; i++) {
            setTimeout(createHeart, i * 100);
        }
        
        if (index === 1) {
            // показываем финальный текст      
            document.getElementById('finalOverlay').classList.add('show');
            finalText.classList.remove('hidden');
            finalText.classList.add('show');

      for (let i = 0; i < 40; i++) {
        setTimeout(createHeart, i * 80);}

        setTimeout(() => {
            const btn = document.getElementById('showBirthdayBtn');
            btn.classList.remove('hidden');
            btn.classList.add('show');
        }, 1500);
        }
  });
});


/* ===== СЕРДЕЧКИ ===== */
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const emojis = ['❤️', '💖', '🎁', '🎂', '✨'];
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // случайная позиция по X
    const x = Math.random() * 100;
    heart.style.left = x + 'vw';

    // случайное смещение в сторону
    const offsetX = (Math.random() * 200 - 100) + 'px';
    heart.style.setProperty('--x', offsetX);

    // случайный размер
    const size = 16 + Math.random() * 24;
    heart.style.fontSize = size + 'px';

    // случайная длительность
    const duration = 2 + Math.random() * 2;
    heart.style.animationDuration = duration + 's';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}


const timelineWindow = document.querySelector('.timeline-window');
let isScrolling = false;

timelineWindow.addEventListener(
    'wheel',
    (e) => {
        e.preventDefault();
        if (isScrolling) return;

        if (e.deltaY > 0 && currentIndex < timelineItems.length - 1) {
            currentIndex++;
        } 
        else if (e.deltaY < 0 && currentIndex > 0) {
            currentIndex--;
        }

        updateTimeline();
        isScrolling = true;

        setTimeout(() => (isScrolling = false), 500);
    },
    { passive: false }
);


/* ===== TOUCH SWIPE FOR TIMELINE ===== */
let touchStartY = 0;
let touchEndY = 0;

const SWIPE_THRESHOLD = 50; // минимальная дистанция свайпа

timelineWindow.addEventListener(
    'touchstart',
    (e) => {
        touchStartY = e.touches[0].clientY;
    },
    { passive: true }
);

timelineWindow.addEventListener(
    'touchend',
    (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    },
    { passive: false }
);

function handleSwipe() {
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;

    if (deltaY > 0 && currentIndex < timelineItems.length - 1) {
        // свайп вверх
        currentIndex++;
    } else if (deltaY < 0 && currentIndex > 0) {
        // свайп вниз
        currentIndex--;
    }

    updateTimeline();
}
