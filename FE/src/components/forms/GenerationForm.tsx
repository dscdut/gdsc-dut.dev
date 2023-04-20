import { Ref } from 'react'
import FormModal, { IFormModalRef } from '../common/FormModal'
import { Form, FormInstance, Input } from 'antd'
import { IGen } from 'src/interface/gens'
import { getRules } from 'src/utils/rules'

interface IProps {
  title: string
  refForm: Ref<IFormModalRef>
  form: FormInstance<IGen>
  onSubmit: (data: IGen) => void
  onCancel: () => void
  okText: string
}

export default function GenerationForm({ title, refForm, form, onCancel, onSubmit, okText }: IProps) {
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
