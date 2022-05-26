import React from 'react'

import TableAtracciones from '@components/Admin/Atracciones/TableAtracciones';
import { Typography } from 'antd';

const {Title} = Typography

const AtraccionesAdmin = () => {
  return (
    <>
        <Title level={1}>Atracciones</Title>
        <TableAtracciones/>
    </>
  )
}

export default AtraccionesAdmin