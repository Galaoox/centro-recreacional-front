import { useAsync } from '@hooks/useAsync';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllHorarios } from '@services/horarios.service';
import { Table, Typography } from 'antd';
import { useState } from 'react';
const { Title } = Typography;


const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
        title: 'Descripcion',
        dataIndex: 'descripcion',
        key: 'descripcion',
      },
    {
      title: 'Hora inicial',
      dataIndex: 'horaInicial',
      key: 'horaInicial',
    },
    {
      title: 'Hora Final',
      dataIndex: 'horaFinal',
      key: 'horaFinal',
    },
  ];

const Horarios = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const [data, setData] = useState<any>([]);

    const getApiData = async () => await callEndpoint(GetAllHorarios());

    const adaptHorarios = (horarios: any) => {
        setData(horarios);
    }

    useAsync(getApiData, adaptHorarios, () => { });


    return (
        <>
            <Title level={1}>Horarios</Title>
            <Table 
            dataSource={data} 
            pagination={{
                pageSize: 10,
            }} 
            columns={columns}
            
            />
        </>
    )
}

export default Horarios