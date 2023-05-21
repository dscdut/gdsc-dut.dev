import { Select, SelectProps } from 'antd'
import { useQuery } from 'react-query'
import http from 'src/utils/http'
import { convertDataToSelectOptions } from 'src/utils/tools'

interface CustomSelectorProps<T> extends Omit<SelectProps<string>, 'onSelect'> {
  id?: string
  value?: string
  data: T[]
  isLoading: boolean
  placeholder: string
}

const CustomSelector = <T extends { name: string }>({
  data,
  isLoading,
  placeholder,
  size = 'large',
  ...props
}: CustomSelectorProps<T>) => {
  const options = convertDataToSelectOptions<T>(data, 'id')

  return (
    <Select
      placeholder={placeholder}
      loading={isLoading}
      options={options}
      optionFilterProp='label'
      showSearch
      size={size}
      {...props}
    />
  )
}

export default CustomSelector
