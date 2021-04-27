$('.slider-banner__row').slick({
    slidesToShow: 1,
    slidesToScroll:1,
    prevArrow: false,
    nextArrow: false,
    autoplay: true,
    autoplaySpeed: 5000
})

$('.slider__row').slick({
    slidesToShow: 1,
    slidesToScroll:1,
    prevArrow: false,
    nextArrow: false,
    dots : true
})


$('.spoiler-block__title').click(function(event) {
    if($('.spoiler-block').hasClass('one')){
        $('.spoiler-block__title').not($(this)).removeClass('active');
        $('.spoiler-block__text').not($(this).next()).slideUp(500);
    }
    $(this).toggleClass('active').next().slideToggle(500);
})


const burger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');

burger.onclick = () =>{
    headerMenu.classList.toggle('active');
    burger.classList.toggle('active');
}

const form = document.querySelector('.form');
//clear inputs of form

form.onclick = (event) =>{
    let target = event.target;
    
    if (!target.classList.contains('form__input')) return;

    if (target.classList.contains('name')) target.value = '';
    else if(document.querySelector('.name').value == "") document.querySelector('.name').value = "Фамилия, имя и отчество*";
    
    if (target.classList.contains('mail')) target.value = '';
    else if(document.querySelector('.mail').value == "") document.querySelector('.mail').value = 'E-mail*';

    if (target.classList.contains('mess')) target.value = '';
    else if(document.querySelector('.mess').value == "") document.querySelector('.mess').value = 'Сообщение';
}

