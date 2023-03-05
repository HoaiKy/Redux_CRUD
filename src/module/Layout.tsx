import React from 'react'
import Style from "./LayoutStyle.module.css"
import GlobalNav from './GlobalNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <article className={Style.header}>
        <header>
          <h1>Wellcome</h1>
        </header>
      </article>
      <GlobalNav/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout