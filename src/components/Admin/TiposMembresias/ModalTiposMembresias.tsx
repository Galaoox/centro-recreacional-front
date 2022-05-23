import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { TipoMembresia } from '@models/tipo-membresia';
import { CreateTipoMembresia, GetTipoMembresia, UpdateTipoMembresia } from '@services/tipos-membresia.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalTiposMembresiasProps {
    closeModal: (result: any) => void;
    data: TipoMembresia;
    visible: boolean;
    action: string;
}



const ModalTiposMembresias: FC<ModalTiposMembresiasProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getTipoMembresiaApi = async (id:number) => await callEndpoint(GetTipoMembresia(id));

    const adaptTipoMembresia = (data: TipoMembresia)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            valor: data.valor,
        }) 
    }

    const getTipoMembresia = async()=>{
        if(data?.id && visible){
            const result = await getTipoMembresiaApi(data.id);
            adaptTipoMembresia(result.data);
        }
    }

    const create = async (data: TipoMembresia)=> {
        await callEndpoint(CreateTipoMembresia(data));
    };

    const update = async (id:number,data:Partial<TipoMembresia>) =>{
        await callEndpoint(UpdateTipoMembresia(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getTipoMembresia();
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
                    <Input type="number" required min={1}    />
                </Form.Item>

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalTiposMembresias