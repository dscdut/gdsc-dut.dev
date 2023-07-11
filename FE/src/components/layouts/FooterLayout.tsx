import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd/es/grid'
import styles from './styles.module.scss'
import { Footer } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

export default function FooterLayout() {
  return (
    <Footer className={styles.footer}>
      <Row className={styles.footerContent}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <div className={styles.logo}>
            <img
              src='https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_3,f_auto,g_center,h_175,q_auto:good,w_175/v1/gcs/platform-data-dsc/events/dsc_icon_YcH3iFJ.png'
              alt='GDSC'
            />
            <p>GDSC-DUT</p>
          </div>
          <div>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row className={styles.menuRow} justify='end'>
            <Col xs={12} sm={12} md={8} lg={8} xl={8} className={styles.menu}>
              <h3 className={styles.menuTitle}>Menu 1</h3>
              <ul className={styles.menuList}>
                <li>Home</li>
                <li>Department</li>
                <li>Events</li>
                <li>Products</li>
                <li>Activities 1</li>
              </ul>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8} className={styles.menu}>
              <h3 className={styles.menuTitle}>Menu 2</h3>
              <ul className={styles.menuList}>
                <li>Home</li>
                <li>Department</li>
                <li>Events</li>
                <li>Products</li>
                <li>Activities</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className={styles.footerBottom}>
        <Col span={8}>
          <p>Powered by GDSC-DUT</p>
        </Col>
        <Col span={8} className={styles.socialIcons}>
          <Link to='https://facebook.com' className={styles.socialLink}>
            <FacebookOutlined />
          </Link>
          <Link to='https://instagram.com' className={styles.socialLink}>
            <InstagramOutlined />
          </Link>
          <Link to='https://linkedin.com' className={styles.socialLink}>
            <LinkedinOutlined />
          </Link>
        </Col>
        <Col span={8} className={styles.emailLink}>
          <a href='mailto:gdsc.dut@gmail.com' className={styles.emailLinkText}>
            gdsc.dut@gmail.com
          </a>
        </Col>
      </Row>
    </Footer>
  )
}
