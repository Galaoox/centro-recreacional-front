import { Typography } from 'antd';
import TableHorarios from '@components/Admin/Horarios/TableHorarios';

const { Title } = Typography;


const Horarios = () => {
  return (
    <>
        <Title level={1}>Horarios</Title>
        <TableHorarios />
    </>
  )
}

export default Horarios