import { Image } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { SponsorAPI } from 'src/apis/sponsor.api'
import CustomTable from 'src/components/common/CustomTable'
import { TOAST_MESSAGE } from 'src/shared/constant'
import { SponsorType } from 'src/types/sponsor.type'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Tên nhà tài trợ'
  },
  {
    dataIndex: 'image_url',
    key: 'image_url',
    title: 'Logo',
    render: (imgUrl: string) => <Image width={120} height={120} src={imgUrl} />
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
  }
]

export default function Sponsors() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sponsors'],
    queryFn: () => SponsorAPI.getSponsors()
  })
  const deleteSponsor = useMutation({
    mutationFn: (id: string | number) => SponsorAPI.deleteSponsor(id),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })
  const setSelectedItem = (item: SponsorType) => {
    console.log(item)
  }
  const handleDelete = async (id: string | number) => {
    try {
      const deleteSponsorResults = await deleteSponsor.mutateAsync(id)
      console.log(deleteSponsorResults)
      if (deleteSponsorResults) {
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
    <CustomTable<SponsorType>
      columns={columns}
      currentPage={1}
      dataSource={data?.data}
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
