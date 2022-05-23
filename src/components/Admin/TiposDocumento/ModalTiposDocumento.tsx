import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { TipoDocumento } from '@models/tipo-documento';
import { CreateTipoDocumento, GetTipoDocumento, UpdateTipoDocumento } from '@services/tipos-documento.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalTiposDocumentoProps {
    closeModal: (result: any) => void;
    data: TipoDocumento;
    visible: boolean;
    action: string;
}



const ModalTiposDocumento: FC<ModalTiposDocumentoProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getTipoDocumentoApi = async (id:number) => await callEndpoint(GetTipoDocumento(id));

    const adaptTipoDocumento = (data: TipoDocumento)=>{
        form.setFieldsValue({
            nombre: data.nombre,
        }) 
    }

    const getTipoDocumento = async()=>{
        if(data?.id && visible){
            const result = await getTipoDocumentoApi(data.id);
            adaptTipoDocumento(result.data);
        }
    }

    const create = async (data: TipoDocumento)=> {
        await callEndpoint(CreateTipoDocumento(data));
    };

    const update = async (id:number,data:Partial<TipoDocumento>) =>{
        await callEndpoint(UpdateTipoDocumento(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getTipoDocumento();
        }
        return ()=>{

        }
    },[]);


    const handleSubmit = async () => {
        try{
            let result = await form.validateFields();
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
    }

    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear tipo de documento' : 'Editar tipo de documento'}
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

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalTiposDocumento