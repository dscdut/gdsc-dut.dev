import { Col, DatePicker, Form, FormInstance, Input, Row } from 'antd'
import { Ref } from 'react'
import { Member } from 'src/types/member.type'
import { getRules } from 'src/utils/rules'
import FormModal, { IFormModalRef } from '../common/FormModal'
import ImageUpload from '../common/ImageUpload'
import CustomSelector from '../selectors/CustomSelector'
import { GenType } from 'src/types/gens.type'
import { Position } from 'src/types/positions.type'
import { Department } from 'src/types/department.type'
import useGetData from 'src/shared/hook/useGetData'

interface Props {
  title: string
  refForm: Ref<IFormModalRef>
  form: FormInstance
  onSubmit: (data: Member) => void
  onCancel: () => void
  okText: string
}

export default function MemberForm({ title, refForm, form, onCancel, onSubmit, okText }: Props) {
  const departmentDataSelector = useGetData('departments')
  const genDataSelector = useGetData('gens')
  const positionDataSelector = useGetData('positions')

  return (
    <>
      <FormModal
        title={title}
        okText={okText}
        ref={refForm}
        form={form}
        handleSubmit={() => {
          const data = form.getFieldsValue()
          console.log(data, 'dattas')
          onSubmit(data)
        }}
        handleCancel={onCancel}
      >
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <ImageUpload label='Avatar' name='image_id' rules={[getRules.require()]} />
          </Col>

          <Col span={18}>
            <Form.Item label='Full Name' name='full_name' rules={[getRules.require('Full name')]}>
              <Input className='p-2' />
            </Form.Item>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item label='Phone' name='phone' rules={[getRules.require('Phone')]}>
                  <Input className='p-2' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Birthday' name='birthday' rules={[getRules.require('Birthday')]}>
                  <DatePicker className='h-full w-full' size='large' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label='Gen' name='gen_id' rules={[getRules.require('Gen')]}>
                  <CustomSelector<GenType>
                    data={genDataSelector.data?.data}
                    isLoading={genDataSelector.isLoading}
                    placeholder='Select gens'
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item label='Email' name='email' rules={[getRules.require('Email')]}>
              <Input className='p-2' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Link facebook/ instagram' name='infor_url'>
              <Input className='p-2' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item label='Position' name='position_id'>
              <CustomSelector<Position>
                data={positionDataSelector.data?.data}
                isLoading={positionDataSelector.isLoading}
                placeholder='Please select position'
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Deparment' name='deparment_id'>
              <CustomSelector<Department>
                data={departmentDataSelector.data?.data}
                isLoading={departmentDataSelector.isLoading}
                placeholder='Please select departments'
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label='Horoscope' name='horoscope_sign' rules={[getRules.require('Horoscope Sign')]}>
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Motto/ Favorite Saying' name='philosophy' rules={[getRules.require()]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item label='Feelings' name='feelings' rules={[getRules.require()]}>
          <Input.TextArea className='!h-44' />
        </Form.Item>
      </FormModal>
    </>
  )
}
