import { Theme } from '../types/types';

export function changeCssRootVariables(theme: Theme ) {
  const root = document.querySelector(':root') as HTMLElement;

  const components = [
    `text-color`
  ]

  components.forEach(component => {
    root.style.setProperty(
      `--${component}-default`, 
      `var(--${component}-${theme})`
      );
  });
}