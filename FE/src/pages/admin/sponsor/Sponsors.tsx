import { Image, Tag } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SponsorAPI } from 'src/apis/sponsor.api'
import CustomTable from 'src/components/common/CustomTable'
import { TOAST_MESSAGE } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { Gen } from 'src/types/gens.type'
import { SponsorType } from 'src/types/sponsor.type'
import { getRandomColor } from 'src/utils/tools'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Sponsor'
  },
  {
    dataIndex: 'image_url',
    key: 'image_url',
    title: 'Logo',
    render: (imgUrl: string) => <Image width={120} height={120} src={imgUrl} />
  },
  {
    dataIndex: 'gens',
    key: 'gens',
    title: 'Gens',
    render: (gens: Gen[]) => {
      const genRender = gens.map((gen) => (
        <Tag color={getRandomColor()} className='mt-2' key={gen.id}>
          {gen.name}
        </Tag>
      ))
      return genRender
    }
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
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['sponsors'],
    queryFn: () => SponsorAPI.getSponsors()
  })
  const deleteSponsor = useMutation({
    mutationFn: (id: string | number) => SponsorAPI.deleteSponsor(id),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS_DELETE)
    }
  })
  const handleEdit = (item: SponsorType) => {
    navigate(`${PATH_URL.sponsors}/${item.id}`)
  }
  const handleDelete = async (id: string | number) => {
    try {
      const deleteSponsorResults = await deleteSponsor.mutateAsync(id)
      if (deleteSponsorResults) {
        refetch()
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    }
  }
  const onChange = () => {
    // handle on change
  }

  return (
    <CustomTable<SponsorType>
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
