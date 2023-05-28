import { useForm } from 'antd/es/form/Form'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { useRef, useState } from 'react'
// import CustomTable from 'src/components/common/CustomTable'
// import { IFormModalRef } from 'src/components/common/FormModal'
import HeaderPage from 'src/components/common/HeaderPage'
// import MemberForm from 'src/components/forms/MemberForm'
import PATH_URL from 'src/shared/path'
// import { Member } from 'src/types/member.type'

export default function Members() {
  // const refForm = useRef<IFormModalRef>(null)
  // const [form] = useForm<Member>()
  // const [type, setType] = useState<'edit' | 'add'>('add')
  // const handleReset = () => {
  //   console.log('reset')
  // }
  // const onSubmit = (value: Member) => {
  //   console.log('update', value)
  // }
  const navigate = useNavigate()
  const location = useLocation()
  const isListPage = location.pathname.endsWith('/members')
  const title = isListPage ? 'Members List' : location?.search ? 'Edit Member' : 'Add Member'

  return (
    <>
      <HeaderPage
        title='Members'
        breadcrumbList={[
          {
            title: (
              <Link
                to={PATH_URL.members}
                onClick={(event) => {
                  if (isListPage) event.preventDefault()
                }}
              >
                Members
              </Link>
              )
          },
          {
            title: title
          }
        ]}
        hasCreateBtn={isListPage}
        onCreate={() => {
          navigate(`${PATH_URL.members}/form`)
        }}
      />
      {/* <MemberForm
        form={form}
        okText={type === 'add' ? 'Create' : 'Edit'}
        onCancel={handleReset}
        onSubmit={onSubmit}
        refForm={refForm}
        title={type === 'add' ? 'Create a new core team member' : 'Edit core team member'}
      />
      <CustomTable onCreate={() => refForm?.current?.showModal()} columns={[]} dataSource={[]} loading={false} /> */}
    </>
  )
}
