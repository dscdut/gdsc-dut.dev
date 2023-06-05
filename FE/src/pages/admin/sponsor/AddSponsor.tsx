import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { useMutation, useQuery } from 'react-query'
import { SponsorBody, SponsorType } from 'src/types/sponsor.type'
import PATH_URL from 'src/shared/path'
import { toast } from 'react-toastify'
import axios from 'axios'
import useMedia from 'src/shared/hook/useMedia'

export default function CreateSponsor() {
  const uploadRef = useRef<UploadRef>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Sponsor>[]>([])
  const [previewImage, setPreviewImage] = useState<string>('')
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [form] = useForm()
  const { isDesktop } = useResponsive()
  const genDataSelector = useGetData('gens')
  const { id: idSponsor } = useParams()
  const isEditMode = Boolean(idSponsor)
  const uploadImage = useMedia().UploadImage()

  const sponsorDetailsQuery = useQuery({
    queryKey: ['id', idSponsor],
    queryFn: () => {
      return SponsorAPI.getSponsorById(idSponsor as string | number)
    },
    enabled: isEditMode
  })

  const fetchDetailApi = () => {
    const data: SponsorType = sponsorDetailsQuery.data?.data
    if (data) {
      axios
        .get(data.image.url, { responseType: 'blob' })
        .then(function (response) {
          const blob = response.data
          const values: Sponsor = {
            image: blob,
            description: data.description,
            infor_url: data.infor_url,
            name: data.name,
            gen_ids: data.gens.map((gen) => gen.id)
          }
          form.setFieldsValue(values)
          setPreviewImage(data.image.url)
          uploadRef?.current?.setImageUrl(data.image.url)
        })
        .catch(() => {
          toast.error(TOAST_MESSAGE.NOT_FOUND)
          navigate('/not-found')
        })
    }
  }

  useEffect(() => {
    if (isEditMode) {
      fetchDetailApi()
    }
  }, [isEditMode, sponsorDetailsQuery.data])

  const createSponsor = useMutation({
    mutationFn: (sponsor: SponsorBody) => {
      return SponsorAPI.createSponsor(sponsor)
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const updateSponsor = useMutation({
    mutationFn: (sponsor: SponsorBody) => {
      return SponsorAPI.updateSponsor(sponsor, Number(idSponsor))
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const onSubmit = async (value: Sponsor) => {
    try {
      setConfirmLoading(true)
      const data: SponsorType = sponsorDetailsQuery.data?.data
      let imageData
      if (uploadRef?.current && previewImage !== uploadRef?.current?.imageUrl) {
        console.log('UPDATE')
        imageData = await uploadImage.mutateAsync(value.image)
      }
      const imageId = imageData ? imageData?.data[0]?.id : data.image.id
      const sponsor: SponsorBody = {
        name: value.name,
        description: value.description,
        infor_url: value.infor_url,
        gen_ids: value.gen_ids,
        image_id: imageId
      }
      if (isEditMode) {
        await updateSponsor.mutateAsync(sponsor)
      } else {
        await createSponsor.mutateAsync(sponsor)
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
          {isEditMode ? 'Edit Sponsor' : 'Add New Sponsor'}
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
          label='Logo'
          name='image'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          form={form}
          previewImage={previewImage}
        />
        <Form.Item label='Name' name='name' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Gens' name='gen_ids' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <CustomSelector<GenType>
            data={genDataSelector.data?.data}
            isLoading={genDataSelector.isLoading}
            placeholder='Select gens'
            mode='multiple'
          />
        </Form.Item>
        <Form.Item label='Description' name='description' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <Input.TextArea rows={4} className='p-2' />
        </Form.Item>

        <Form.Item
          label='Website'
          name='infor_url'
          rules={[
            { required: true, message: ERROR_MESSAGE.required },
            { pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }
          ]}
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
                  if (!isEditMode) {
                    form.setFieldValue('image', null)
                    uploadRef.current?.onReset()
                  } else {
                    fetchDetailApi()
                  }
                }}
              >
                Clear
              </Button>
            </Col>
            <Col>
              <Button type='primary' htmlType='submit' loading={confirmLoading}>
                {isEditMode ? 'Edit' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
