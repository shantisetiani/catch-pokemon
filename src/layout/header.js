import React, { useEffect, useContext } from 'react'
import { NavLink, HashRouter } from "react-router-dom"
import { Layout, Menu, Dropdown } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import { MENU } from '../config/index'
import logo from '../assets/pokemon-logo.png'
import { TitleContext } from '../pages/index'
import { Tabs } from '../components/styled/general'


function LayoutHeader() {
  const titleContext = useContext(TitleContext);
  const pageTitle = titleContext.title
  const isDetail = pageTitle === "Pokemon Detail"

  // Handle header menu on scroll
  useEffect(() => {
    const header = document.querySelector('#header')
    const headerTop = header.offsetTop;

    function handleScroll() {
      if (window.scrollY > headerTop) {
        header.classList.add('header--onscroll')
      } else {
        header.classList.remove('header--onscroll')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [])

  // Header menu component
  const menu = (
    <Menu id="menu">
      <Menu.Item>
        <NavLink to={MENU.HOME}>Pokemon List</NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to={MENU.MY_POKEMON_LIST}>My Pokemon List</NavLink>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Layout.Header id="header">
        { !isDetail &&
          <HashRouter>
            <Dropdown overlay={menu} trigger={['click']}>
              <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <MenuOutlined />
              </a>
            </Dropdown>
          </HashRouter>
        }
        <div className="header-title">
          <span data-testid="header-title">{pageTitle}</span>
        </div>
        <img src={logo} className="header-logo" alt="logo" />
      </Layout.Header>
      { !isDetail &&
        <Tabs>
          <div className={`tabpane${pageTitle === "Pokemon List" ? " active" : ""}`}>
            <h3><NavLink to={MENU.HOME}>Pokemon List</NavLink></h3>
          </div>
          <div className="tabpane-divider"></div>
          <div className={`tabpane${pageTitle === "My Pokemon List" ? " active" : ""}`} data-testid="nav-my-pokemon-list">
            <h3><NavLink to={MENU.MY_POKEMON_LIST}>My Pokemon List</NavLink></h3>
          </div>
        </Tabs>
      }
    </div>
  )
}

export default LayoutHeader