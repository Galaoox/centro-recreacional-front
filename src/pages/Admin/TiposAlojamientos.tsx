import { Typography } from 'antd';
import TableTiposAlojamientos from '@components/Admin/TiposAlojamientos/TableTiposAlojamientos';

const { Title } = Typography;


const TiposAlojamientos = () => {
  return (
    <>
        <Title level={1}>Tipos de alojamientos</Title>
        <TableTiposAlojamientos />
    </>
  )
}

export default TiposAlojamientos