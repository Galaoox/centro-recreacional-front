
import { Typography } from 'antd';
import TableCategoriasMenu from '@components/Admin/CategoriasMenu/TableCategoriasMenu';

const { Title } = Typography;


const CategoriasMenu = () => {
  return (
    <>
        <Title level={1}>Categorías Menú</Title>
        <TableCategoriasMenu/>
    </>
  )
}


export default CategoriasMenu