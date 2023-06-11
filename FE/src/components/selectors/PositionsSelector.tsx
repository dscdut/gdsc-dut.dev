import { Select, SelectProps } from 'antd'
import { get } from 'lodash'
import { useQuery } from 'react-query'
import { PositionAPI } from 'src/apis/positions.api'
import { Position } from 'src/types/positions.type'

interface Props extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
}

export const convertDataToSelectOptions = (positions: Position[], valueProp: string) =>
  positions?.map((position) => {
    return {
      label: `${position.name}`,
      value: get(position, valueProp)
    }
  })

export default function PositionsSelector({ allowClear, onChange, onClear, size = 'large', value, id }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['positions'],
    queryFn: () => PositionAPI.getPositions()
  })
  const options = convertDataToSelectOptions(data?.data, 'id')

  return (
    <Select
      allowClear={allowClear}
      id={id}
      loading={isLoading}
      onChange={onChange}
      onClear={onClear}
      optionFilterProp='label'
      options={options}
      placeholder='Select position'
      showSearch
      size={size}
      style={{ minWidth: 250 }}
      value={value}
    />
  )
}
