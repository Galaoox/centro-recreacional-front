import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { atracciones } from "@models/atracciones";
import { CreateAtracciones, GetAtracciones, UpdateAtracciones } from '@services/atracciones.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalAtraccionesProps {
    closeModal: (result: any) => void;
    data: atracciones;
    visible: boolean;
    action: string;
}



const ModalAtracciones: FC<ModalAtraccionesProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getAtraccionesApi = async (id:number) => await callEndpoint(GetAtracciones(id));

    const adaptAtracciones = (data: atracciones)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
        }) 
    }

    const getAtracciones = async()=>{
        if(data?.id && visible){
            const result = await getAtraccionesApi(data.id);
            adaptAtracciones(result.data);
        }
    }

    const create = async (data: atracciones)=> {
        await callEndpoint(CreateAtracciones(data));
    };

    const update = async (id:number,data:Partial<atracciones>) =>{
        await callEndpoint(UpdateAtracciones(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getAtracciones();
        }
        return ()=>{

        }
    },[]);


    const handleSubmit = async () => {
        try{
            let result = await form.validateFields();
            result.valor = Number(result.valor);
            if (action =='add') {
                await create(result);
            }else{
                if(data.id) await update(data.id,result);
            }
            closeModal(true);
        }catch(e){
            console.log(e);
        }
    }




    const rulesForm = {
        nombre: [{ required: true, message: 'El nombre es requerido' }],
        descripcion: [{ required: true, message: 'La descripción es requerida' }],
    }

    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear categoría menú' : 'Editar categoría menú'}
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

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalAtracciones