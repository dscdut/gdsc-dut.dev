import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Form, Upload } from 'antd'
import { FormInstance, Rule } from 'antd/es/form'
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { Store } from 'antd/es/form/interface'
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, IMAGE_FILETYPE, TOOLTIP_MESSAGE } from 'src/shared/constant'
import { fileToBase64, fileToBlob, validateFileType } from 'src/utils/tools'

// css
import styles from './styles.module.scss'

interface Props {
  rules: Rule[]
  label: string
  name: string
  form?: FormInstance<Store>
  className?: string
  children?: ReactNode
  fieldsData: FieldData[]
}

type Ref = any

const ImageUpload = forwardRef<Ref, Props>((props, ref) => {
  const { rules, label, name, className, form, fieldsData } = props
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useImperativeHandle(ref, () => {
    return {
      onReset: () => setImageUrl(null)
    }
  })

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onError, file, onProgress } = options

    const isAllowedType = validateFileType(file as UploadFile, IMAGE_FILETYPE)
    if (!isAllowedType) {
      setImageUrl(null)
    } else {
      const blob = await fileToBlob(file as RcFile)
      form?.setFieldValue(name, blob)
      fileToBase64(file as RcFile, (url) => setImageUrl(url))
    }
  }

  return (
    <Form.Item
      label={label}
      name={name}
      tooltip={TOOLTIP_MESSAGE.image}
      rules={[
        ...rules,
        {
          validator(rule, value, callback) {
            if (value.file) {
              if (validateFileType(value.file as UploadFile, IMAGE_FILETYPE)) {
                return Promise.resolve(true)
              } else {
                return Promise.reject(new Error(ERROR_MESSAGE.invalid))
              }
            }
            return Promise.resolve(true)
          }
        }
      ]}
      validateTrigger='onChange'
      validateFirst
    >
      <Upload
        accept='image/png, image/jpeg'
        name={name}
        listType='picture-card'
        fileList={[]}
        className={`${styles.uploadWrapper} ${className}`}
        showUploadList={false}
        customRequest={handleUpload}
      >
        {imageUrl ? (
          <img alt='Sponsor avatar' style={{ width: '100%' }} src={imageUrl} />
        ) : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  )
})

export default ImageUpload
