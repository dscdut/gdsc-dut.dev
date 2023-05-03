import { Col, Form, FormInstance, Input, Row } from 'antd'
import { Ref } from 'react'
import { Member } from 'src/types/member.type'
import { getRules } from 'src/utils/rules'
import FormModal, { IFormModalRef } from '../common/FormModal'
import PositionsSelector from '../selectors/PositionsSelector'

interface Props {
  title: string
  refForm: Ref<IFormModalRef>
  form: FormInstance
  onSubmit: (data: Member) => void
  onCancel: () => void
  okText: string
}

export default function MemberForm({ title, refForm, form, onCancel, onSubmit, okText }: Props) {
  return (
    <>
      <FormModal
        title={title}
        okText={okText}
        ref={refForm}
        form={form}
        handleSubmit={() => {
          const data = form.getFieldsValue()
          onSubmit(data)
        }}
        handleCancel={onCancel}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item label='Full Name' name='full_name' rules={[getRules.require('Full name')]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Phone' name='phone' rules={[getRules.require('Phone')]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item label='Email' name='email' rules={[getRules.require('Email')]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Link facebook/ instagram' name='infor_url'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form.Item label='Position' name='position_id'>
              <PositionsSelector />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Form.Item label='Horoscope Sign' name='horoscope_sign' rules={[getRules.require('Horoscope Sign')]}>
          <Input />
        </Form.Item>
        <Form.Item label='Philosophy' name='philosophy' rules={[getRules.require('Philosophy')]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label='Feelings' name='feelings' rules={[getRules.require('Feelings')]}>
          <Input.TextArea className='!h-44' />
        </Form.Item>
      </FormModal>
    </>
  )
}
