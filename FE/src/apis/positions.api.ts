import http from 'src/utils/http'

const POSITION_URL = '/positions'

export const PositionAPI = {
  getPositions: () => http.get(POSITION_URL)
}
