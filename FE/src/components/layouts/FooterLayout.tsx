import { FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd/es/grid'
import styles from './styles.module.scss'
import { Footer } from 'antd/es/layout/layout'

export default function FooterLayout() {
  return (
    <Footer className={styles.footer}>
      <Row className={styles.content}>
        <Col span={6}>
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
        <Col span={12}>
          <Row style={{ justifyContent: 'end' }}>
            <Col span={8} className={styles.menu}>
              <ul>
                <li>Home</li>
                <li>Department</li>
                <li>Events</li>
                <li>Products</li>
                <li>Activities 1</li>
              </ul>
            </Col>
            <Col span={8} className={styles.menu}>
              <ul>
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
        <Col span={8} style={{ textAlign: 'center', fontSize: 20 }}>
          <a href='facebook.com'>
            <FacebookOutlined />
          </a>
          <a href='instagram.com' style={{ margin: 10 }}>
            <InstagramOutlined />
          </a>
          <a href='linkedin.com'>
            <LinkedinOutlined />
          </a>
        </Col>
        <Col span={8} style={{ textAlign: 'end' }}>
          <a href='mailto:gdsc.dut@gmail.com' style={{ color: 'white' }}>
            gdsc.dut@gmail.com
          </a>
        </Col>
      </Row>
    </Footer>
  )
}
