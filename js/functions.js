$(function(){

    /* Sistema de seleção de preço na barra de search na vitrine */

    var currentValue = 0;
    var isDrag = false;
    var preco_atual = 0;
    var preco_maximo = 70000;

    $('.pointer-barra').mousedown(function(){
        isDrag = true;
    });

    $(document).mouseup(function(){
        isDrag = false;
        enableTextSelection();
    });

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection();

            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;

            if(mouseX < 0) {
                mouseX = 0;
            }
            if(mouseX > elBase.width()) {
                mouseX = elBase.width();
            }

            $('.pointer-barra').css('left',(mouseX-13)+'px');

            currentValue = (mouseX / elBase.width()) * 100;

            $('.barra-preco-fill').css('width',currentValue+'%');

            preco_atual = (currentValue / 100) * preco_maximo;
            preco_atual = formatarPreco(preco_atual);

            $('.preco-pesquisa').html('R$ '+preco_atual);
        }
    });

    function formatarPreco() {
        preco_atual = preco_atual.toFixed(2);
        preco_arr = preco_atual.split('.');

        var novo_preco = formatarTotal(preco_arr);

        return novo_preco;
    }

    function formatarTotal(preco_arr) {
        if(preco_arr[0] < 1000) {
            return preco_arr[0]+','+preco_arr[1];
        } else if(preco_arr[0] < 10000) {
            return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
        } else {
            return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
        }
    }

    function disableTextSelection() {
        $('body').css('user-select','none');
        $('body').css('-webkit-user-select','none');
        $('body').css('-moz-user-select','none');
        $('body').css('-ms-user-select','none');
        $('body').css('-o-user-select','none');
    }

    function enableTextSelection() {
        $('body').css('user-select','auto');
        $('body').css('-webkit-user-select','auto');
        $('body').css('-moz-user-select','auto');
        $('body').css('-ms-user-select','auto');
        $('body').css('-o-user-select','auto');
    }

    /* Sistema de slide na página de venda individual */

    var maxIndex = Math.ceil($('.mini-img-wrapper').length/3) - 1;
    var curIndex = 0;

    initSlider();
    navigateSlider();
    clickSlider();

    function initSlider() {
        var amt = $('.mini-img-wrapper').length * 33.3;
        var elScroll = $('.nav-galeria-wrapper');
        var elSingle = $('.mini-img-wrapper');

        elScroll.css('width',amt+'%');
        elSingle.css('width',33.3*(100/amt)+'%');
    }

    function navigateSlider() {
        $('.arrow-right-nav').click(function(){
            if(curIndex < maxIndex) {
                curIndex++;
                
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;

                $('.nav-galeria').animate({'scrollLeft': elOff+'px'});
            }
        });

        $('.arrow-left-nav').click(function(){
            if(curIndex > 0) {
                curIndex--;
                
                var elOff = $('.mini-img-wrapper').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;

                $('.nav-galeria').animate({'scrollLeft': elOff+'px'});
            }
        });
    }

    function clickSlider() {
        $('.mini-img-wrapper').click(function(){
            $('.mini-img-wrapper').css('background-color','transparent');
            $(this).css('background-color','rgb(200,200,200)');

            var img = $(this).children().css('background-image');

            $('.foto-destaque').css('background-image',img);
        });

        $('.mini-img-wrapper').eq(0).click();
    }

    /* Link para sessão de contato na página */

    $('[goto = contato]').click(function(){
        $('nav a').css('color','black');
        $(this).css('color','#EB2D2D');

        $('html, body').animate({'scrollTop': $('#contato').offset().top});
        return false;
    });

    /* Menu responsivo */

    $('.mobile').click(function(){
        $(this).find('ul').slideToggle();
    });

    /* Sistema de navegação do index.html depoimentos */

    var amtDepoimento = $('.depoimentos-single p').length;
    var curIndex = 0;

    iniciarDepoimentos();
    navegarDepoimentos();

    function iniciarDepoimentos() {
        $('.depoimentos-single p').hide();
        $('.depoimentos-single p').eq(0).show();
    }

    function navegarDepoimentos() {
        $('[prev]').click(function(){
            curIndex--;
            
            if(curIndex < 0) {
                curIndex = amtDepoimento - 1;
            }

            $('.depoimentos-single p').hide();
            $('.depoimentos-single p').eq(curIndex).show();
        });

        $('[next]').click(function(){
            curIndex++;
            
            if(curIndex >= amtDepoimento) {
                curIndex = 0;
            }

            $('.depoimentos-single p').hide();
            $('.depoimentos-single p').eq(curIndex).show();
        });
    }
    
});