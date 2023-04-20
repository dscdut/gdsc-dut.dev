import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useRef } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { GenAPI } from 'src/apis/gen.api'
import CustomTable from 'src/components/common/CustomTable'
import { IFormModalRef } from 'src/components/common/FormModal'
import HeaderPage from 'src/components/common/HeaderPage'
import GenerationForm from 'src/components/forms/GenerationForm'
import AdminGuard from 'src/guard/AdminGuard'
import { IGen } from 'src/interface/gens'
import { TOAST_MESSAGE } from 'src/shared/constant'
import { GenType } from 'src/types/gens.type'

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'No'
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  }
]

export default function GenerationLayout() {
  const [selectedItem, setSelectedItem] = React.useState<GenType | null>(null)
  const [type, setType] = React.useState<'edit' | 'add'>('add')
  const refForm = useRef<IFormModalRef>(null)
  const [form] = useForm<IGen>()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['gens'],
    queryFn: () => GenAPI.getGens()
  })

  const deleteGen = useMutation({
    mutationFn: GenAPI.deleteGen,
    onSuccess: () => {
      refetch()
    }
  })

  const createGen = useMutation({
    mutationFn: GenAPI.createGen,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
      refetch()
    }
  })

  const updateGen = useMutation({
    mutationFn: GenAPI.updateGen,
    onSuccess: () => {
      refetch()
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const handleDelete = (id: string) => {
    deleteGen.mutate(id)
  }

  const handleEditItem = (gen: GenType) => {
    setSelectedItem(gen)
  }

  useEffect(() => {
    if (selectedItem) {
      setType('edit')
      form.setFieldValue('name', selectedItem.name)
      refForm.current?.showModal()
    } else {
      setType('add')
    }
  }, [form, selectedItem])

  const handleReset = () => {
    form.resetFields()
    setType('add')
    setSelectedItem(null)
  }

  const handleUpdate = async (value: IGen) => {
    try {
      if (type === 'add') createGen.mutate(value)
      selectedItem &&
        updateGen.mutate({
          id: selectedItem?.id,
          name: value.name
        })
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
      />

      <GenerationForm
        form={form}
        okText={type === 'add' ? 'Create' : 'Edit'}
        onCancel={handleReset}
        onSubmit={handleUpdate}
        refForm={refForm}
        title={type === 'add' ? 'Create new gen' : 'Edit gen'}
      />
      <CustomTable<GenType>
        columns={columns}
        currentPage={1}
        dataSource={data?.data}
        onDelete={(id) => handleDelete(id)}
        onCreate={() => refForm?.current?.showModal()}
        onEdit={handleEditItem}
        pageSize={10}
        total={40}
        loading={isLoading || deleteGen.isLoading}
        primaryKey='id'
      />
    </AdminGuard>
  )
}
