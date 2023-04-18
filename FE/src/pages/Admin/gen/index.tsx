import React, { useEffect, useRef } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import HeaderPage from 'src/components/common/HeaderPage'
import AdminGuard from 'src/guard/AdminGuard'
import FormModal, { IFormItem, IFormModalRef } from 'src/components/common/FormModal'
import { ERROR_MESSAGE, TOAST_MESSAGE } from 'src/shared/constant'
import { useForm } from 'antd/es/form/Form'
import { postGen, updateGen } from 'src/apis/gen.api'
import { IGen } from 'src/interface/gens'
import { toast } from 'react-toastify'
import { GenType } from 'src/types/gens.type'

const formItemGens : IFormItem[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    rules: [{ required: true, message: ERROR_MESSAGE.required }]
  }
]

export default function GenerationLayout() {
  const [isReadyUpdate, setIsReadyUpdate] = React.useState<boolean>(true)
  const [selectedItem, setSelectedItem] = React.useState<GenType | null>(null)
  const [type, setType] = React.useState < 'edit' | 'add'>('add')
  const refForm = useRef<IFormModalRef>(null)
  const [form] = useForm<IGen>()

  useEffect(() => {
    if (selectedItem) {
      setType('edit')
      form.setFieldValue('name', selectedItem.name)
      refForm.current?.showModal()
    } else {
      setType('add')
    }
  }, [selectedItem])

  const handleReset = () => {
    form.resetFields()
    setType('add')
    setSelectedItem(null)
  }

  const handleUpdate = async (value: IGen) => {
    try {
      const response = type === 'add' ? await postGen(value) : selectedItem && await updateGen({ id: selectedItem?.id, name: value.name })
      toast.success(TOAST_MESSAGE.SUCCESS)
      setIsReadyUpdate(true)
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    } finally {
      setTimeout(() => {
        refForm?.current?.closeModal()
        handleReset()
      }, 2000)
    }
  }  

  return (
    <AdminGuard>
      <HeaderPage
        title='Generation'
        breadcrumbList={[
          {
            title: 'Generation'
          },
          {
            title: 'Generation List'
          }
        ]}
        hasCreateBtn
        onCreate={() => refForm?.current?.showModal()}
      />
      <FormModal
        title={type === 'add' ? 'Add New Generation' : 'Edit Generation'}
        okText={type === 'add' ? 'Submit' : 'Edit'}
        ref={refForm}
        formItems={formItemGens}
        form={form}
        handleSubmit={() => {
          const data = form.getFieldsValue()
          handleUpdate(data)
        }}
        handleCancel={handleReset}
      />
      <Outlet context={{ isReadyUpdate, setIsReadyUpdate, setSelectedItem }} />
    </AdminGuard>
  )
}


export function useGenOutletContext() {
  return useOutletContext<{
    isReadyUpdate: boolean
    setIsReadyUpdate: (value: boolean) => void
    setSelectedItem: (value: GenType) => void
  }>()
}