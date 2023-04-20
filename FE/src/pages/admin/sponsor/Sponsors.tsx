import { Link, useNavigate } from 'react-router-dom'
import CustomTable from 'src/components/common/CustomTable'
import HeaderPage from 'src/components/common/HeaderPage'
import { EVENTS } from 'src/data/events.dummy'
import AdminGuard from 'src/guard/AdminGuard'
import PATH_URL from 'src/shared/path'
import { Event } from 'src/types/events.type'

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'No'
  },
  {
    dataIndex: 'image',
    key: 'image',
    title: 'Avatar'
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'description',
    key: 'description',
    title: 'Description'
  },
  {
    dataIndex: 'infor_url',
    key: 'infor_url',
    title: 'Website'
  },
]

export default function Sponsors() {
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
        primaryKey='id'
      />
  )
}
