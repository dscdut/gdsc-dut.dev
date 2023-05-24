import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import { Store } from 'antd/es/form/interface'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, TOAST_MESSAGE, urlRegex } from 'src/shared/constant'

// custom hooks
import { useResponsive } from 'src/shared/hook'

// component
import ImageUpload from 'src/components/common/ImageUpload'

// css
import { UploadRef } from 'src/interface/app'
import { Sponsor } from 'src/interface/sponsor'
import styles from './styles.module.scss'
import CustomSelector from 'src/components/selectors/CustomSelector'
import { GenType } from 'src/types/gens.type'
import useGetData from 'src/shared/hook/useGetData'
import { SponsorAPI } from 'src/apis/sponsor.api'
import { mediaAPI } from 'src/apis/media.api'
import { useMutation } from 'react-query'
import { SponsorBodyCreate } from 'src/types/sponsor.type'
import PATH_URL from 'src/shared/path'
import { toast } from 'react-toastify'

export default function CreateSponsor() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isDesktop } = useResponsive()
  const uploadRef = useRef<UploadRef>(null)
  const formRef = useRef<FormInstance<Store>>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Sponsor>[]>([])
  const [idSponsor, setIdSponsor] = useState<string>()
  const [form] = useForm()
  const genDataSelector = useGetData('gens')
  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    const id = searchParams.get('id')
    console.log(id, searchParams.get('id'))
  }, [searchParams])

  const uploadImage = useMutation({
    mutationFn: (image: Blob) => {
      const formData = new FormData()
      formData.append('image', image, 'image.jpg')
      return mediaAPI.postImage(formData)
    }
  })

  const createSponsor = useMutation({
    mutationFn: (sponsor: SponsorBodyCreate) => {
      return SponsorAPI.postSponsor(sponsor)
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const onSubmit = async (value: Sponsor) => {
    try {
      setConfirmLoading(true)
      const imageData = await uploadImage.mutateAsync(value.image)
      if (imageData) {
        const imageId = imageData.data[0]?.id
        const sponsor: SponsorBodyCreate = {
          name: value.name,
          description: value.description,
          infor_url: value.infor_url,
          gen_id: value.gen_id,
          image_id: imageId
        }
        const createSponsorResult = await createSponsor.mutateAsync(sponsor)
        if (createSponsorResult) {
          navigate(`${PATH_URL.sponsors}`)
        }
      }
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    } finally {
      setConfirmLoading(false)
    }
  }

  return (
    <Card>
      <Row className='mb-2'>
        <Typography.Title level={4} className='!my-0'>
          {idSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
        </Typography.Title>
      </Row>
      <Form
        fields={fieldsData}
        form={form}
        className={styles.formWrapper}
        name='sponsorForm'
        layout={isDesktop ? 'horizontal' : 'vertical'}
        labelCol={{ md: 3 }}
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        onFinish={onSubmit}
        autoComplete='off'
        onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <ImageUpload
          ref={uploadRef}
          label='Avatar'
          name='image'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          form={form}
        />
        <Form.Item label='Name' name='name' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Gen' name='gen_id' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <CustomSelector<GenType>
            data={genDataSelector.data?.data}
            isLoading={genDataSelector.isLoading}
            placeholder='Select gens'
          />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea rows={4} className='p-2' />
        </Form.Item>

        <Form.Item
          label='Website'
          name='infor_url'
          rules={[{ pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }]}
        >
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Button' className={styles['form-item__label--invisible']}>
          <Row align='middle' justify='center' gutter={[16, 16]}>
            <Col>
              <Button
                type='default'
                htmlType='reset'
                onClick={() => {
                  console.log(form.getFieldsValue())
                  form.setFieldValue('image', null)
                  uploadRef.current?.onReset()
                }}
              >
                Clear
              </Button>
            </Col>
            <Col>
              <Button type='primary' htmlType='submit' loading={confirmLoading}>
                {idSponsor ? 'Edit' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
