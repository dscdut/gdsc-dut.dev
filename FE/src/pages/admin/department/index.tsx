import { Tag } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DepartmentAPI } from 'src/apis/department.api'
import CustomTable from 'src/components/common/CustomTable'
import { IFormModalRef } from 'src/components/common/FormModal'
import HeaderPage from 'src/components/common/HeaderPage'
import GenerationForm from 'src/components/forms/GenerationForm'
import AdminGuard from 'src/guard/AdminGuard'
import { DepartmentKey, DepartmentTagColor, TOAST_MESSAGE } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { Department } from 'src/types/department.type'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Deparment',
    render: (department: string) => <Tag color={DepartmentTagColor[department as DepartmentKey]}>{department}</Tag>
  }
]

export default function DepartmentLayout() {
  const [selectedItem, setSelectedItem] = useState<Department | null>(null)
  const [type, setType] = useState<'edit' | 'add'>('add')
  const refForm = useRef<IFormModalRef>(null)
  const [form] = useForm<Department>()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => DepartmentAPI.getDepartments()
  })

  const createDepartment = useMutation({
    mutationFn: DepartmentAPI.createDepartment,
    onSuccess: () => {
      refetch()
      refForm?.current?.closeModal()
      form.resetFields()
    },
    onError: () => {
      toast.error(TOAST_MESSAGE.ERROR)
    }
  })
  const deleteDeparment = useMutation({
    mutationFn: DepartmentAPI.deleteDepartment,
    onSuccess: () => {
      refetch()
    }
  })
  const handleReset = () => {
    form.resetFields()
    setType('add')
    setSelectedItem(null)
  }

  const handleUpdate = async (value: Department) => {
    if (type === 'add') createDepartment.mutate(value.name)
  }
  useEffect(() => {
    if (selectedItem) {
      setType('edit')
      form.setFieldValue('name', selectedItem.name)
      refForm.current?.showModal()
    } else {
      setType('add')
    }
  }, [selectedItem])

  const handleDelete = (id: number) => {
    deleteDeparment.mutate(id)
  }

  return (
    <AdminGuard>
      <HeaderPage
        title='Departments'
        breadcrumbList={[
          {
            title: <Link to={PATH_URL.sponsors}>Departments</Link>
          }
        ]}
      />

      <GenerationForm<Department>
        form={form}
        okText={type === 'add' ? 'Create' : 'Edit'}
        onCancel={handleReset}
        onSubmit={handleUpdate}
        refForm={refForm}
        title={type === 'add' ? 'Create new gen' : 'Edit gen'}
      />
      <CustomTable<Department>
        columns={columns}
        currentPage={1}
        dataSource={data?.data}
        onDelete={(id) => handleDelete(id as number)}
        // onEdit={setSelectedItem}
        onCreate={() => refForm?.current?.showModal()}
        pageSize={10}
        total={40}
        // onChange={onChange}
        loading={false}
        primaryKey='id'
      />
    </AdminGuard>
  )
}
