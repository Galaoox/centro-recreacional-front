import {  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ActionsButtonsTable from '@components/ActionsButtonsTable';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ActionButtonTable } from '@models/action-button-table.model';
import { TiposEntradas } from "@models/tipos-entradas.model";
import { DeleteTiposEntradas, GetAllTiposEntradas } from '@services/tipos-entradas.service';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import ModalTiposEntradas from './ModalTiposEntradas'

const { confirm } = Modal;

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
    },
    {
        title: 'Descripción',
        dataIndex: 'descripcion',
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
    },

];

const TableTiposEntradas = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<TiposEntradas[]>([]);
    const [selection, setSelection] = useState<any>(null);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const getApiData = async () => await callEndpoint(GetAllTiposEntradas());

    const handleChangeRowSelection = (selectedRowKeys: React.Key[], selectedRows: TiposEntradas[]) => {
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
        await callEndpoint(DeleteTiposEntradas(selection.id));
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
    const adaptTiposEntradas = (data:any)=>{
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
        adaptTiposEntradas(result.data);
    }

    const closeModal = async (val: boolean) => {
        if(val) reloadData();
        setVisibleForm(false);
    }
    useAsync(getApiData, adaptTiposEntradas, () => {});
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
                visibleForm && (<ModalTiposEntradas closeModal={closeModal}  visible={visibleForm} action={action} data={selection} />)
            }
        </>
    )
}





export default TableTiposEntradas

