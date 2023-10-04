import { Image } from 'antd'
import dayjs from 'dayjs'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MemberAPI } from 'src/apis/members.api'
import CustomTable from 'src/components/common/CustomTable'
import { MEMBERS } from 'src/data/members.dummy'
import { TOAST_MESSAGE } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { MemberType } from 'src/types/member.type'

const columns = [
  {
    dataIndex: 'full_name',
    key: 'full_name',
    title: 'Name'
  },
  {
    dataIndex: 'image',
    key: 'image',
    title: 'Avatar',
    render: (image: { id: number; url: string }) => <Image width={120} height={120} src={image.url} />
  },
  {
    dataIndex: 'birthday',
    key: 'birthday',
    title: 'Birthday',
    render: (date: string) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>
  },
  {
    dataIndex: 'phone',
    key: 'phone',
    title: 'Phone'
  },
  {
    dataIndex: 'email',
    key: 'email',
    title: 'Email'
  }
]

export default function Members() {
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['members'],
    queryFn: () => MemberAPI.getMembers()
  })
  const deleteMember = useMutation({
    mutationFn: (id: string | number) => MemberAPI.deleteMember(id),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS_DELETE)
    }
  })
  const handleEdit = (item: MemberType) => {
    navigate(`${PATH_URL.members}/${item.id}`)
  }
  const handleDelete = async (id: string | number) => {
    try {
      const resultDelete = await deleteMember.mutateAsync(id)
      if (resultDelete) {
        refetch()
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    }
  }
  const onChange = () => {
    console.log('change')
  }

  return (
    <CustomTable<MemberType>
      columns={columns}
      currentPage={1}
      dataSource={data?.data.length > 0 ? data?.data : MEMBERS}
      onDelete={handleDelete}
      onEdit={handleEdit}
      pageSize={10}
      total={40}
      onChange={onChange}
      loading={isLoading}
      primaryKey='id'
    />
  )
}
