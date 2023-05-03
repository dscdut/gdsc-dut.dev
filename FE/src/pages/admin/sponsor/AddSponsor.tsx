import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { Store } from 'antd/es/form/interface'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, urlRegex } from 'src/shared/constant'

// custom hooks
import { useResponsive } from 'src/shared/hook'

// component
import ImageUpload from 'src/components/common/ImageUpload'

// css
import { UploadRef } from 'src/interface/app'
import { Sponsor } from 'src/interface/sponsor'
import styles from './styles.module.scss'

export default function CreateSponsor() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isDesktop } = useResponsive()
  const uploadRef = useRef<UploadRef>(null)
  const formRef = useRef<FormInstance<Store>>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Sponsor>[]>([])
  const [idSponsor, setIdSponsor] = useState<string>()
  const [form] = useForm()

  useEffect(() => {
    const id = searchParams.get('id')
    console.log(id, searchParams.get('id'))
  }, [searchParams])

  const onSubmit = async (value: Sponsor) => {
    console.log(value)
  }

  return (
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
                onClick={() => {
                  console.log(form.getFieldsValue())
                  form.setFieldValue('image', null)
                  uploadRef.current?.onReset()
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
  )
}
