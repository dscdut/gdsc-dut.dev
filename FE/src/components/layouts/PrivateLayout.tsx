import { Layout, Menu } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactWithChild } from 'src/interface/app'
import { SIZEBAR_OPTIONS } from 'src/shared/constant'

export default function PrivateLayout({ children }: ReactWithChild) {
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState(
    SIZEBAR_OPTIONS.find((_item) => location.pathname.startsWith(_item.path))?.key || 'members'
  )

  useEffect(() => {
    const path = SIZEBAR_OPTIONS.find((_item) => location.pathname.startsWith(_item.path))?.key
    if (path) setSelectedKey(path)
  }, [location])

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Layout.Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['members']}
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            {SIZEBAR_OPTIONS.map((item) => (
              <Menu.Item key={item.key} onClick={(event) => setSelectedKey(item.key)}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
