import React from 'react'
import { Header } from '../../components/header/Header'
import { Menu } from '../../components/menu/Menu'
import { BillBoard } from '../../components/billboard/BillBoard'
import { BookList } from '../../components/bookList/BookList'

export const Main = () => {
  return (
    <>
        <Header/>
        <Menu/>
        <BillBoard/>
        <BookList/>
    </>
  )
}
