import {  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ActionsButtonsTable from '@components/ActionsButtonsTable';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ActionButtonTable } from '@models/action-button-table.model';
import { TipoDocumento } from '@models/tipo-documento';
import { DeleteTipoDocumento, GetAllTiposDocumento } from '@services/tipos-documento.service';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import ModalTiposDocumento from './ModalTiposDocumento';

const { confirm } = Modal;

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre',
    },

];

const TableTiposDocumento = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<TipoDocumento[]>([]);
    const [selection, setSelection] = useState<any>(null);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const getApiData = async () => await callEndpoint(GetAllTiposDocumento());

    const handleChangeRowSelection = (selectedRowKeys: React.Key[], selectedRows: TipoDocumento[]) => {
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
        await callEndpoint(DeleteTipoDocumento(selection.id));
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
    const adaptTipoDocumento = (data:any)=>{
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
        adaptTipoDocumento(result.data);
    }

    const closeModal = async (val: boolean) => {
        if(val) reloadData();
        setVisibleForm(false);
    }
    useAsync(getApiData, adaptTipoDocumento, () => {});
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
                visibleForm && (<ModalTiposDocumento closeModal={closeModal}  visible={visibleForm} action={action} data={selection} />)
            }
        </>
    )
}





export default TableTiposDocumento

