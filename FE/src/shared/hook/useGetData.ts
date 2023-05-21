import { useQuery } from 'react-query'
import http from 'src/utils/http'

const useGetData = (name: string) => {
  const data = useQuery({
    queryKey: [name],
    queryFn: () => {
      return http.get(`/${name}`)
    }
  })

  return data
}

export default useGetData
