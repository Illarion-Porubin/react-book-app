import { Theme } from '../types/types';

export function changeCssRootVariables(theme: Theme ) {
  const root = document.querySelector(':root') as HTMLElement;

  const components = [
    `dop-text-color`,
    `main-text-color`,
    `small-text-color`,
    `background-text-color`,
    `background-color`,
    `billboard-color-one`,
    `billboard-color-two`,
    `billboard-color-three`,
    `billboard-color-four`,
    `search-border-color`,
    `search-text-color`,
    `background-header-color`,
    `background-book-color`,
  ]

  components.forEach(component => {
    root.style.setProperty(
      `--${component}-default`, 
      `var(--${component}-${theme})`
      );
  });
}