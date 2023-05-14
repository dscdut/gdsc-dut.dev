import { useForm } from 'antd/es/form/Form'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomTable from 'src/components/common/CustomTable'
import { IFormModalRef } from 'src/components/common/FormModal'
import HeaderPage from 'src/components/common/HeaderPage'
import MemberForm from 'src/components/forms/MemberForm'
import PATH_URL from 'src/shared/path'
import { Member } from 'src/types/member.type'
import { Position } from 'src/types/positions.type'

export default function Members() {
  const refForm = useRef<IFormModalRef>(null)
  const [form] = useForm<Member>()
  const [type, setType] = useState<'edit' | 'add'>('add')
  const handleReset = () => {
    console.log('reset')
  }
  const onSubmit = (value: Member) => {
    console.log('update', value)
  }
  return (
    <>
      <HeaderPage
        title='Departments'
        breadcrumbList={[
          {
            title: <Link to={PATH_URL.members}>Members</Link>
          }
        ]}
      />
      <MemberForm
        form={form}
        okText={type === 'add' ? 'Create' : 'Edit'}
        onCancel={handleReset}
        onSubmit={onSubmit}
        refForm={refForm}
        title={type === 'add' ? 'Create a new core team member' : 'Edit core team member'}
      />
      <CustomTable onCreate={() => refForm?.current?.showModal()} columns={[]} dataSource={[]} loading={false} />
    </>
  )
}
