import React from 'react';
import s from './Search.module.scss';

export const Search = () => {
  return (
    <div className={s.search}>
        <input className={s.search__input} type="text" placeholder="Search" id="" />
    </div>
  )
}
