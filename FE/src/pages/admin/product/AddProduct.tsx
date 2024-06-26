import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

// config / constant
import { FieldData } from 'src/interface'
import { ERROR_MESSAGE, urlRegex } from 'src/shared/constant'

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

export default function CreateSponsor() {
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

  const onSubmit = async (value: Product) => {
    // handle submit here!
  }

  const handleOnChangeGen = () => {
    const genValue: number[] = form.getFieldValue('gen_ids')
    const filterData = (membersData.data?.data.content as MemberType[]).filter((member) =>
      genValue.includes(member.gen.id)
    )
    setFilterMembersData(filterData)
    if (!isSelectedGen) {
      setIsSelectedGen(true)
    } else if (form.getFieldValue('gen_ids').length === 0) {
      setIsSelectedGen(false)
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
        onFieldsChange={(_, allFields) => setFieldsData(allFields)}
      >
        <ImageUpload ref={uploadRef} label='Logo' name='image' rules={[]} form={form} previewImage={previewImage} />

        <Form.Item label='Name' name='name' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <Input className='p-2' />
        </Form.Item>
        <Form.Item label='Gens' name='gen_ids' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
          <CustomSelector<GenType>
            data={genDataSelector.data?.data}
            isLoading={genDataSelector.isLoading}
            placeholder='Select gens'
            mode='multiple'
            onChange={handleOnChangeGen}
          />
        </Form.Item>
        <Form.Item label='Members' name='members' rules={[{ required: true, message: ERROR_MESSAGE.required }]}>
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
                    // fetchDetailApi()
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
