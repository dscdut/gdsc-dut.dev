// interface, type
// api
import { GenAPI } from 'src/apis/gen.api'
// component
import { useMutation, useQuery } from 'react-query'
import CustomTable from 'src/components/common/CustomTable'
import { GenType } from 'src/types/gens.type'
import { useGenOutletContext } from '.'

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'No'
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  }
]

export default function GenerationList() {
  const { setSelectedItem } = useGenOutletContext()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['gens'],
    queryFn: () => GenAPI.getGens()
  })

  const deleteGen = useMutation({
    mutationFn: GenAPI.deleteGen,
    onSuccess: () => {
      refetch()
    }
  })

  const handleDelete = (id: string) => {
    deleteGen.mutate(id)
  }

  const handleEditItem = (gen: GenType) => {
    setSelectedItem(gen)
  }

  return (
    <CustomTable<GenType>
      columns={columns}
      currentPage={1}
      dataSource={data?.data}
      onDelete={(id) => handleDelete(id)}
      onEdit={handleEditItem}
      pageSize={10}
      total={40}
      loading={isLoading || deleteGen.isLoading}
      primaryKey='id'
    />
  )
}
