import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { Store } from 'antd/es/form/interface'

// config / constant
import { ERROR_MESSAGE, urlRegex } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { FieldData } from 'src/interface'

// custom hooks
import { useResponsive } from 'src/shared/hook'

// component
import HeaderPage from 'src/components/common/HeaderPage'
import ImageUpload from 'src/components/common/ImageUpload'
import AdminGuard from 'src/guard/AdminGuard'

// css
import styles from './styles.module.scss'

export default function CreateSponsor() {
  const navigate = useNavigate()
  let [searchParams, setSearchParams] = useSearchParams()
  const { isDesktop } = useResponsive()
  const uploadRef = useRef<any>(null)
  const formRef = useRef<FormInstance<Store>>(null)
  const [fieldsData, setFieldsData] = useState<FieldData[]>([])
  const [idSponsor, setIdSponsor] = useState<string>()
  const [form] = useForm()

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      // call API
      setIdSponsor(id)
    } else {
      navigate(`${PATH_URL.sponsors}/form`, { replace: true })
    }
  }, [])

  const onSubmit = (value: any) => {
    console.log(value)
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
            title: (
              <Link to={`${PATH_URL.sponsors}/form${idSponsor ? `?id=${idSponsor}` : ''}`}>
                {' '}
                {idSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
              </Link>
            )
          }
        ]}
      />
      <Card>
        <Row className='mb-2'>
          <Typography.Title level={4} className='!my-0'>
            {idSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
          </Typography.Title>
        </Row>
        <Form
          fields={fieldsData}
          form={form}
          className={styles.formWrapper}
          name='sponsorForm'
          layout={isDesktop ? 'horizontal' : 'vertical'}
          labelCol={{ md: 3 }}
          wrapperCol={{ span: 24 }}
          rootClassName='mx-auto'
          style={{ maxWidth: 900 }}
          onFinish={onSubmit}
          autoComplete='off'
          onFieldsChange={(_, allFields) => setFieldsData(allFields)}
        >
          <ImageUpload
            ref={uploadRef}
            label='Avatar'
            name='image'
            rules={[{ required: true, message: ERROR_MESSAGE.required }]}
            form={form}
            fieldsData={fieldsData}
          />
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
                <Button
                  type='default'
                  htmlType='reset'
                  onClick={(event) => {
                    uploadRef?.current?.onReset()
                  }}
                >
                  Clear
                </Button>
              </Col>
              <Col>
                <Button type='primary' htmlType='submit'>
                  {idSponsor ? 'Edit' : 'Submit'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </AdminGuard>
  )
}
