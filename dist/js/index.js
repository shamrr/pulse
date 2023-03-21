$(document).ready(function(){
    $('.carousel__wrapper').slick({
        adaptiveHeight: false,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.png" alt="arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.png" alt="arrow"></button>',
    });

    $('[data-modal=consultation]').on(('click'), function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.catalog-item__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.modal__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    })

    $('.modal__close').on(('click'), function(){
        $('.overlay, #consultation, #order').fadeOut('slow');
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    $('.catalog-item__back').each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    function validateForm(form){
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: "Пожалуйста, введите ваше имя",
                phone: "Пожалуйста, введите ваш номер телефона",
                mail: {
                    required: "Пожалуйста введите ваш email",
                    email: "Неправильно введен адрес почты",
                },
            }
        });
    }
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');
    $('input[name=phone]').mask('+999 (99) 999-99-99');
    
    // $('form').submit(function(e) {
    //     e.preventDefault();//отменяем стандартное поведение браузера

    //     if(!$(this).valid()){
    //         return;
    //     }

    //     $.ajax({
    //         type: "POST",
    //         url: "mailer/smart.php",
    //         data: $(this).serialize()
    //     }).done(function (){
    //         $(this).find("input").val("");
    //         $('#consultation, #order').fadeOut();
    //         $('.overlay, #gratitude').fadeIn('slow');

    //         $('form').trigger('reset');
    //     });

    //     return false;
    // })

    //scroll

    $(window).scroll(function() {
        if($(this).scrollTop() > 1600){
            $('.pageUp').fadeIn();
        } else {
            $('.pageUp').fadeOut();
        }
    });
});
