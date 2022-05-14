import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import HeaderCustom from '@components/User/UserLayout/HeaderCustom';
import './UserLayout.css';

const UserLayout = () => {
    return (
        <>
            <Layout id="user-layout">
                <HeaderCustom />
                <Content id="user-content"><Outlet /></Content>
                <Footer>Footer</Footer>
            </Layout>

        </>

    )
}

export default UserLayout