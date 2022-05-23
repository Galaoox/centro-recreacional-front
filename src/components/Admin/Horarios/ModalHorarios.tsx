import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { Horarios } from "@models/horarios";
import { CreateHorarios, GetHorarios, UpdateHorarios } from '@services/horarios.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalHorariosProps {
    closeModal: (result: any) => void;
    data: Horarios;
    visible: boolean;
    action: string;
}



const ModalHorarios: FC<ModalHorariosProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getHorariosApi = async (id:number) => await callEndpoint(GetHorarios(id));

    const adaptHorarios = (data: Horarios)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            horaInicial: data.horaInicial,
            horaFinal: data.horaFinal,
        }) 
    }

    const getHorarios = async()=>{
        if(data?.id && visible){
            const result = await getHorariosApi(data.id);
            adaptHorarios(result.data);
        }
    }

    const create = async (data: Horarios)=> {
        await callEndpoint(CreateHorarios(data));
    };

    const update = async (id:number,data:Partial<Horarios>) =>{
        await callEndpoint(UpdateHorarios(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getHorarios();
        }
        return ()=>{

        }
    },[]);


    const handleSubmit = async () => {
        try{
            let result = await form.validateFields();
            result.cantidadDisponibles = Number(result.cantidadDisponibles);
            result.capacidadPersonas = Number(result.capacidadPersonas);
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
        horaInicial: [{ required: true, message: 'La hora inicial es requerida' }],
        horaFinal: [{ required: true, message: 'La hora final es requerida' }],
    }

    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear Horario' : 'Editar Horario'}
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
                    <Input type='text' required />
                </Form.Item>

                <Form.Item name='descripcion' label="Descripcion" rules={rulesForm.descripcion}>
                    <Input.TextArea required />
                </Form.Item>

                <Form.Item name='horaInicial' label="Hora Inicial" rules={rulesForm.horaInicial}>
                    <Input type='text' required />
                </Form.Item>

                <Form.Item name='horaFinal' label="Hora Final" rules={rulesForm.horaFinal}>
                    <Input type='text' required />
                </Form.Item>

                

            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalHorarios