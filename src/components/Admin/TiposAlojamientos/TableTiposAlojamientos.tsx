import {  DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ActionsButtonsTable from '@components/ActionsButtonsTable';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ActionButtonTable } from '@models/action-button-table.model';
import { TipoAlojamiento } from '@models/tipo-alojamiento';
import { DeleteTipoAlojamiento, GetAllTiposAlojamiento } from '@services/tipos-alojamiento.service';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import ModalTiposAlojamientos from './ModalTiposAlojamientos';

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
        title: 'Capacidad de personas',
        dataIndex: 'capacidadPersonas',
    },
        {
        title: 'Cantidad disponibles',
        dataIndex: 'cantidadDisponibles',
    },
    {
        title: 'Valor',
        dataIndex: 'valor',
    },
];

const TableTiposAlojamientos = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<TipoAlojamiento[]>([]);
    const [selection, setSelection] = useState<any>(null);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const [action, setAction] = useState<string>('');

    const getApiData = async () => await callEndpoint(GetAllTiposAlojamiento());

    const handleChangeRowSelection = (selectedRowKeys: React.Key[], selectedRows: TipoAlojamiento[]) => {
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
        await callEndpoint(DeleteTipoAlojamiento(selection.id));
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
    const adaptTipoAlojamiento = (data:any)=>{
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
        adaptTipoAlojamiento(result.data);
    }

    const closeModal = async (val: boolean) => {
        if(val) reloadData();
        setVisibleForm(false);
    }
    useAsync(getApiData, adaptTipoAlojamiento, () => {});
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
                visibleForm && (<ModalTiposAlojamientos closeModal={closeModal}  visible={visibleForm} action={action} data={selection} />)
            }
        </>
    )
}





export default TableTiposAlojamientos

