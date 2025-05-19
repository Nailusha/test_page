/**
 * index.js
 * – Кнопочное переключение секций-«сторис»
 * – Автопереход через заданный интервал
 * – Плавное появление текстовых блоков (.animate → .visible)
 * – (Опционально) модальное окно
 */

document.addEventListener('DOMContentLoaded', () => {
    /* ===== Сбор DOM-элементов ===== */
    const sections = Array.from(document.querySelectorAll('.story-section'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;                   // индекс текущей секции
    const autoDelay = 7000;                 // автопереход (мс)
    let autoTimer = null;

    /* ===== Функция показа секции ===== */
    function showSection(index) {
        sections.forEach((sec, i) => {
            sec.classList.toggle('active', i === index);
        });
        currentIndex = index;

        // запуск анимаций текста внутри активной секции
        const animElems = sections[currentIndex].querySelectorAll('.animate');
        animElems.forEach(el => {
            // небольшой таймаут, чтобы CSS-transition отработал
            setTimeout(() => el.classList.add('visible'), 50);
        });
    }

    /* ===== Навигация по кнопкам ===== */
    nextBtn.addEventListener('click', () => {
        showSection((currentIndex + 1) % sections.length);
        resetAutoTimer();
    });

    prevBtn.addEventListener('click', () => {
        showSection((currentIndex - 1 + sections.length) % sections.length);
        resetAutoTimer();
    });

    /* ===== Автопрокрутка ===== */
    function startAutoTimer() {
        autoTimer = setInterval(() => {
            showSection((currentIndex + 1) % sections.length);
        }, autoDelay);
    }
    function resetAutoTimer() {
        clearInterval(autoTimer);
        startAutoTimer();
    }
    startAutoTimer();

    /* ===== Модальное окно (если нужно) ===== */
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.add('active'); // показываем при загрузке

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn?.addEventListener('click', () => modal.classList.remove('active'));

        // закрывать по клику вне окна
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    /* ===== Инициализация ===== */
    showSection(currentIndex);
});

