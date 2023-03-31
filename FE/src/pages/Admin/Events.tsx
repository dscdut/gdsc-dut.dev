import { useState } from 'react'
import RestTable from 'src/components/common/RestTable'
import AdminGuard from 'src/guard/AdminGuard'

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
type Event = {
  id: string
  name: string
  location: string
  status: boolean
}

const formatData: Event[] = [
  { id: '1', name: 'Info Session', location: 'Da Nang', status: true },
  { id: '2', name: 'Info Session2', location: 'Da Nang', status: true }
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
      <RestTable<Event>
        columns={columns}
        currentPage={1}
        dataSource={formatData}
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
