import React from 'react';
import s from './BurgerMenu.module.scss';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { bookSlice } from '../../redux/slices/bookSlice';
import { Theme } from '../../types/types';
import { selectBookData } from '../../redux/selectors';


export const BurgerMenu: React.FC = () => {
  const theme = useCustomSelector(selectBookData);
  const dispatch = useCustomDispatch()


  const changeTheme = React.useCallback((): void => {
    dispatch(bookSlice.actions.changeTheme(theme.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT))
  }, [theme, dispatch]);

  

  return (
    <div className={s.menu} onClick={changeTheme}>
        <span className={s.menu__burger_line}></span>
        <span className={s.menu__burger_line}></span>
        <span className={s.menu__burger_line_last}></span>
    </div>
  )
}
