/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Col, Form, Row } from 'antd'
import CustomSelector from 'src/components/selectors/CustomSelector'
import { ERROR_MESSAGE } from 'src/shared/constant'
import useGetData from 'src/shared/hook/useGetData'
import { Department } from 'src/types/department.type'
import { Gen } from 'src/types/gens.type'
import { Position } from 'src/types/positions.type'

export default function FormGens() {
  const genDataSelector = useGetData('gens')
  const genDataPosition = useGetData('positions')
  const genDataDepartment = useGetData('departments')
  return (
    <Form.List name='gens' initialValue={[{}]}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, index) => (
              <Row key={field.key} gutter={24}>
                <Col span={7}>
                  <Form.Item
                    name={[index, 'gen_id']}
                    rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                    label={<span>Gens</span>}
                  >
                    <CustomSelector<Gen>
                      data={genDataSelector.data?.data}
                      isLoading={genDataSelector.isLoading}
                      placeholder='Select gen'
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name={[index, 'departments_id']}
                    rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                    label={<span>Department</span>}
                  >
                    <CustomSelector<Department>
                      data={genDataDepartment.data?.data}
                      isLoading={genDataDepartment.isLoading}
                      placeholder='Select department'
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name={[index, 'positions_id']}
                    rules={[{ required: true, message: ERROR_MESSAGE.required }]}
                    label={<span>Position</span>}
                  >
                    <CustomSelector<Position>
                      data={genDataPosition.data?.data}
                      isLoading={genDataPosition.isLoading}
                      placeholder='Select position'
                    />
                  </Form.Item>
                </Col>
                <Col className='hidden'>
                  <Form.Item name={[index, 'products_id']} label={<span>Position</span>} initialValue={[0]}>
                    <CustomSelector<Position>
                      data={genDataPosition.data?.data}
                      isLoading={genDataPosition.isLoading}
                      placeholder='Select position'
                      mode='multiple'
                    />
                  </Form.Item>
                </Col>
                <Col span={3} className='flex items-center gap-4'>
                  <div className='flex cursor-pointer items-center' onClick={() => add()}>
                    <PlusCircleOutlined className='text-2xl' />
                  </div>
                  {index > 0 && (
                    <div className='flex cursor-pointer items-center' onClick={() => remove(index)}>
                      <MinusCircleOutlined className='text-2xl' />
                    </div>
                  )}
                </Col>
              </Row>
            ))}
          </>
        )
      }}
    </Form.List>
  )
}
