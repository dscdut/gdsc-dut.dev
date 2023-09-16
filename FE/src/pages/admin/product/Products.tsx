import { Image, Tag } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ProductAPI } from 'src/apis/products.api'
import CustomTable from 'src/components/common/CustomTable'
import { PRODUCTS } from 'src/data/products.dummy'
import { TOAST_MESSAGE } from 'src/shared/constant'
import PATH_URL from 'src/shared/path'
import { Gen } from 'src/types/gens.type'
import { Member } from 'src/types/member.type'
import { ProductType } from 'src/types/products.type'
import { getRandomColor } from 'src/utils/tools'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Product'
  },
  {
    dataIndex: 'image',
    key: 'image',
    title: 'Logo',
    render: (image: { id: number; url: string }) => <Image width={120} height={120} src={image.url} />
  },
  {
    dataIndex: 'gens',
    key: 'gens',
    title: 'Gens',
    render: (gen: Gen) => (
      <Tag color={getRandomColor()} className='mt-2' key={gen.id}>
        {gen.name}
      </Tag>
    )
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
  {
    dataIndex: 'members',
    key: 'members',
    title: 'Members',
    render: (members: Member[]) => {
      const listMember = members.map((member) => (
        <Tag color={getRandomColor()} className='mt-2 w-max' key={member.id}>
          {member.name}
        </Tag>
      ))
      return <div className='scrollbar-hide flex max-h-30 flex-col overflow-y-scroll'>{listMember}</div>
    }
  }
]

export default function Products() {
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductAPI.getProducts()
  })

  const deleteProduct = useMutation({
    mutationFn: (id: string | number) => ProductAPI.deleteProduct(id),
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS_DELETE)
    }
  })

  const handleEdit = (item: ProductType) => {
    navigate(`${PATH_URL.products}/${item.id}`)
  }
  const handleDelete = async (id: string | number) => {
    try {
      const deleteProductResults = await deleteProduct.mutateAsync(id)
      if (deleteProductResults) {
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
    <CustomTable<ProductType>
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
