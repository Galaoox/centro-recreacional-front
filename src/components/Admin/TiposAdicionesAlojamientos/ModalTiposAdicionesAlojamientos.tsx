import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { TipoAdicionAlojamientos } from "@models/tipos-adicion-alojamiento";
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';
import { GetTiposAdiciones, CreateTiposAdiciones, UpdateTiposAdiciones } from '@services/tipos-adiciones-alojamiento.service';

interface ModalAdicionAlojamientosProps {
    closeModal: (result: any) => void;
    data: TipoAdicionAlojamientos;
    visible: boolean;
    action: string;
}



const ModalAdicionAlojamiento: FC<ModalAdicionAlojamientosProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getAdicionAlojamientoApi = async (id:number) => await callEndpoint(GetTiposAdiciones(id));

    const adaptAdicionAlojamiento = (data: TipoAdicionAlojamientos)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            valor: data.valor,
        }) 
    }

    const getAdicionAlojamiento = async()=>{
        if(data?.id && visible){
            const result = await getAdicionAlojamientoApi(data.id);
            adaptAdicionAlojamiento(result.data);
        }
    }

    const create = async (data: TipoAdicionAlojamientos)=> {
        await callEndpoint(CreateTiposAdiciones(data));
    };

    const update = async (id:number,data:Partial<TipoAdicionAlojamientos>) =>{
        await callEndpoint(UpdateTiposAdiciones(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getAdicionAlojamiento();
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
            title={action === 'add' ? 'Crear Tipos Adición Alojamiento' : 'Editar Tipos Adición Alojamiento '}
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

export default ModalAdicionAlojamiento