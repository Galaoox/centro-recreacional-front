import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ElementoMenu } from "@models/elemento-menu";
import { GetAllCategoriasMenu } from '@services/categorias-menu.service';
import { CreateElementoMenu, GetElementoMenu, UpdateElementoMenu } from '@services/elementos-menu.service';
import { Modal, Button, Form, Input, Row, Col, Select } from 'antd';
import { FC, useEffect, useState } from 'react';

const { Option } = Select;

interface ModalElementosMenusProps {
    closeModal: (result: any) => void;
    data: ElementoMenu;
    visible: boolean;
    action: string;
}



const ModalElementosMenus: FC<ModalElementosMenusProps> = ({ closeModal, visible, data, action }) => {
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [listCategorias, setListCategorias] = useState<any[]>([]);

    const getElementoMenuApi = async (id: number) => await callEndpoint(GetElementoMenu(id));

    const adaptElementoMenu = (data: ElementoMenu) => {
        form.setFieldsValue({
            nombre: data.nombre,
            descripcion: data.descripcion,
            valor: data.valor,
            categoriaMenuId: data.categoriaMenuId,
        })
    }

    const getElementoMenu = async () => {
        if (data?.id && visible) {
            const result = await getElementoMenuApi(data.id);
            adaptElementoMenu(result.data);
        }
    }

    const create = async (data: ElementoMenu) => {
        await callEndpoint(CreateElementoMenu(data));
    };

    const update = async (id: number, data: Partial<ElementoMenu>) => {
        await callEndpoint(UpdateElementoMenu(id, data));
    }

    useEffect(() => {
        if (action === 'edit') {
            getElementoMenu();
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
        categoriaMenuId: [{ required: true, message: 'La categoria es requerida' }],
    }

    const getDataListCategoria = async () => await callEndpoint(GetAllCategoriasMenu());

    const adaptListCategoria = async (res: any) => {
        setListCategorias(res);
    }

    useAsync(getDataListCategoria, adaptListCategoria, () => { });


    return (
        <Modal
            forceRender
            visible={visible}
            title={action === 'add' ? 'Crear Elemento Menú' : 'Editar Elemento Menú'}
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

                <Form.Item name='categoriaMenuId' label="Categoría" rules={rulesForm.categoriaMenuId}>
                    <Select style={{ width: '100%' }} >
                        {listCategorias.map((item: any) => (<Option value={item.id}>{item.nombre}</Option>))}
                    </Select>
                </Form.Item>



            </Form>
        </Modal>
    )
}

const style = {

}

export default ModalElementosMenus