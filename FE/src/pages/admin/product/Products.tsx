import { Image, Tag } from 'antd'
import CustomTable from 'src/components/common/CustomTable'
import { Gen } from 'src/types/gens.type'
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
    dataIndex: 'gen',
    key: 'gen',
    title: 'Gen',
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
    render: (members: { id: number; name: string }[]) => {
      const listMember = members.map((member) => (
        <Tag color={getRandomColor()} className='mt-2 w-max' key={member.id}>
          {member.name}
        </Tag>
      ))
      return <div className='scrollbar-hide flex max-h-30 flex-col overflow-y-scroll'>{listMember}</div>
    }
  }
]

const fakeData: ProductType[] = [
  {
    id: 19,
    name: 'Sharing-Hub',
    image: {
      url: 'https://www.clipartkey.com/mpngs/m/33-339198_volunteering-clipart-transparent-volunteer-clip-art-transparent.png',
      id: 1
    },
    description: 'sharing-hub',
    infor_url: 'https://www.google.com',
    deleted_at: null,
    created_at: '2023-06-05T14:14:36.358Z',
    updated_at: '2023-06-05T14:31:22.766Z',
    gen: {
      id: 3,
      name: 'Gen 1'
    },
    members: [
      {
        id: 1,
        name: 'Tran Van Kiem'
      },
      {
        id: 2,
        name: 'Pham Tuyen'
      },
      {
        id: 3,
        name: 'Phung Thi Anh'
      },
      {
        id: 4,
        name: 'Truong Ha Vu'
      },
      {
        id: 5,
        name: 'Huynh Dinh Hoang Vien'
      },
      {
        id: 6,
        name: 'Le Ngoc Khanh Thy'
      },
      {
        id: 7,
        name: 'Nguyen Tran My Duyen'
      }
    ]
  },
  {
    id: 20,
    name: 'Happy-child',
    image: {
      url: 'https://thumbs.dreamstime.com/b/happy-child-girl-hands-thumbs-up-27321302.jpg',
      id: 2
    },
    description: 'happy-child',
    infor_url: 'https://www.google.com',
    deleted_at: null,
    created_at: '2023-06-05T14:14:36.358Z',
    updated_at: '2023-06-05T14:31:22.766Z',
    gen: {
      id: 1,
      name: 'Gen 4'
    },
    members: [
      {
        id: 1,
        name: 'Tran Van Kiem'
      },
      {
        id: 2,
        name: 'Pham Tuyen'
      },
      {
        id: 3,
        name: 'Phung Thi Anh'
      },
      {
        id: 4,
        name: 'Truong Ha Vu'
      },
      {
        id: 5,
        name: 'Huynh Dinh Hoang Vien'
      },
      {
        id: 6,
        name: 'Le Ngoc Khanh Thy'
      },
      {
        id: 7,
        name: 'Nguyen Tran My Duyen'
      }
    ]
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
      dataSource={fakeData}
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
