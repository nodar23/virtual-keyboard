// header
const header = document.createElement('header');
header.className = 'header';
header.innerHTML = '<h1 class="header__title">Virtual keyboard</h1>';
document.body.append(header);

// main
const main = document.createElement('main');
main.className = 'main';
document.body.append(main);

const input = document.createElement('div');
input.className = 'main__input';
main.appendChild(input);

const keyboard = document.createElement('div');
keyboard.className = 'main__keyboard';
main.appendChild(keyboard);

const description = document.createElement('div');
description.className = 'main__description';
main.appendChild(description);

// footer
const footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = '<h6 class="footer__text">2023 by nodar23</h6>';
document.body.append(footer);
