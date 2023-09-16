import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, TOAST_MESSAGE, phoneRegex, urlRegex } from 'src/shared/constant'

// component
import ImageUpload from 'src/components/common/ImageUpload'

// css
import { UploadRef } from 'src/interface/app'
import { Member } from 'src/interface/member'
import styles from './styles.module.scss'
import { useMutation, useQuery } from 'react-query'
import { MemberBody, MemberDetailType } from 'src/types/member.type'
import axios from 'axios'
import { toast } from 'react-toastify'
import useMedia from 'src/shared/hook/useMedia'
import dayjs from 'dayjs'
import { MemberAPI } from 'src/apis/members.api'
import { omit } from 'lodash'
import FormGens from './FormGens'
import PATH_URL from 'src/shared/path'

export default function CreateMember() {
  const uploadRef = useRef<UploadRef>(null)
  const [fieldsData, setFieldsData] = useState<FieldData<Member>[]>([])
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const [form] = useForm()
  const { id: idMember } = useParams()
  const isEdit = Boolean(idMember)
  const uploadImage = useMedia().UploadImage()

  const getMember = useQuery({
    queryKey: ['id', idMember],
    queryFn: () => {
      return MemberAPI.getMemberById(idMember as string | number)
    },
    enabled: isEdit
  })

  const fetchDetailMember = () => {
    const data: MemberDetailType = getMember.data?.data
    if (data) {
      axios
        .get(data.image.url, { responseType: 'blob' })
        .then(function (response) {
          const blob = response.data
          const formValues: Member = {
            ...data,
            image: blob,
            birthday: dayjs(data.birthday),
            gens: data.gens.map((gen) => ({
              gen_id: gen.gen.gen_id,
              departments_id: gen.department.department_id,
              positions_id: gen.position.position_id,
              products_id: gen.products.map((product) => product.product_id)
            }))
          }
          form.setFieldsValue(formValues)
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
    if (isEdit) {
      fetchDetailMember()
    }
  }, [isEdit, getMember.data])

  const createMember = useMutation({
    mutationFn: (member: MemberBody) => {
      return MemberAPI.createMember(member)
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const updateMember = useMutation({
    mutationFn: (member: MemberBody) => {
      return MemberAPI.updateMember(member, Number(idMember))
    },
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.SUCCESS)
    }
  })

  const onSubmit = async (value: Member) => {
    try {
      setConfirmLoading(true)
      const data: MemberDetailType = getMember.data?.data
      let imageData
      if (uploadRef?.current && previewImage !== uploadRef?.current?.imageUrl) {
        imageData = await uploadImage.mutateAsync(value.image)
      }
      const imageId = imageData ? imageData?.data[0]?.id : data.image.id
      const member: MemberBody = omit(
        {
          ...value,
          birthday: dayjs(value.birthday).format('YYYY-MM-DD'),
          image_id: imageId
        },
        ['image']
      )
      if (isEdit) {
        await updateMember.mutateAsync(member)
      } else {
        await createMember.mutateAsync(member)
      }
      navigate(`${PATH_URL.members}`)
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
          {idMember ? 'Edit Member' : 'Create a new core team member'}
        </Typography.Title>
      </Row>
      <Form
        fields={fieldsData}
        form={form}
        className={styles.formWrapper}
        name='MemberForm'
        layout='vertical'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        rootClassName='mx-auto'
        style={{ maxWidth: 900 }}
        onFinish={onSubmit}
        autoComplete='off'
        // onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <Row gutter={[24, 24]}>
          <Col md={24} lg={6}>
            <ImageUpload
              label='Avatar'
              ref={uploadRef}
              name='image'
              rules={[{ required: true, message: ERROR_MESSAGE.required }]}
              form={form}
              previewImage={previewImage}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            />
          </Col>

          <Col md={24} lg={18}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={24}>
                <Form.Item
                  label='Full Name'
                  name='full_name'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input className='p-2' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[
                    { required: true, message: ERROR_MESSAGE.required },
                    { pattern: new RegExp(phoneRegex), message: ERROR_MESSAGE.invalid }
                  ]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input className='p-2' />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label='Birthday'
                  name='birthday'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <DatePicker className='h-full w-full p-2' />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <FormGens />

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: ERROR_MESSAGE.required },
                { type: 'email', message: ERROR_MESSAGE.invalid }
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input className='p-2' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Link facebook/ instagram'
              name='infor_url'
              rules={[
                { required: true, message: ERROR_MESSAGE.required },
                { pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input className='p-2' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label='Horoscope'
          name='horoscope_sign'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input className='p-2' />
        </Form.Item>
        <Form.Item
          label='Motto/ Favorite Saying'
          name='philosophy'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input.TextArea className='p-2' />
        </Form.Item>

        <Form.Item
          label='Feelings'
          name='feelings'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input.TextArea className='!h-44' />
        </Form.Item>

        <Form.Item label='Button' className={styles['form-item__label--invisible']}>
          <Row align='middle' justify='center' gutter={[16, 16]}>
            <Col span={24}>
              <Row justify='center'>
                <Col className='text-center'>
                  <Button
                    type='default'
                    htmlType='reset'
                    onClick={() => {
                      if (!isEdit) {
                        form.setFieldValue('image', null)
                        uploadRef.current?.onReset()
                      } else {
                        fetchDetailMember()
                      }
                    }}
                    className='mx-2'
                  >
                    Clear
                  </Button>
                </Col>

                <Col className='text-center'>
                  <Button type='primary' htmlType='submit' className='mx-2' loading={confirmLoading}>
                    {idMember ? 'Edit' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  )
}
