import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllEntradasByUsuario } from '@services/entradas.service';
import { Table, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const InfoEntradas = () => {
    const [data, setData] = useState([]);
    const { loading, callEndpoint } = useFetchAndLoad();

    const getData = async () => await callEndpoint(GetAllEntradasByUsuario());

    const adaptData = (res: any) => {
        setData(res);
    };

    useAsync(getData, adaptData, () => { });

    const columns = [
        {
            title: 'Tipo entrada',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Fecha de adquisicion',
            dataIndex: 'fechaCompra',
            key: 'fechaCompra',
        },
        {
            title: 'Valor unitario',
            dataIndex: 'valorUnitario',
            key: 'valorUnitario',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Valor total',
            dataIndex: 'valorTotal',
            key: 'valorTotal',
        },
    ];

  return (
    <>
            <Title level={2}>Informacion Entradas</Title>
            <Table dataSource={data} columns={columns} />
    </>
  )
}

export default InfoEntradas