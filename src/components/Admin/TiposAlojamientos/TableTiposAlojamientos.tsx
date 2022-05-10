import {  DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import ActionsButtonsTable from '@components/ActionsButtonsTable';
import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { ActionButtonTable } from '@models/action-button-table.model';
import { TipoAlojamiento } from '@models/tipo-alojamiento';
import { GetAllTiposAlojamiento } from '@services/tipos-alojamiento.service';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import ModalTiposAlojamientos from './ModalTiposAlojamientos';


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

    const getApiData = async () => await callEndpoint(GetAllTiposAlojamiento());

    const handleChangeRowSelection = (selectedRowKeys: React.Key[], selectedRows: TipoAlojamiento[]) => {
        setSelection(selectedRows[0] ? selectedRows[0] : null);
    };

    const handleAdd = () => {
        setVisibleForm(true);
    }

    const handleEdit = () => {
        setVisibleForm(true);
    }

    const handleRemove = () => {
        
    }
    const adaptTipoAlojamiento = (data:any)=>{
        setData(data);
    }

    useAsync(getApiData, adaptTipoAlojamiento, () => {});

    const buttonsActions: ActionButtonTable[] = [
        {
            key: 'add',
            label: 'Crear',
            icon: PlusCircleOutlined,
            action: handleAdd,
            disabled: false,
        },
        {
            key: 'edit',
            label: 'Editar',
            icon: EditOutlined,
            action: handleEdit,
            disabled: !selection,
        },
        {
            key: 'remove',
            label: 'Eliminar',
            icon: DeleteOutlined,
            action: handleRemove,
            disabled: !selection,
        },
    ]

    const showModal = () => {
        setVisibleForm(true);
    }

    const closeModal = () => {
        setVisibleForm(false);
    }

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
            />
            <ModalTiposAlojamientos closeModal={closeModal} title='Tipos de alojamientos' visible={visibleForm} data={selection}>
            </ModalTiposAlojamientos>
        </>
    )
}





export default TableTiposAlojamientos

