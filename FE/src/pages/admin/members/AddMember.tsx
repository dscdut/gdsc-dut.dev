import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, TOAST_MESSAGE, emailRegex, phoneRegex, urlRegex } from 'src/shared/constant'

// component
import ImageUpload from 'src/components/common/ImageUpload'

// css
import { UploadRef } from 'src/interface/app'
import { Member } from 'src/interface/member'
import styles from './styles.module.scss'
import GensSelector from 'src/components/selectors/GensSelector'
import DepartmentsSelector from 'src/components/selectors/DepartmentsSelector'
import PositionsSelector from 'src/components/selectors/PositionsSelector'
import { useMutation, useQuery } from 'react-query'
import { MemberAPI } from 'src/apis/member.api'
import { MemberBody, MemberType } from 'src/types/member.type'
import axios from 'axios'
import { toast } from 'react-toastify'
import useMedia from 'src/shared/hook/useMedia'
import dayjs from 'dayjs'

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

  const validateField = (regex: RegExp) => (rule: any, value: string, callback: (arg?: string) => void) => {
    if (!value) {
      callback(ERROR_MESSAGE.required)
    } else if (!regex.test(value)) {
      callback(ERROR_MESSAGE.invalid)
    } else {
      callback()
    }
  }
  const validatePhone = validateField(phoneRegex)
  const validateEmail = validateField(emailRegex)

  const getMember = useQuery({
    queryKey: ['id', idMember],
    queryFn: () => {
      return MemberAPI.getMemberById(idMember as string | number)
    },
    enabled: isEdit
  })

  const fetchDetailMember = () => {
    const data: MemberType = getMember.data?.data
    console.log(getMember.data?.data)
    if (data) {
      axios
        .get(data.image.url, { responseType: 'blob' })
        .then(function (response) {
          const blob = response.data

          const values: Member = {
            image: blob,
            full_name: data.full_name,
            birthday: data.birthday,
            phone: data.phone,
            email: data.email,
            infor_url: data.infor_url,
            horoscope_sign: data.horoscope_sign,
            philosophy: data.philosophy,
            feelings: data.feelings,
            gen_id: data.gen?.id,
            department_id: data.department?.id,
            position_id: data.position?.id
          }
          const formValues = {
            ...values,
            birthday: dayjs(values.birthday)
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
      const data: MemberType = getMember.data?.data
      let imageData
      if (uploadRef?.current && previewImage !== uploadRef?.current?.imageUrl) {
        console.log('UPDATE')
        imageData = await uploadImage.mutateAsync(value.image)
      }
      const imageId = imageData ? imageData?.data[0]?.id : data.image.id
      const member: MemberBody = {
        image_id: imageId,
        full_name: value.full_name,
        birthday: value.birthday,
        phone: value.phone,
        email: value.email,
        infor_url: value.infor_url,
        gen_id: value.gen_id,
        department_id: value.department_id,
        position_id: value.position_id,
        horoscope_sign: value.horoscope_sign,
        philosophy: value.philosophy,
        feelings: value.feelings
      }
      if (isEdit) {
        await updateMember.mutateAsync(member)
      } else {
        await createMember.mutateAsync(member)
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
        onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <Row gutter={[24, 24]}>
          <Col md={24} lg={6}>
            <ImageUpload
              label='Avatar'
              ref={uploadRef}
              name='image_url'
              rules={[{ required: true, message: ERROR_MESSAGE.required }]}
              previewImage={previewImage}            />
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
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[{ validator: validatePhone, required: true }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item
                  label='Birthday'
                  name='birthday'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <DatePicker className='h-full w-full' />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item
                  label='Gen'
                  name='gen_id'
                  rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign='left'
                >
                  <GensSelector />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ validator: validateEmail, required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Link facebook/ instagram'
              name='infor_url'
              rules={[{ pattern: new RegExp(urlRegex), message: ERROR_MESSAGE.invalid }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              label='Position'
              name='position_id'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <PositionsSelector />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Department'
              name='department_id'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign='left'
            >
              <DepartmentsSelector />
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
          <Input />
        </Form.Item>
        <Form.Item
          label='Motto/ Favorite Saying'
          name='philosophy'
          rules={[{ required: true, message: ERROR_MESSAGE.required }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          labelAlign='left'
        >
          <Input.TextArea />
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
                  <Button type='primary' htmlType='submit' className='mx-2'>
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
