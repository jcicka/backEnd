const botonAbrirMenu = document.querySelector('.menu_icon');
const menu = document.querySelector('#menu_nav');
const oferta = document.querySelector('.oferta');


// document.addEventListener('DOMContentLoaded', () => {
//     setTimeout(() => {
//         oferta.classList.add('active_oferta')
//     }, 1000);
//
//     setTimeout(() => {
//         oferta.classList.remove('active_oferta')
//     }, 8000);
// })

botonAbrirMenu.addEventListener('click', (ev) => {
    menu.classList.toggle('active');

    if (menu.classList.contains('active')){
        window.addEventListener('touchmove', cancelarEvento, { passive: false });
    }else{
        window.removeEventListener('touchmove', cancelarEvento);
    }
})


function cancelarEvento(ev){
    ev.preventDefault();
}