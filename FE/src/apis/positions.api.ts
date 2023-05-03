import http from 'src/utils/http'

export const getPositions = () => http.get('/positions')
