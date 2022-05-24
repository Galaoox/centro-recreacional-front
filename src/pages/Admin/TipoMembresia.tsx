import { Typography } from 'antd';
import TableTiposMembresia from '@components/Admin/TiposMembresias/TableTiposMembresia';

const { Title } = Typography;


const TiposMembresia = () => {
  return (
    <>
        <Title level={1}>Tipos de Membresia</Title>
        <TableTiposMembresia />
    </>
  )
}

export default TiposMembresia