import InfoEntradas from '@components/User/Cuenta/InfoEntradas';
import InfoHospedajes from '@components/User/Cuenta/InfoHospedajes';
import InfoMembresia from '@components/User/Cuenta/InfoMembresia';
import { Tabs, Typography } from 'antd';
import React from 'react'

const { Title } = Typography;
const { TabPane } = Tabs;


const Cuenta = () => {
    return (
        <>
            <Title level={1}>Informacion Cuenta</Title>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Hospedajes" key="1" >
                    <InfoHospedajes/>
                </TabPane>
                <TabPane tab="Entradas" key="2">
                    <InfoEntradas/>
                </TabPane>
                <TabPane tab="Membresia" key="3">
                    <InfoMembresia />
                </TabPane>
            </Tabs>
        </>
    )
}

export default Cuenta