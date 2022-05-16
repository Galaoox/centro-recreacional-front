import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import HeaderCustom from '@components/User/UserLayout/HeaderCustom';
import './UserLayout.css';
import FooterCustom from '@components/User/UserLayout/FooterCustom';

const UserLayout = () => {
    return (
        <>
            <Layout id="user-layout">
                <HeaderCustom />
                <Content id="user-content"><Outlet /></Content>
                <FooterCustom/>
            </Layout>

        </>

    )
}

export default UserLayout