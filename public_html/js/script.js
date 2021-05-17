
const imessage = document.querySelector(".imessage__body");


//точки во время печати
const printingDots = (from, remove) =>{
    if(remove != 'remove'){
        let  elem = document.createElement("div");
        elem.classList.add(`imessage__${from}`);
        for(let i= 0; i<3; i++){
            let elemText = document.createElement('p');
            elemText.classList.add('printing-dot'); 
            elem.appendChild(elemText);  
        }
        imessage.appendChild(elem);
        elem.classList.add('printing');
        document.querySelector(".imessage").scrollTo(0, document.body.scrollHeight);  
    }else {
        if(document.querySelectorAll('.printing').length > 0) document.querySelector('.printing').remove();
    }
    
}

//стрелка указатель
const upArrow = (i, remove) => {
    if(remove != 'remove'){
        let  elem = document.createElement("div");
        elem.classList.add('up-arrow');
        document.querySelectorAll('.header__link')[i].appendChild(elem);
    }else {
        if(document.querySelector('.up-arrow'))  document.querySelector('.up-arrow').remove();
    }
}


const newMessage = (from) =>{
    let  elem = document.createElement("div");
    elem.classList.add(`imessage__${from}`);
    imessage.appendChild(elem);
}

let countUser = 0;
let countMe =0;

//вывод сообщений пользователя
const printMessageFromUser = (from, text) =>{
    if(text == '') return
    from[countUser].classList.remove('printing');
    from[countUser].classList.add('printed');
    from[countUser].innerHTML = text;
    countUser++;
    inputMess.value = null;
    printingLength = 0;
    hello();
}

//вывод сообщений от меня
const printMessageFromMe = (from, text) =>{
    from[countMe].classList.remove('printing');
    from[countMe].classList.add('printed');
    from[countMe].innerHTML = text;
    countMe++;
}


const inputMess = document.querySelector('.input-mess');
let printingLength = 0;

//ввод сообщений пользователя

inputMess.onclick = (e) =>{
    inputMess.onkeydown = (e) =>{
        if(e.keyCode == 8) {
            printingLength--;
            if (printingLength == -1) printingLength = 0;
        }
        else printingLength++;  
        let fromUser = document.querySelectorAll('.imessage__from-user');
        if(printingLength > 0){
            if(document.querySelectorAll('.printing').length == 0) printingDots('from-user', '');
            document.querySelector(".imessage").scrollTo(0, document.body.scrollHeight);  
            if(e.keyCode == 13 && inputMess.value != ''){
                printMessageFromUser(fromUser, inputMess.value);
            } 
        }else{
            printingDots('from-user','remove'); 
        } 
    }
}

//приветствие
const hello = () =>{
    const prT = t => new Promise(res => setTimeout(res, t));
    if(document.querySelectorAll('.imessage__from-user').length == 0){
        prT(1000)
        .then(() => {
            printingDots('from-me','');
            return prT(2000);
        })
        .then(() => {
            fromMe = document.querySelectorAll('.imessage__from-me');
            printMessageFromMe(fromMe, 'Привет, меня зовут Семён и я начинающий веб-разработчик.'); 
            printingDots('from-me','remove');
            return prT(2000);
        })
        .then(() => {
            printingDots('from-me','');
            return prT(2000);
        })
        .then(() => {
            fromMe = document.querySelectorAll('.imessage__from-me');
            printMessageFromMe(fromMe, 'Хочу показать и рассказать тебе немного того, что я умею.'); 
            
            return prT(1000);
        })
        .then(() => {
            printingDots('from-me','');
            return prT(1900);
        })
        .then(() => {
            fromMe = document.querySelectorAll('.imessage__from-me');
            printMessageFromMe(fromMe, 'Если тебе интересно, то дай знать.'); 
            
        })
    }
    else if(countMe == 3){
        prT(1000)
        .then(() => {
            printingDots('from-me','');
            return prT(1500);
        })
        .then(() => {
            fromMe = document.querySelectorAll('.imessage__from-me');
            printMessageFromMe(fromMe, 'Чтобы увидеть мое резюме, просто нажми на вклудку "Обо мне", или напиши что-нибудь в ответ.');
            return prT(2000);
        })
        .then(() => {
            upArrow(1,''); 
            return prT(2000);
        })
    } else if(countMe == 4){
            prT(1000)
        .then(() => {
            upArrow(1,'remove'); 
            $('.slider').slick('slickGoTo', 1);
            countMe++;
            return prT(1000);
        })
    } else if(countMe == 5){
        prT(1000)
        .then(() => {
            countMe--;
            printingDots('from-me','');
            return prT(1500);
        })
        .then(() => {
            fromMe = document.querySelectorAll('.imessage__from-me');
            printMessageFromMe(fromMe, 'Чтобы посмотреть мои работы, нажми на вкладу "Портфолио", или напиши что-нибудь в ответ.');
            return prT(2000);
        })
        .then(() => {
            upArrow(2,''); 
            countMe = 6;
            return prT(2000);
        })
    }  else if(countMe == 6){
            prT(1000)
        .then(() => {
            upArrow(1,'remove'); 
            $('.slider').slick('slickGoTo', 2);
            countMe++;
            return prT(1000);
        })
    }

}
// hello();

