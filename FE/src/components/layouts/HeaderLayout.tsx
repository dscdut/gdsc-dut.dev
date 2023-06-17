import { Button, Dropdown, Image, Layout, Menu, MenuRef } from 'antd'

import { Content, Header } from 'antd/es/layout/layout'

import { useEffect, useRef, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { ReactWithChild } from 'src/interface/app'

import { HEADER_OPTIONS } from 'src/shared/constant'

import { useResponsive } from 'src/shared/hook'

import { DownOutlined, MenuOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'

export default function HeaderLayout({ children }: ReactWithChild) {
  const location = useLocation()

  const { isDesktop } = useResponsive()

  const [isCollapsed, setIsCollapsed] = useState(false)

  const [selectedKey, setSelectedKey] = useState<string>('home')

  useEffect(() => {
    setIsCollapsed(!isDesktop)
  }, [isDesktop])

  useEffect(() => {
    const key = HEADER_OPTIONS.find((item) => location.pathname === item.path)?.key as string

    if (key) {
      setSelectedKey(key)
    }
  }, [location])

  const inputRef = useRef<MenuRef>(null)

  useEffect(() => {
    const input = inputRef.current

    if (input) {
      input.focus()
    }
  }, [])

  const menuItems = HEADER_OPTIONS.map((item, index) => ({
    ...item,

    label: <Link to={item.path}>{item.label}</Link>
  }))

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img
            src='https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_3,f_auto,g_center,h_175,q_auto:good,w_175/v1/gcs/platform-data-dsc/events/dsc_icon_YcH3iFJ.png'
            alt='GDSC'
          />

          <p>GDSC-DUT</p>
        </div>

        {isDesktop ? (
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['home']}
            selectedKeys={[selectedKey]}
            style={{ lineHeight: '64px' }}
          >
            {menuItems.map((item, index) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        ) : (
          <Dropdown
            overlay={
              <Menu>
                {menuItems.map((item, index) => (
                  <Menu.Item key={item.key}>
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            }
            trigger={['click']}
          >
            <Button type='primary' className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
              Menu <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </Header>
    </Layout>
  )
}
