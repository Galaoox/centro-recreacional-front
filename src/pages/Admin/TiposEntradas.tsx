import React from 'react'
import { Typography } from 'antd';
import TableTiposEntradas from '@components/Admin/TiposEntradas/TableTiposentradas';
const { Title } = Typography;

const TiposEntradas = () => {
  return (
    <>
        <Title level={1}>Tipos Entradas</Title>
        < TableTiposEntradas />
        
    </>
  )
}

export default TiposEntradas