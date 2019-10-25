window.addEventListener('load', () => {

    // Navigation Menu

    myLinks = document.querySelectorAll('header a');
    myLinks.forEach((myLink) => {
        myLink.addEventListener('click', () => {
            switch (myLink.id) {

                case 'link0':

                    document.getElementsByClassName('page1')[0].removeAttribute('style');
                    document.getElementsByClassName('page2')[0].style.display = 'none';
                    changeColorActiveLink(myLink);
                    closeMenu(document.querySelector("nav"), document.querySelector("article"));
                    break;

                case 'link1':
                    changeColorActiveLink(myLink);
                    closeMenu(document.querySelector("nav"), document.querySelector("article"));
                    break;

                case 'link2':
                    changeColorActiveLink(myLink);
                    closeMenu(document.querySelector("nav"), document.querySelector("article"));
                    break;

                case 'link3':

                    document.getElementsByClassName('page1')[0].style.display = 'none';
                    document.getElementsByClassName('page2')[0].removeAttribute('style');
                    changeColorActiveLink(myLink);
                    closeMenu(document.querySelector("nav"), document.querySelector("article"));

                    break;

                default:
                    'Error';
            }

        });
    });

    function changeColorActiveLink(myLink) {
        var listLinks = document.querySelectorAll('header a');
        listLinks.forEach((a) => {
           // console.log(a.id + " / " + myLink.id);
            if (a.id == myLink.id) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }


    // Navigation Between Products

    //объявление списка товаров и их реквизитов
    var nameProducts = ['Designer x', 'Designer xpro', 'Designer xl', 'Designer xlpro'],
        detailsProducts = [
            'Больше не нужно выбирать между скоростью и качеством. Экономьте время и будьте уверены в результате.',
            'В макетах готовы только дизайны страниц Главная (3dcrafter.ru/shop/) и внутренняя с 3D-принтером «Designer X».',
            'Если не понятно куда должны вести ссылки, например с иконок соц.сетей и т.п. — смотрим старый сайт и прописываем.',
            'создай ей имя по этому же принципу (например: «picaso-3d-designer-photo-1.jpg», чтобы название картинки говорило о том, что на картинке.'
        ];
    //  выделить все ссылки товара в HTML
    // Select Links from Nav (X4 Elements)
    const artNav = document.querySelectorAll('.nav a');

    // ForEach Links Elements
    // просмотреть список ссылок
    artNav.forEach((i, index) => {
        i.addEventListener('click', function () {

            // Function изменить на активное изображение
            changeActiveImage(i);

            // Function изменить фото статьи
            changeImageArticle(i);

            // Function скоординированные изменения
            changeCoordArticle(index);

            // Function Change BackgroundImage
            // Функция Изменить фоновое изображение
            changeBackGroundArticle(i);
        });
    });

    // Function изменить на активное изображение
    function changeActiveImage(i) {
        var product = document.querySelectorAll(".nav a");
        product.forEach((p) => {
            if (p.id == i.id) {
                p.firstElementChild.src = 'imgs/' + p.id + '-b-Active.svg';
            } else {
                p.firstElementChild.src = 'imgs/' + p.id + '-b.svg';
            }
        });
    }

    // Function изменить фото статьи
    function changeImageArticle(i) {
        var image = document.querySelector(".image img");
        image.src = 'imgs/' + i.id + '.png';
        // анимационное изображение
        image.style.animation = 'slideProduct .6s both';
        // удалить атрибут стиля
        const removeStyle = function () {
            image.removeAttribute('style');
            image.removeEventListener('animationend', removeStyle);
        };
        image.addEventListener('animationend', removeStyle);
    }

    // Function Change BackGround Article
    function changeBackGroundArticle(i) {
        var myBack = document.querySelector('.page1');
        myBack.style.backgroundImage = "url('imgs/back-bukv-" + i.id + ".png')";
       // console.log("back-bukv-" + i.id + ".png");
    }

    // Function скоординированные изменения
    function changeCoordArticle(index) {
        var title = document.querySelector('.coord h1'),
            details = document.querySelector('.coord p');
        title.textContent = nameProducts[index];
        details.textContent = detailsProducts[index];
    }

});


// icon (bars) Mobile Version - Animate Menu
// мобильная версия - по щелчку - показать список меню
document.querySelector('.icon').onclick = function () {

    var myNav = document.querySelector("nav"),
        myArt = document.querySelector("article");

    if (myNav.classList.contains("open")) {
       
        closeMenu(myNav, myArt);
        
    } else {
        // Animate Nav open
        myNav.classList.remove("close");
        myNav.classList.add("open");
        // Animate Article open
        myArt.classList.remove("closeNav");
        myArt.classList.add("openNav");
        setTimeout(function(){myNav.style.zIndex = 1}, 500);

    }
};

function closeMenu(myNav, myArt) {
    myNav.removeAttribute('style');
    setTimeout(function(){
       // Animate Nav close
    myNav.classList.remove("open");
    myNav.classList.add("close");
    // Animate Article close
    myArt.classList.remove("openNav");
    myArt.classList.add("closeNav");
    }, 300);
}

// Modal Area (заказать)

//from page1
document.getElementById('order1').onclick = function () {

    modalOrder();

};

//from page2
document.getElementById('order2').onclick = function () {

    modalOrder();

};

function modalOrder() {

    var myModal = document.getElementById('modal');

    // заказать открыть
    myModal.style.display = null;
    myModal.removeAttribute('aria-hidden');
    myModal.setAttribute('aria-modal', 'true');
    // установить фокус на первый элемент
    document.querySelector('input').focus();

    // заказать закрывать нажав на значок X
    document.getElementById('closeModal').addEventListener('click', () => {
        closeModal()
    });

    // Закрыть Модал на Keydown 'Escape'
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeModal();
        }
        // для фокусировки оставайтесь в модале
        if (e.key === 'Tab') {
            focusInModal(e);
        }
    });

    // Function заказать закрывать  
    function closeModal() {

        myModal.setAttribute('aria-hidden', 'true');
        myModal.removeAttribute('aria-modal');
        document.querySelector('button').focus();

        // функция ожидания конца анимации перед выходом из модального
        const hideModal = function () {
            myModal.style.display = "none";
            modal.removeEventListener('animationend', hideModal);
        };
        modal.addEventListener('animationend', hideModal);

    }
    const focusableSelector = 'input, textarea';
    var focusables = Array.from(modal.querySelectorAll(focusableSelector));

    // Function фокус в модальном
    function focusInModal(e) {
        e.preventDefault();
        var index = focusables.findIndex(f => f === modal.querySelector(':focus'));
        // console.log(index);
        if (e.shiftKey === true) {
            // если пользователь нажимает Shift & Tab => фокус -1
            index--;
        } else {
            // если только нажатo TAB => фокус +1
            index++;
        }

        if (index >= focusables.length) {
            index = 0;
        }
        if (index < 0) {
            index = focusables.length - 1;
        }
        focusables[index].focus();

    }


}


