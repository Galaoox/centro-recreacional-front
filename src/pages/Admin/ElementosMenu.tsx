import { Typography } from 'antd';
import TableElementosMenus from '@components/Admin/ElementosMenu/TableElementosMenus';

const { Title } = Typography;


const ElementosMenu = () => {
  return (
    <>
        <Title level={1}>Elementos Menú</Title>
        <TableElementosMenus/>
    </>
  )
}

export default ElementosMenu