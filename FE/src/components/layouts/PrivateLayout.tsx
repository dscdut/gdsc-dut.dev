import { Layout, Menu } from 'antd'
import { ReactWithChild } from 'src/interface/app'

const menus = [
  {
    key: 'members',
    label: 'Members'
  },
  {
    key: 'events',
    label: 'Events'
  },
  {
    key: 'sponsors',
    label: 'Sponsors'
  }
]

export default function PrivateLayout({ children }: ReactWithChild) {
  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Layout.Sider width={200}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['members']}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
          />
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
