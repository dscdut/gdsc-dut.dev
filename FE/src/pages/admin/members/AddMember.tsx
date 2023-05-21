import { Button, Card, Col, ColProps, DatePicker, Form, Input, Row, Typography } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { Store } from 'antd/es/form/interface'
import { ReactNode, useEffect, useRef, useState } from 'react'
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
import { Member } from 'src/interface/member'
import styles from './styles.module.scss'
import GensSelector from 'src/components/selectors/GensSelectors'
import PositionsSelector from 'src/components/selectors/PositionsSelector'
import DeparmentsSelctor from 'src/components/selectors/DeparmentsSelector'

export default function CreateMember() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isDesktop } = useResponsive()
  const uploadRef = useRef<UploadRef>(null)
  const formRef = useRef<FormInstance<Store>>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Member>[]>([])
  const [idMember, setIdMember] = useState<string>()
  const [form] = useForm()

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
        layout={isDesktop ? 'horizontal' : 'vertical'}
        labelCol={{ md: 3 }}
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        onFinish={onSubmit}
        autoComplete='off'
        onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <ImageUpload
              label='Avatar'
              ref={uploadRef}
              name='image_url'
              rules={[{ required: true, message: ERROR_MESSAGE.required }]}
            />
          </Col>

          <Col span={18}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
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
              <Col span={12}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
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
              <Col span={6}>
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
              rules={[{ required: true, message: ERROR_MESSAGE.required }]}
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
              <DeparmentsSelctor />
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
                {idMember ? 'Edit' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
