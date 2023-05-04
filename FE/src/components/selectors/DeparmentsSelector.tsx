import { Select, SelectProps } from 'antd'
import { get } from 'lodash'
import { useQuery } from 'react-query'
import { DepartmentAPI } from 'src/apis/department.api'
import { Department } from 'src/types/department.type'

interface Props extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
}

export const convertDataToSelectOptions = (deparments: Department[], valueProp: string) =>
  deparments?.map((deparment) => {
    return {
      label: `${deparment.name}`,
      value: get(deparment, valueProp)
    }
  })

export default function DeparmentsSelctor({ allowClear, onChange, onClear, size = 'large', value, id }: Props) {
  const { isLoading, data } = useQuery({
    queryKey: ['departments'],
    queryFn: () => DepartmentAPI.getDepartments()
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
      placeholder='Please select departments'
      showSearch
      size={size}
      style={{ minWidth: 250 }}
      value={value}
    />
  )
}
