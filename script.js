// Пример простой анимации при загрузке страницы
window.onload = function() {
    const hero = document.querySelector('.hero');
    hero.style.opacity = 0;
    setTimeout(() => {
        hero.style.transition = 'opacity 1s';
        hero.style.opacity = 1;
    }, 100);
};

// Пример функции для обработки клика по кнопке (например, анимация или подсказка)
const wishlistLink = document.querySelector('.wishlist-link');
wishlistLink.addEventListener('click', function(event) {
    alert('Вы переходите на страницу с вашим вишлистом!');
});
