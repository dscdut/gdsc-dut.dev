import { Select, SelectProps } from 'antd'
import { get } from 'lodash'
import { useQuery } from 'react-query'
import { DepartmentAPI } from 'src/apis/department.api'
import { GenAPI } from 'src/apis/gen.api'
import { Department } from 'src/types/department.type'
import { GenType } from 'src/types/gens.type'

interface Props extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
}

export const convertDataToSelectOptions = (gens: GenType[], valueProp: string) =>
  gens?.map((gen) => {
    return {
      label: `${gen.name}`,
      value: get(gen, valueProp)
    }
  })

export default function GensSelector({ allowClear, onChange, onClear, size = 'large', value, id }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['gens'],
    queryFn: () => GenAPI.getGens()
  })
  const options = convertDataToSelectOptions(data?.data, 'id')
  return (
    <Select
      mode='multiple'
      allowClear={allowClear}
      id={id}
      loading={isLoading}
      onChange={onChange}
      onClear={onClear}
      optionFilterProp='label'
      options={options}
      placeholder='Please select gen'
      showSearch
      size={size}
      style={{ minWidth: 250 }}
      value={value}
    />
  )
}
