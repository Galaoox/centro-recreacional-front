import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Card, Typography, Divider, Row, Col, Select } from 'antd';
import useFetchAndLoad from '@hooks/useFetchAndLoad';
import { GetAllTiposDocumento } from '@services/tipos-documento.service';
import { useAsync } from '@hooks/useAsync';
import { useAuth } from '@hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
const { Title } = Typography;
const { Option } = Select;

const Login = () => {
    const [form] = Form.useForm();
    const auth = useAuth();
    let navigate = useNavigate();



    const onFinish = async (values: any) => {
        auth.signin(values, () => {
            return navigate('/admin');
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const rulesForm = {
        correoElectronico: [{ required: true, message: 'El correo electronico es requerido' }],
        contrasena: [{ required: true, message: 'La contrasena es requerida' },],
    }

    return (
        <>
            <Card
                style={{
                    width: '50%',
                    margin: 'auto',
                }}>
                <Title style={{ textAlign: 'center' }}>Inicio de sesion</Title>
                <Divider />
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item name='correoElectronico' label="Correo electronico" rules={rulesForm.correoElectronico}>
                                <Input type='email' maxLength={50} />
                            </Form.Item>
                    <Form.Item name='contrasena' label="Contrasena" rules={rulesForm.contrasena} >
                                <Input type='password' maxLength={50} />
                            </Form.Item>
                    <Form.Item style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" htmlType="submit" >
                            Iniciar sesion
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default Login