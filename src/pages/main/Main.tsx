import React from 'react'
import { Header } from '../../components/header/Header'
import { Menu } from '../../components/menu/Menu'
import { BillBoard } from '../../components/billboard/BillBoard'
import { BookList } from '../../components/bookList/BookList'
import { Footer } from '../../components/footer/Footer'

export const Main = () => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  return (
    <>
        <Header/>
        <Menu/>
        <BillBoard/>
        <BookList />
        {/* <Footer/> */}
    </>
  )
}
