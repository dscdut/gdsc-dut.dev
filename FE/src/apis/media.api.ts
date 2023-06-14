import http from 'src/utils/http'

const MEDIA_URL = 'media/images'

export const mediaAPI = {
  postImage: (body: FormData) => {
    return http.post(MEDIA_URL, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  deleteImage: (body: { ids: string[] }) => {
    return http.delete(`${MEDIA_URL}`, { data: body })
  }
}
