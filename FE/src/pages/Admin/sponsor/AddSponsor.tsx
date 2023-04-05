import { Link } from 'react-router-dom'
import { ERROR_MESSAGE, urlRegex } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'

import { Button, Card, Col, Form, Input, Row, Typography, Upload } from 'antd'
import HeaderPage from 'src/components/common/HeaderPage'
import AdminGuard from 'src/guard/AdminGuard'

import styles from './styles.module.scss'
import { useResponsive } from 'src/shared/hook'
import { UploadOutlined } from '@ant-design/icons'

export default function CreateSponsor() {
  const { isDesktop } = useResponsive()

  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    const imageEl: any = document.getElementById('preview-image')
    let file: any = event.target.files ? event.target.files[0] : null
    if (file && imageEl) {
      const reader = new FileReader()
      reader.onload = function () {
        imageEl.src = reader.result
        imageEl.style.display = 'block'
      }
      reader.onerror = function () {
        imageEl.style.display = 'none'
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AdminGuard>
      <HeaderPage
        title='Sponsors'
        breadcrumbList={[
          {
            title: <Link to={PATH_URL.sponsors}>Sponsors</Link>
          },
          {
            title: <Link to={`${PATH_URL.sponsors}/create`}>Add Sponsor</Link>
          }
        ]}
      />
      <Card>
        <Row className='mb-2'>
          <Typography.Title level={4} className='mb my-0'>
            Add New Sponsor
          </Typography.Title>
        </Row>
        <Form
          className={styles.formWrapper}
          name='sponsorForm'
          layout={isDesktop ? 'horizontal' : 'vertical'}
          labelCol={{ md: 3 }}
          wrapperCol={{ span: 24 }}
          rootClassName='mx-auto'
          style={{ maxWidth: 900 }}
          // {/* onFinish={onFinish}
          // onFinishFailed={onFinishFailed} */}
          autoComplete='off'
        >
          <Form.Item label='Avatar' name='image' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
            <div className='ant-form-item-control-input-content'>
              <input accept='image/*' type='file' id='sponsorForm_image' onChange={handlePreviewImg} />
            </div>
            <div className='ant-form-item-control-input-content'>
              <img
                id='preview-image'
                src='#'
                alt='Sponsor avatar'
                width='200px'
                height='200px'
                style={{ objectFit: 'cover', display: 'none' }}
              />
            </div>
          </Form.Item>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
            <Input />
          </Form.Item>

          <Form.Item label='Description' name='description'>
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label='Website'
            name='infor_url'
            rules={[{ pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Button' className={styles['form-item__label--invisible']}>
            <Row align='middle' justify='center' gutter={[16, 16]}>
              <Col>
                <Button type='default' htmlType='reset'>
                  Clear
                </Button>
              </Col>
              <Col>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form.Item>
          {/* </Row> */}
        </Form>
      </Card>
    </AdminGuard>
  )
}
