import { Select, SelectProps } from 'antd'
import { useQuery } from 'react-query'
import { getPositions } from 'src/apis/positions.api'
import { convertDataPositionsToSelectOptions } from 'src/utils/tools'

interface Props extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
}
export default function PositionsSelector({ allowClear, onChange, onClear, size = 'large', value, id }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getPositions()
  })
  const options = convertDataPositionsToSelectOptions(data?.data, 'id')
  return (
    <Select
      allowClear={allowClear}
      id={id}
      loading={isLoading}
      onChange={onChange}
      onClear={onClear}
      optionFilterProp='label'
      options={options}
      placeholder='Please select position'
      showSearch
      size={size}
      style={{ minWidth: 250 }}
      value={value}
    />
  )
}
