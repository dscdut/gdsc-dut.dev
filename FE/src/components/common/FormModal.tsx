import { Button, Form, Input, Modal } from 'antd'
import { FormInstance, Rule } from 'antd/es/form'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

export interface IFormItem {
  label: string
  name: string
  type: 'text' | 'textArea'
  rules?: Rule[]
}

interface IProps {
  title: string
  okText?: string
  cancelText?: string
  handleSubmit?: () => void
  handleCancel?: () => void
  formItems: IFormItem[]
  form?: FormInstance
}

const defaultProps: IProps = {
  title: 'Modal title',
  okText: 'OK',
  cancelText: 'Cancel',
  handleSubmit: () => {},
  handleCancel: () => {},
  formItems: []
}

export interface IFormModalRef {
  showModal: () => void
  closeModal: () => void
}

const FormModal = forwardRef<IFormModalRef, IProps>((props, ref) => {
  const { title, okText, cancelText, formItems, form, handleSubmit, handleCancel } = props
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
    setConfirmLoading(false)
  }

  const handleOk = () => {
    handleSubmit && handleSubmit()
    setConfirmLoading(true)
  }

  const handleCancelBtn = () => {
    handleCancel && handleCancel()
    setOpen(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: showModal,
        closeModal: closeModal
      }
    },
    []
  )

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => {
        setOpen(false)
        handleCancel && handleCancel()
      }}
      confirmLoading={confirmLoading}
      footer={[
        <Button form='form' key='reset' htmlType='reset' onClick={handleCancelBtn}>
          {cancelText}
        </Button>,
        <Button form='form' key='submit' htmlType='submit' type='primary' loading={confirmLoading}>
          {okText}
        </Button>
      ]}
    >
      <Form
        form={form}
        name='form'
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        layout='vertical'
        autoComplete='off'
        onFinish={handleOk}
      >
        {formItems.map((field: IFormItem) => (
          <Form.Item label={field.label} name={field.name} rules={field.rules}>
            {field.type === 'textArea' ? <Input.TextArea /> : <Input />}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
})

FormModal.defaultProps = defaultProps

export default FormModal