import React from 'react'
import { Typography } from 'antd';
import TableTiposAdicionesAlojamientos from '@components/Admin/TiposAdicionesAlojamientos/TableTiposAdicionesAlojamientos';
const { Title } = Typography;


const TiposAdicionesAlojamiento = () => {
  return (
    <>
        <Title level={1}>Tipos de Adiciones de Alojamientos</Title>
        < TableTiposAdicionesAlojamientos />
        
    </>
  )
}

export default TiposAdicionesAlojamiento