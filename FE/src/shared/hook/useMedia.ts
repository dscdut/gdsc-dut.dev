import { useMutation } from 'react-query'
import { mediaAPI } from 'src/apis/media.api'

const useMedia = () => {
  const UploadImage = () => {
    return useMutation({
      mutationFn: (image: Blob) => {
        const formData = new FormData()
        formData.append('image', image, 'image.jpg')
        return mediaAPI.postImage(formData)
      }
    })
  }

  const DeleteImage = () => {
    return useMutation({
      mutationFn: (body: { ids: string[] }) => {
        return mediaAPI.deleteImage(body)
      }
    })
  }

  return { UploadImage, DeleteImage }
}

export default useMedia
