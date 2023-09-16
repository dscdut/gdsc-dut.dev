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
import { Product } from 'src/interface/product'
import { MemberType } from 'src/types/member.type'
import { useMutation, useQuery } from 'react-query'
import { ProductAPI } from 'src/apis/products.api'
import { ProductBody, ProductType } from 'src/types/products.type'
import axios from 'axios'
import { toast } from 'react-toastify'
import useMedia from 'src/shared/hook/useMedia'
import { omit } from 'lodash'
import PATH_URL from 'src/shared/path'

export default function CreateProduct() {
  const uploadRef = useRef<UploadRef>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Sponsor>[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = useForm()
  const { isDesktop } = useResponsive()
  const { id: idSponsor } = useParams()
  const isEditMode = Boolean(idSponsor)
  const [isSelectedGen, setIsSelectedGen] = useState<boolean>(false)
  const [filterMembersData, setFilterMembersData] = useState<MemberType[]>([])
  const genDataSelector = useGetData('gens')
  const membersData = useGetData('members')
  const { id: idProduct } = useParams()
  const isEdit = Boolean(idProduct)
  const navigate = useNavigate()
  const uploadImage = useMedia().UploadImage()

  const productDetailQuery = useQuery({
    queryKey: ['id', idProduct],
    queryFn: () => {
      return ProductAPI.getProductById(idProduct as string | number)
    },
    enabled: isEdit
  })

  const fetchDetailApi = () => {
    const data: ProductType = productDetailQuery.data?.data
    if (data) {
      axios
        .get(data.image.url, { responseType: 'blob' })
        .then(function (response) {
          const blob = response.data
          const values: Product = {
            ...data,
            image: blob,
            gen_id: data.gens.id,
            member_ids: data.members.map((member) => member.id)
          }
          form.setFieldsValue(values)
          setIsSelectedGen(true)
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
      if (productDetailQuery.data && membersData.data) {
        const filterData = (membersData.data?.data as MemberType[]).filter((member) =>
          member.gens.some(
            (genMember) => (productDetailQuery.data?.data as ProductType).gens.id === genMember.gen.gen_id
          )
        )
        setFilterMembersData(filterData)
      }
    }
  }, [isEditMode, productDetailQuery.data, membersData.data])

  const createProduct = useMutation({
    mutationFn: (product: ProductBody) => {
      return ProductAPI.createProduct(product)
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const updateProduct = useMutation({
    mutationFn: (product: ProductBody) => {
      return ProductAPI.updateProduct(product, Number(idSponsor))
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const onSubmit = async (value: Product) => {
    try {
      setConfirmLoading(true)
      const data: ProductType = productDetailQuery.data?.data
      let imageData
      if (uploadRef?.current && previewImage !== uploadRef?.current?.imageUrl) {
        imageData = await uploadImage.mutateAsync(value.image)
      }
      const imageId = imageData ? imageData?.data[0]?.id : data.image.id
      const product: ProductBody = omit(
        {
          ...value,
          gen_id: value.gen_id,
          image_id: imageId
        },
        ['image']
      )
      if (isEditMode) {
        await updateProduct.mutateAsync(product)
      } else {
        await createProduct.mutateAsync(product)
      }
      navigate(`${PATH_URL.products}`)
    } catch (error) {
      toast.error(TOAST_MESSAGE.ERROR)
    } finally {
      setConfirmLoading(false)
    }
  }

  const handleOnChangeGen = () => {
    form.setFieldValue('member_ids', [])
    const genValue: number = form.getFieldValue('gen_id')
    const filterData = (membersData.data?.data as MemberType[]).filter((member) =>
      member.gens.some((genMember) => genValue === genMember.gen.gen_id)
    )
    setFilterMembersData(filterData)
    if (!isSelectedGen) {
      setIsSelectedGen(true)
    }
  }

  return (
    <Card>
      <Row className='mb-2'>
        <Typography.Title level={4} className='!my-0'>
          {isEditMode ? 'Edit Product' : 'Add New Product'}
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
        // onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <ImageUpload ref={uploadRef} label='Logo' name='image' rules={[]} form={form} previewImage={previewImage} />

        <Form.Item label='Name' name='name' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Gen' name='gen_id' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <CustomSelector<GenType>
            data={genDataSelector.data?.data}
            isLoading={genDataSelector.isLoading}
            placeholder='Select gens'
            onChange={handleOnChangeGen}
          />
        </Form.Item>
        <Form.Item label='Members' name='member_ids' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <CustomSelector<MemberType>
            data={filterMembersData}
            isLoading={membersData.isLoading}
            placeholder='Select members'
            mode='multiple'
            disabled={!isSelectedGen}
          />
        </Form.Item>
        <Form.Item label='Description' name='description' rules={[{ message: ERROR_MESSAGE.required }]}>
          <Input.TextArea rows={4} className='p-2' />
        </Form.Item>

        <Form.Item
          label='Website'
          name='infor_url'
          rules={[
            { message: ERROR_MESSAGE.required },
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
