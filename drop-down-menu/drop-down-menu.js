import { default as HamburgerBtn } from './hamburger-btn';

const d = document;

export default function Component() {
  const container = d.createElement('div');
  container.classList.add('container');
  container.classList.add('drop-down-container');

  const menu = d.createElement('menu');
  menu.classList.add('drop-down-menu');
  menu.classList.add('hideable');
  menu.innerHTML = `
    <li class="menu-item"><a href="#">Home</a></li>
    <li class="menu-item"><a href="#">Section A</a></li>
    <li class="menu-item"><a href="#">Section B</a></li>
    <li class="menu-item"><a href="#">Section C</a></li>
    <li class="menu-item"><a href="#">Contact</a></li>
  `;

  container.appendChild(menu);

  container.appendChild(HamburgerBtn());

  return container;
}
