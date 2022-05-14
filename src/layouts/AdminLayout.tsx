import { Layout, Menu, Tooltip, Spin } from 'antd';


const { Header, Sider, Content, Footer } = Layout;
import '@styles/AdminLayout.css';
import { Link, Outlet } from 'react-router-dom';
import { routesAdmin } from '@config/routes-admin';
import { useLoading } from '@hooks/useLoading';
import { useEffect, createElement } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'red' }} spin />;

const AdminLayout = () => {
    const { loading} = useLoading();

    return (
        <Spin size='large' spinning={loading} indicator={antIcon} style={{zIndex: 10004}} >
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
                        items={routesAdmin.map((route, index) => {
                            return  {
                                key: index,
                                label: createElement(Link, { to: route.path }, route.title),
                            }
                        })}
                    
                    />
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
        </Spin>

    )
}

export default AdminLayout