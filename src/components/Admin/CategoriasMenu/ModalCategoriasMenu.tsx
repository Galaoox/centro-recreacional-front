import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { CategoriasMenu } from "@models/categorias-menu";
import { CreateCategoriasMenu, GetCategoriasMenu, UpdateCategoriasMenu } from '@services/categorias-menu.service';
import { Modal, Button, Form, Input, Row, Col } from 'antd';
import { FC, useEffect } from 'react';

interface ModalCategoriasMenuProps {
    closeModal: (result: any) => void;
    data: CategoriasMenu;
    visible: boolean;
    action: string;
}



const ModalCategoriasMenu: FC<ModalCategoriasMenuProps> = ({ closeModal, visible, data,action  }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();

    const getCategoriasMenuApi = async (id:number) => await callEndpoint(GetCategoriasMenu(id));

    const adaptCategoriasMenu = (data: CategoriasMenu)=>{
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
        }) 
    }

    const getCategoriasMenu = async()=>{
        if(data?.id && visible){
            const result = await getCategoriasMenuApi(data.id);
            adaptCategoriasMenu(result.data);
        }
    }

    const create = async (data: CategoriasMenu)=> {
        await callEndpoint(CreateCategoriasMenu(data));
    };

    const update = async (id:number,data:Partial<CategoriasMenu>) =>{
        await callEndpoint(UpdateCategoriasMenu(id,data));
    }

    useEffect(()=>{
        if(action === 'edit'){
            getCategoriasMenu();
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

export default ModalCategoriasMenu