import { Layout } from 'antd'
import HeaderLayout from './HeaderLayout'
import { ReactWithChild } from 'src/interface/app'
import FooterLayout from './FooterLayout'
import styles from './styles.module.scss'

export default function PublicLayout({ children }: ReactWithChild) {
  return (
    <Layout>
      <HeaderLayout />
      <Layout>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
      <FooterLayout />
    </Layout>
  )
}
