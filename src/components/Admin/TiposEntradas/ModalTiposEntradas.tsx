import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { TiposEntradas } from "@models/tipos-entradas.model";
import { CreateTiposEntradas, GetTiposEntradas, UpdateTiposEntradas } from '@services/tipos-entradas.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalTiposEntradasProps {
    closeModal: (result: any) => void;
    data: TiposEntradas;
    visible: boolean;
    action: string;
}



const ModalTiposEntradas: FC<ModalTiposEntradasProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getTiposEntradasApi = async (id:number) => await callEndpoint(GetTiposEntradas(id));

    const adaptTiposEntradas = (data: TiposEntradas)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
        }) 
    }

    const getTiposEntradas = async()=>{
        if(data?.id && visible){
            const result = await getTiposEntradasApi(data.id);
            adaptTiposEntradas(result.data);
        }
    }

    const create = async (data: TiposEntradas)=> {
        await callEndpoint(CreateTiposEntradas(data));
    };

    const update = async (id:number,data:Partial<TiposEntradas>) =>{
        await callEndpoint(UpdateTiposEntradas(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getTiposEntradas();
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
        valor: [{ required: true, message: 'El valor es requerido' }],
    }

    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear Tipos Entradas' : 'Editar Tipos Entradas '}
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
                    <Input type="number" required min={1}    />
                </Form.Item>

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalTiposEntradas