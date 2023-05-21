import { Image } from 'antd'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { MemberAPI } from 'src/apis/member.api'
import CustomTable from 'src/components/common/CustomTable'
import { MEMBERS } from 'src/data/members.dummy'
import PATH_URL from 'src/shared/path'
import { Member } from 'src/types/member.type'

const columns = [
  {
    dataIndex: 'full_name',
    key: 'full_name',
    title: 'Tên'
  },
  {
    dataIndex: 'image_url',
    key: 'image_url',
    title: 'Ảnh',
    render: (imgUrl: string) => <Image width={120} height={120} src={imgUrl} />
  },
  {
    dataIndex: 'birthday',
    key: 'birthday',
    title: 'Ngày sinh'
  },
  {
    dataIndex: 'phone',
    key: 'phone',
    title: 'Số điện thoại'
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email'
  }
]

export default function Members() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: () => MemberAPI.getMembers()
  })
  const setSelectedItem = (item: Member) => {
    navigate(`${PATH_URL.members}/form?id=${item.id}`)
  }
  const handleDelete = () => {
    console.log('delete')
  }
  const onChange = () => {
    console.log('change')
  }

  return (
    <CustomTable<Member>
      columns={columns}
      currentPage={1}
      dataSource={MEMBERS}
      onDelete={handleDelete}
      onEdit={setSelectedItem}
      pageSize={10}
      total={40}
      onChange={onChange}
      loading={isLoading}
      primaryKey='id'
    />
  )
}
