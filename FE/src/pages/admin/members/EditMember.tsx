import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, emailRegex, phoneRegex, urlRegex } from 'src/shared/constant'

// component
import ImageUpload from 'src/components/common/ImageUpload'

// css
import { UploadRef } from 'src/interface/app'
import { Member } from 'src/interface/member'
import styles from './styles.module.scss'
import GensSelector from 'src/components/selectors/GensSelector'
import DepartmentsSelector from 'src/components/selectors/DepartmentsSelector'
import PositionsSelector from 'src/components/selectors/PositionsSelector'

export default function CreateMember() {
  const [searchParams] = useSearchParams()
  const uploadRef = useRef<UploadRef>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Member>[]>([])
  const [idMember] = useState<string>()
  const [form] = useForm()

  const validateField = (regex: RegExp) => (rule: any, value: string, callback: (arg?: string) => void) => {
    if (!value) {
      callback(ERROR_MESSAGE.required)
    } else if (!regex.test(value)) {
      callback(ERROR_MESSAGE.invalid)
    } else {
      callback()
    }
  }
  const validatePhone = validateField(phoneRegex)
  const validateEmail = validateField(emailRegex)

  useEffect(() => {
    const id = searchParams.get('id')
    console.log(id, searchParams.get('id'))
  }, [searchParams])

  const onSubmit = async (value: Member) => {
    console.log(value)
  }

  return (
    <Card>
      <Row className='mb-2'>
        <Typography.Title level={4} className='!my-0'>
          {idMember ? 'Edit Member' : 'Create a new core team member'}
        </Typography.Title>
      </Row>
      <Form
        fields={fieldsData}
        form={form}
        className={styles.formWrapper}
        name='MemberForm'
        layout='vertical'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        onFinish={onSubmit}
        autoComplete='off'
        onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <Row gutter={[24, 24]}>
          <Col md={24} lg={6}>
            <ImageUpload
              label='Avatar'
              ref={uploadRef}
              name='image_url'
              rules={[{ required: true, message: ERROR_MESSAGE.required }]}
            />
          </Col>

          <Col md={24} lg={18}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={24}>
                <Form.Item
                  label='Full Name'
                  name='full_name'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[{ validator: validatePhone, required: true }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item
                  label='Birthday'
                  name='birthday'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <DatePicker className='h-full w-full' />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item
                  label='Gen'
                  name='gen_id'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <GensSelector />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ validator: validateEmail, required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Link facebook/ instagram'
              name='infor_url'
              rules={[{ pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label='Position'
              name='position_id'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <PositionsSelector />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Deparment'
              name='deparment_id'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <DepartmentsSelector />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='Horoscope'
          name='horoscope_sign'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Motto/ Favorite Saying'
          name='philosophy'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label='Feelings'
          name='feelings'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input.TextArea className='!h-44' />
        </Form.Item>

        <Form.Item label='Button' className={styles['form-item__label--invisible']}>
          <Row align='middle' justify='center' gutter={[16, 16]}>
            <Col span={24}>
              <Row justify='center'>
                <Col className='text-center'>
                  <Button
                    type='default'
                    htmlType='reset'
                    onClick={() => {
                      console.log(form.getFieldsValue())
                      form.setFieldValue('image', null)
                      uploadRef.current?.onReset()
                    }}
                    className='mx-2'
                  >
                    Clear
                  </Button>
                </Col>
                <Col className='text-center'>
                  <Button type='primary' htmlType='submit' className='mx-2'>
                    {idMember ? 'Edit' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
