// Анимация появления hero после загрузки страницы
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 0;
    setTimeout(() => {
      hero.style.transition = 'opacity 1s';
      hero.style.opacity = 1;
    }, 100);
  }

  // Скрываем прелоадер
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }

  // Обработчик клика на ссылке вишлиста
  const wishlistLink = document.querySelector('.wishlist-link');
  if (wishlistLink) {
    wishlistLink.addEventListener('click', function (event) {
      alert('Вы переходите на страницу с вашим вишлистом!');
    });
  }

  // Инициализация слайдера Swiper (внутри load!)
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    grabCursor: true,
    centeredSlides: false,
    speed: 500,
  });
});
