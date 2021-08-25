"use strict";

window.onload = function () {
  $('.slider-banner__row').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 5000
  });
  $('.slider__row').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    dots: true
  });
  $('.spoiler-block__title').click(function (event) {
    if ($('.spoiler-block').hasClass('one')) {
      $('.spoiler-block__title').not($(this)).removeClass('active');
      $('.spoiler-block__text').not($(this).next()).slideUp(500);
    }

    $(this).toggleClass('active').next().slideToggle(500);
  });
  var burger = document.querySelector('.header__burger');

  burger.onclick = function () {
    document.querySelector('.header__menu').classList.toggle('active');
    burger.classList.toggle('active');
    document.querySelector('body').classList.toggle('noscroll');
  };

  var getId = function getId(link) {
    return link.getAttribute('href').replace('#', '');
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.header__link').forEach(function (link) {
          link.classList.toggle('active', getId(link) === entry.target.id);
        });
      }
    });
  }, {
    threshold: 0.7
  });
  document.querySelectorAll('.section').forEach(function (section) {
    observer.observe(section);
  });
  document.querySelector('.header__list').addEventListener('click', function (e) {
    if (e.target.classList.contains('header__link')) {
      e.preventDefault();
      var id = getId(e.target);
      window.scrollTo({
        top: document.getElementById(id).offsetTop - 100,
        behavior: 'smooth'
      });

      if (document.querySelector('.header__burger').classList.contains('active')) {
        document.querySelector('.header__burger').classList.remove('active');
        document.querySelector('.header__menu').classList.remove('active');
      }
    }
  });
};