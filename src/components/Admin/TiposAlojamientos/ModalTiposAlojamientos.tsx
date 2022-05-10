import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { useLoading } from '@hooks/useLoading';
import { TipoAlojamiento } from '@models/tipo-alojamiento';
import { CreateTipoAlojamiento } from '@services/tipos-alojamiento.service';
import { formIsValid } from '@utilities/form.utility';
import { Modal, Button, Form, DatePicker, InputNumber, Switch, Cascader, TreeSelect, Select, Input, Radio, Row, Col } from 'antd';
import { FC, useState } from "react";

interface ModalTiposAlojamientosProps {
    closeModal: (result: any) => void;
    data: any;
    visible: boolean;
    action: string;
}



const ModalTiposAlojamientos: FC<ModalTiposAlojamientosProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const create = async (data: TipoAlojamiento)=> {
        const result = await callEndpoint(CreateTipoAlojamiento(data));
    };



    const handleSubmit = async () => {
        try{
            let result = await form.validateFields();
            result.cantidadDisponibles = Number(result.cantidadDisponibles);
            result.capacidadPersonas = Number(result.capacidadPersonas);
            result.valor = Number(result.valor);


            if (action =='add') {
                await create(result);
            }else{

            }
            closeModal(true);
        }catch(e){

        }
    }




    const rulesForm = {
        nombre: [{ required: true, message: 'El nombre es requerido' }],
        descripcion: [{ required: true, message: 'La descripción es requerida' }],
        capacidadPersonas: [{ required: true, message: 'La capacidad de personas es requerida' }],
        cantidadDisponibles: [{ required: true, message: 'La cantidad disponibles es requerida' }],
        valor: [{ required: true, message: 'El valor es requerido' }],
    }


    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear tipo de alojamiento' : 'Editar tipo de alojamiento'}
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

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name='capacidadPersonas' label="Capacidad de personas" rules={rulesForm.capacidadPersonas} >
                            <Input type="number" required min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name='cantidadDisponibles' label="Cantidad" rules={rulesForm.cantidadDisponibles}>
                            <Input type="number" required min={0} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name='valor' label="Valor" rules={rulesForm.valor}>
                    <Input type="number" required min={1}    />
                </Form.Item>

                <Form.Item  label="Imagen">
                    <Input type="file" />
                </Form.Item>

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalTiposAlojamientos