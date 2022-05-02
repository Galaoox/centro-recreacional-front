import { Layout, Menu, Tooltip } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { createElement } from 'react';

const { Header, Sider, Content, Footer } = Layout;
import '@styles/AdminLayout.css';
import { Link, Outlet } from 'react-router-dom';
import { routesAdmin } from '@config/routes-admin';

const AdminLayout = () => {
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo" >
                    Centro recreacional
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {
                        routesAdmin.map((route, index) => {
                            return (

                                <Menu.Item key={(index + 1).toString()}>
                                    <Tooltip title={route.title} placement="right">
                                        <Link to={route.path}>
                                            {route.title}
                                        </Link>
                                    </Tooltip>
                                </Menu.Item>
                            )
                        })
                    }
                                <Menu.Item key="cerrar-sesion">
                                        <Link to='/'>
                                            Cerrar sesión
                                        </Link>
                                </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Centro recreacional ©2022 Created by FET TEAM</Footer>
            </Layout>
        </Layout>
    )
}

export default AdminLayout