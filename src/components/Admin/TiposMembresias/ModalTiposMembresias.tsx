import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { TipoMembresia } from '@models/tipo-membresia';
import { CreateTipoMembresia, GetTipoMembresia, GetTiposDescuentos, UpdateTipoMembresia } from '@services/tipos-membresia.service';
import { Modal, Button, Form, Input, Row, Col, Space, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
const { Option } = Select;

interface ModalTiposMembresiasProps {
    closeModal: (result: any) => void;
    data: TipoMembresia;
    visible: boolean;
    action: string;
}



const ModalTiposMembresias: FC<ModalTiposMembresiasProps> = ({ closeModal, visible, data, action }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [listDescuentos, setListDescuentos] = useState([]);

    const getTipoMembresiaApi = async (id: number) => await callEndpoint(GetTipoMembresia(id));

    const adaptTipoMembresia = (data: any) => {
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            valor: data.valor,
            descuentos: data.descuentos,
        })
    }

    const getTipoMembresia = async () => {
        if (data?.id && visible) {
            const result = await getTipoMembresiaApi(data.id);
            adaptTipoMembresia(result.data);
        }
    }

    const create = async (data: TipoMembresia) => {
        await callEndpoint(CreateTipoMembresia(data));
    };

    const update = async (id: number, data: Partial<TipoMembresia>) => {
        await callEndpoint(UpdateTipoMembresia(id, data));
    }

    useEffect(() => {
        if (action === 'edit') {
            getTipoMembresia();
        }
        return () => {

        }
    }, []);


    const handleSubmit = async () => {
        try {
            let result = await form.validateFields();
            result.valor = Number(result.valor);
            if (action == 'add') {
                await create(result);
            } else {
                if (data.id) await update(data.id, result);
            }
            closeModal(true);
        } catch (e) {
            console.log(e);
        }
    }




    const rulesForm = {
        nombre: [{ required: true, message: 'El nombre es requerido' }],
        descripcion: [{ required: true, message: 'La descripción es requerida' }],
        valor: [{ required: true, message: 'El valor es requerido' }],
    }

    const getDataListDescuentos = async () => await callEndpoint(GetTiposDescuentos());

    const adaptTipoDescuentos = (data: any) => {
        setListDescuentos(data);
    };

    useAsync(getDataListDescuentos, adaptTipoDescuentos, () => { });


    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear tipo de membresia' : 'Editar tipo de membresia'}
            onCancel={closeModal}
            footer={[
                <Button key="back" onClick={closeModal}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Guardar
                </Button>,
            ]}
            destroyOnClose={true}
            maskClosable={false}
        >

            <Form
                layout="vertical"
                form={form}
            >
                <Form.Item name='nombre' label="Nombre" rules={rulesForm.nombre}>
                    <Input type='text' required maxLength={50} />
                </Form.Item>

                <Form.Item name='descripcion' label="Descripcion" rules={rulesForm.descripcion}>
                    <Input.TextArea required />
                </Form.Item>

                <Form.Item name='valor' label="Valor" rules={rulesForm.valor}>
                    <Input type="number" required min={1} />
                </Form.Item>

                <Form.List name="descuentos" initialValue={[{
                    type: '',
                    value: '',
                }]} >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={16} align='middle' key={key}>
                                    <Col span={11}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'type']}
                                            rules={[{ required: true, message: 'El tipo es requerido' }]}
                                            label="Tipo"
                                        >
                                            <Select style={{ width: '100%' }} >
                                                {listDescuentos.map((item: any) => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={11}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            rules={[{ required: true, message: 'El porcentaje es requerido' }]}
                                            label="Porcentaje"
                                        >
                                            <Input type="number" placeholder="Porcentaje de descuento" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} style={{ textAlign: 'center' }} >
                                        <Button type="text" onClick={() => remove(name)} block icon={<MinusCircleOutlined />} disabled={fields.length <= 1}>
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={fields.length >= 2}>
                                    Agregar Descuento
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalTiposMembresias