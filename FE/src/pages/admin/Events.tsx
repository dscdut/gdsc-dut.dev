import CustomTable from 'src/components/common/CustomTable'
import { EVENTS } from 'src/data/events.dummy'
import AdminGuard from 'src/guard/AdminGuard'
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

export default function Events() {
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
    </AdminGuard>
  )
}
