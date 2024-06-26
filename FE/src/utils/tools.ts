import { RcFile, UploadFile } from 'antd/es/upload'
import { PartialObject, get, omit } from 'lodash'
import { SelectOption } from 'src/interface/selectOption'
import { Nameable } from 'src/types/utils.type'

export const scrollToTop = () => {
  window?.scrollTo({
    behavior: 'smooth',
    top: 0
  })
}

export const validateFileType = (file: UploadFile, allowedTypes?: string) => {
  if (!allowedTypes) {
    return true
  }

  if (file.type) {
    return allowedTypes.includes(file.type)
  }
}

export const fileToBlob = async (file: RcFile): Promise<Blob> =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type })

export const fileToBase64 = (file: RcFile | Blob, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.onload = function () {
    callback(reader.result as string)
  }
  reader.onerror = function () {
    callback('')
  }
  reader.readAsDataURL(file)
}

export const removeKeysFromObj = <T extends object>(obj: T, keys: string[]): PartialObject<T> => omit(obj, keys)

export const convertDataToSelectOptions = <T extends Nameable>(data: T[], valueProp: string): SelectOption[] =>
  data?.map((item) => {
    return {
      label: `${item.name || item.full_name}`,
      value: get(item, valueProp)
    }
  }) || []

export const getRandomColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