//меню бургер
const burger = document.querySelector('.header__burger');

burger.onclick = () =>{
    document.querySelector('.header__menu').classList.toggle('active');
    burger.classList.toggle('active');
}


//slider

if ($('.slider').length){
    $('.slider').slick({
        arrows: false,
        dots : true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false
    });
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.header__link').removeClass('active')
        $('.header__link').eq(nextSlide).addClass('active');
        upArrow(0,'remove'); 
    });
    $('.header__link').click((e) => {
        e.preventDefault();
        const id = $(e.target).attr("href").replace('#', '')
        $('.slider').slick('slickGoTo', id);
        $('.header__menu').removeClass('active');
        $('.header__burger').removeClass('active');
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });
} 

//отправка формы
 

$('#form').submit((e) => {
    e.preventDefault();

    let th = $(this);
    let btn = $('.form__button');
    th.addClass('_sending');

    $.ajax({
        url:'foo.php',
        type:'POST',
        data: th.serialize(),
        success: (data) => {
            if (data == 1){
                th.removeClass('_sending');  
                console.log('Ошибка млять'); 
                return false;
            }
            th.removeClass('_sending');   
            console.log('success');
        }, 
        error: () =>{
            th.removeClass('_sending');  
            console.log('error')
        }
    })
})


// const form = document.getElementById('form');
  
// form.addEventListener('submit', formSending); 


// async function formSending(e){
//     e.preventDefault();
    
//     let error = formValidate(form)
    
//     let formData = new FormData(form); 
    
//     if (error == 0){
//         console.log(formData)
//         form.classList.add('_sending')
//         let response = await fetch('sendmail.php', {
//             method: 'POST',
//             body: formData 
//         });
//         if (response.ok){
//             console.log('Готово!'); 
//             form.reset();
//             form.classList.remove('_sending')
//         } else{
//             console.log('Ошибка при отправке формы')
//             form.classList.remove('_sending')
//         }
//     } else if (error == 1){
//         console.log('Некорректный Email')
//     } else {
//         console.log('Заполните поля.')
//     }
// }


// const formValidate = (form) =>{
//     let error = 0;
//     let formReq = document.querySelectorAll('._req');
    
//     for (let i = 0; i < formReq.length; i++){
//         const input = formReq[i];
//         formRemoveError(input);

//         if (input.value == ''){
//             formAddError(input);
//             error++
//         }
//         if (formReq[i].classList.contains('_email')) {
//             if(validateEmail(input)){
//                 formAddError(input);
//                 error++;
//             }
//         }
//     }
//     return error
// }

// const formAddError = (input) =>{
//     input.parentElement.classList.add('_error');
//     input.classList.add('_error');
// }
// const formRemoveError = (input) =>{
//     input.parentElement.classList.remove('_error');
//     input.classList.remove('_error');
// }

// const validateEmail = (input) =>{
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
// }

