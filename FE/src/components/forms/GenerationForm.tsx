import { Form, FormInstance, Input } from 'antd'
import { Ref } from 'react'
import { getRules } from 'src/utils/rules'
import FormModal, { IFormModalRef } from '../common/FormModal'

interface IProps<T> {
  title: string
  refForm: Ref<IFormModalRef>
  form: FormInstance<T>
  onSubmit: (data: T) => void
  onCancel: () => void
  okText: string
}

export default function GenerationForm<T>({ title, refForm, form, onCancel, onSubmit, okText }: IProps<T>) {
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
        <Form.Item label='Name' name='name' rules={[getRules.require('Gen')]}>
          <Input />
        </Form.Item>
      </FormModal>
    </>
  )
}
