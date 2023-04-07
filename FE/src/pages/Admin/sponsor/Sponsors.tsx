import { Breadcrumb, Button, Col, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import CustomTable from 'src/components/common/CustomTable'
import HeaderPage from 'src/components/common/HeaderPage'
import { EVENTS } from 'src/data/events.dummy'
import AdminGuard from 'src/guard/AdminGuard'
import PATH_URL from 'src/shared/path'
import { Event } from 'src/types/events.type'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'location',
    key: 'location',
    title: 'Location'
  },
  {
    dataIndex: 'Status',
    key: 'Status',
    render: (status: boolean) => (status ? 'Done' : 'Up coming'),
    title: 'Status'
  }
]

export default function Sponsors() {
  const navigate = useNavigate()

  const setSelectedItem = (item: Event) => {
    console.log(item)
  }
  const handleDelete = () => {
    console.log('delete')
  }
  const onChange = () => {
    console.log('change')
  }

  return (
    <AdminGuard>
      <HeaderPage
        title='Sponsors'
        breadcrumbList={[
          {
            title: <Link to={PATH_URL.sponsors}>Sponsors</Link>
          },
          {
            title: <Link to={PATH_URL.sponsors}>Sponsors List</Link>
          }
        ]}
        hasCreateBtn
        onCreate={() => {
          navigate(`${PATH_URL.sponsors}/form`)
        }}
      />
      <CustomTable<Event>
        columns={columns}
        currentPage={1}
        dataSource={EVENTS}
        onDelete={handleDelete}
        onEdit={setSelectedItem}
        pageSize={10}
        total={40}
        onChange={onChange}
        loading={false}
      />
    </AdminGuard>
  )
}
