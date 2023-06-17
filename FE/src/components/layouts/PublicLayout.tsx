import { Layout } from 'antd'
import HeaderLayout from './HeaderLayout'
import { ReactWithChild } from 'src/interface/app'
import FooterLayout from './FooterLayout'

export default function PrivateLayout({ children }: ReactWithChild) {
  return (
    <Layout>
      <HeaderLayout />
      <Layout>
        <Layout.Content
          style={{
            padding: 100,
            margin: 0,
            minHeight: 1000
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
      <FooterLayout />
    </Layout>
  )
}
