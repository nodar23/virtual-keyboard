// header
const header = document.createElement('header');
header.className = 'header';
header.innerHTML = '<h1 class="header__title">Virtual keyboard</h1>';
document.body.append(header);

// main
const main = document.createElement('main');
main.className = 'main';
document.body.append(main);

const description = document.createElement('div');
description.className = 'main__description';
description.innerHTML = '<h3 class="main__description-text">based on Mac OS</h3>';
main.appendChild(description);

const textarea = document.createElement('textarea');
textarea.className = 'main__textarea';
main.appendChild(textarea);

const keyboard = {
  elements: {
    main: null,
    container: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.main.classList.add('main__keyboard');

    this.elements.container = document.createElement('div');
    this.elements.container.classList.add('main__keyboard-keys');
    this.elements.container.appendChild(this.createKeys());
    this.elements.keys = this.elements.container.querySelectorAll('.main__keyboard-key');

    this.elements.main.appendChild(this.elements.container);
    main.appendChild(this.elements.main);

    document.querySelectorAll('.main__textarea').forEach((el) => {
      el.addEventListener('focus', () => {
        this.open(el.value, (currentValue) => {
          // eslint-disable-next-line no-param-reassign
          el.value = currentValue;
        });
      });
    });
    textarea.focus();
  },
  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', ' | ', 'enter',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'space'];

    const createIconHTML = (iconName) => `<p>${iconName}</p>`;
    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'enter', '?', ']'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('main__keyboard-key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('main__keyboard-key--big');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });

          break;

        case 'caps':
          keyElement.classList.add('main__keyboard-key--big', 'main__keyboard-key--activatable');
          keyElement.innerHTML = createIconHTML('capslock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('main__keyboard-key--active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('main__keyboard-key--big');
          keyElement.innerHTML = createIconHTML('enter');

          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });

          break;

        case 'space':
          keyElement.classList.add('main__keyboard-key--very-big');
          keyElement.innerHTML = createIconHTML('(^˵◕ω◕˵^)');

          keyElement.addEventListener('click', () => {
            this.properties.value += ' ';
            this.triggerEvent('oninput');
          });

          break;

        case 'tab':
          keyElement.classList.add('main__keyboard-key--big');
          keyElement.innerHTML = createIconHTML('tab');

          keyElement.addEventListener('click', () => {
            this.properties.value += '  ';
            this.triggerEvent('oninput');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase() : key.toLowerCase();
            this.triggerEvent('oninput');
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    // eslint-disable-next-line no-restricted-syntax
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// footer
const footer = document.createElement('footer');
footer.className = 'footer';
footer.innerHTML = '<h6 class="footer__text">2023 by nodar23</h6>';
document.body.append(footer);
