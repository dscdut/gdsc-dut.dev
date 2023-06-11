import { Image, Tag } from 'antd'
import CustomTable from 'src/components/common/CustomTable'
import { PRODUCTS } from 'src/data/products.dummy'
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

export default function Sponsors() {
  const handleEdit = (item: ProductType) => {
    // handle edit here
  }
  const handleDelete = async (id: string | number) => {
    // handle delete here!
  }
  const onChange = () => {
    // handle on change
  }

  return (
    <CustomTable<ProductType>
      columns={columns}
      currentPage={1}
      dataSource={PRODUCTS}
      onDelete={handleDelete}
      onEdit={handleEdit}
      pageSize={10}
      total={40}
      onChange={onChange}
      loading={false}
      primaryKey='id'
    />
  )
}
