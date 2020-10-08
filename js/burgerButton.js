const header_principal = document.querySelector('.header-principal')
const burgerButton = document.querySelector('#burger-menu')
const burgerButtonActive = document.querySelector('.burger-button')
const link = document.querySelectorAll('.nav-item')
const tablet = window.matchMedia('screen and (max-width:767px)')

//recorre todo los items de link, agregamos esta funcion a el prototipe
NodeList.prototype.addEventListener = function (event_name, callback, useCapture)
{
    for (var i = 0; i <this.length; i++)
    {
        this[i].addEventListener(event_name, callback, useCapture)
    }
}
NodeList.prototype.removeEventListener = function (event_name, callback, useCapture)
{
    for (var i = 0; i <this.length; i++)
    {
        this[i].removeEventListener(event_name, callback, useCapture)
    }
}


function validation (event)
{
    if (event.matches)
    {
        burgerButton.addEventListener('click', hideShow)
        link.addEventListener('click', hideShow)
    } else 
    {
        burgerButton.removeEventListener('click', hideShow)
        link.removeEventListener('click', hideShow)
    }
}

function hideShow ()
{
    if (header_principal.classList.contains('is-active'))
    {
        header_principal.classList.remove('is-active')
    } else
    {
        header_principal.classList.add('is-active')
    }

    if (burgerButton.classList.contains('is-active'))
    {
        burgerButton.classList.remove('is-active')
    } else
    {
        burgerButton.classList.add('is-active')
    }
}

tablet.addListener(validation)
validation(tablet)