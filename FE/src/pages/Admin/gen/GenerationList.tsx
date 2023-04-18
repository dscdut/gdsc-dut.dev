import { useEffect, useState } from 'react'
// interface, type
import { IGenResponse } from 'src/interface/gens'
// api
import { deleteGen, getGens } from 'src/apis/gen.api'
// component
import CustomTable from 'src/components/common/CustomTable'
import { GenType } from 'src/types/gens.type'
import { removeKeysFromObj } from 'src/utils/tools'
import { useGenOutletContext } from './index'
import { TOAST_MESSAGE } from 'src/shared/constant'
import { toast } from 'react-toastify'

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'No',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name'
  }
]

type IDataSourceItem = Pick<IGenResponse, 'id'| 'name'>

export default function GenerationList() {
  const { isReadyUpdate, setIsReadyUpdate, setSelectedItem } = useGenOutletContext()
  const [dataSource, setDataSource] = useState<IDataSourceItem[]>([])

  const fetchGensData = async () => {
    try {
      const response = await getGens()
      const data: IDataSourceItem[] = response.data.map(
        (item) => removeKeysFromObj<IGenResponse>(item, ['deleted_at', 'created_at', 'updated_at']) as IDataSourceItem
      )
      setDataSource(data.sort((a: IDataSourceItem, b: IDataSourceItem) => Number(a.id) < Number(b.id) ? -1 : 1))
    } catch (error) {
    }
  }
  
  useEffect(() => {
    if (isReadyUpdate) {
      fetchGensData();
      setIsReadyUpdate(false);
    }
  }, [isReadyUpdate])

  const handleEditItem = (item: GenType) => {
    setSelectedItem(item)
  }

  const handleDelete = async (id: number | string) => {
    try {
      const response = await deleteGen(id)
      toast.success(TOAST_MESSAGE.DELETE_SUCCESS)
      setIsReadyUpdate(true)
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    }
  }

  return (
    <CustomTable<GenType>
      columns={columns}
      currentPage={1}
      dataSource={dataSource}
      onDelete={(id) => handleDelete(id)}
      onEdit={handleEditItem}
      pageSize={10}
      total={40}
      onChange={() => {}}
      loading={false}
      primaryKey='id'
    />
  )
}
