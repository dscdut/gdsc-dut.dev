import { Image } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MemberAPI } from 'src/apis/member.api'
import CustomTable from 'src/components/common/CustomTable'
import { TOAST_MESSAGE } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { MemberType } from 'src/types/member.type'

const columns = [
  {
    dataIndex: 'full_name',
    key: 'full_name',
    title: 'Tên'
  },
  {
    dataIndex: 'avatar_url',
    key: 'avatar_url',
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
      dataSource={data?.data}
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
