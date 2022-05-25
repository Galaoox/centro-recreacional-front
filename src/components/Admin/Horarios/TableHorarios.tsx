import {  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ActionsButtonsTable from '@components/ActionsButtonsTable';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ActionButtonTable } from '@models/action-button-table.model';
import { Horarios } from "@models/horarios";
import { DeleteHorarios, GetAllHorarios } from '@services/horarios.service';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import ModalHorarios from './ModalHorarios';

const { confirm } = Modal;

const columns = [

    {
        title: 'Nombre',
        dataIndex: 'nombre',
    },
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
    },
    {
        title: 'Hora Inicial',
        dataIndex: 'horaInicial',
    },
        {
        title: 'Hora Final',
        dataIndex: 'horaFinal',
    },

];

const TableHorarios = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<Horarios[]>([]);
    const [selection, setSelection] = useState<any>(null);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const getApiData = async () => await callEndpoint(GetAllHorarios());

    const handleChangeRowSelection = (selectedRowKeys: React.Key[], selectedRows: Horarios[]) => {
        setSelection(selectedRows[0] ? selectedRows[0] : null);
    };

    const handleAdd = () => {
        setVisibleForm(true);
        setAction('add');
    }

    const handleEdit = () => {
        setAction('edit');
        setVisibleForm(true);
    }

    const remove = async()=>{
        await callEndpoint(DeleteHorarios(selection.id));
        await reloadData();
    }

    const handleRemove = () => {
        confirm({
            title: 'Esta seguro que desea eliminar el registro?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                remove();
            }

          });
        
    }
    const adaptHorarios = (data:any)=>{
        setData(data);
    }

   

    const buttonsActions: ActionButtonTable[] = [
        {
            key: 'add',
            label: 'Crear',
            icon: PlusCircleOutlined,
            action: handleAdd,
            disabled: false,
            loading: loading,
        },
        {
            key: 'edit',
            label: 'Editar',
            icon: EditOutlined,
            action: handleEdit,
            disabled: !selection,
            loading: loading,
        },
        {
            key: 'remove',
            label: 'Eliminar',
            icon: DeleteOutlined,
            action: handleRemove,
            disabled: !selection,
            loading: loading,
        },
    ]

    const reloadData = async ()=>{
        const result = await getApiData();
        adaptHorarios(result.data);
    }

    const closeModal = async (val: boolean) => {
        if(val) reloadData();
        setVisibleForm(false);
    }
    useAsync(getApiData, adaptHorarios, () => {});
    return (
        <>
            <ActionsButtonsTable items={buttonsActions} />
            <Table
                rowSelection={{
                    type: 'radio',
                    onChange: handleChangeRowSelection,
                }}
                columns={columns}
                rowKey={'id'}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />
            {
                visibleForm && (<ModalHorarios closeModal={closeModal}  visible={visibleForm} action={action} data={selection} />)
            }
        </>
    )
}





export default TableHorarios

