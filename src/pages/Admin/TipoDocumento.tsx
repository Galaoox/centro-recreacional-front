import { Typography } from 'antd';
import TableTiposDocumento from '@components/Admin/TiposDocumento/TableTiposDocumento';

const { Title } = Typography;


const TiposDocumento = () => {
  return (
    <>
        <Title level={1}>Tipos de documento</Title>
        <TableTiposDocumento />
    </>
  )
}

export default TiposDocumento