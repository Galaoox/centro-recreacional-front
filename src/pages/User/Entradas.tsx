import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAsync } from "@hooks/useAsync";
import { useAuth } from "@hooks/useAuth";
import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { CreateEntrada } from "@services/entradas.service";
import { GetMembresiaUsuario } from "@services/membresia.service";
import { GetAllTiposEntradas } from "@services/tipos-entradas.service";
import { Button, Card, Col, Divider, Form, Input, notification, Row, Select, Table, Typography } from "antd";
import { useState } from "react";
import './Entradas.css';

const { Title } = Typography;
const { Option } = Select;

const Entradas = () => {
    const { user } = useAuth();
    const [tiposEntradas, setTiposEntradas] = useState([]);
    const [form] = Form.useForm();
    const { loading, callEndpoint } = useFetchAndLoad();
    const [dataList, setDataList] = useState([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [membresia, setMembresia] = useState(null);




    const getTiposEntradas = async () => await callEndpoint(GetAllTiposEntradas());

    const adaptTiposEntradas = (data: any) => {
        setTiposEntradas(data);
    };

    const reloadDataList = () => {
        const { entradas } = form.getFieldsValue();
        const data = entradas.map((entrada: any) => {
            const tipoEntrada: any = tiposEntradas.find((tipoEntrada: any) => tipoEntrada.id === entrada.tipo);
            return {
                ...entrada,
                nombre: tipoEntrada ? tipoEntrada.nombre : '',
                tipo: entrada.tipo,
                valorUnitario: tipoEntrada ? tipoEntrada.valor : 0,
                valorTotal: tipoEntrada && entrada.cantidad ?  calcTotalEntrada(entrada, tipoEntrada) : 0
            };
        });
        setDataList(data);
        setTotal(calcValorTotal(data));
    };

    const calcTotalEntrada =(entrada:any,tipoEntrada:any)=>{
        const totalData = entrada.cantidad * tipoEntrada.valor;
        if(membresia){
            return totalData - ((totalData * membresia) / 100);
        }
        return totalData;
    }


    const columns = [
        {
            title: 'Tipo',
            dataIndex: 'nombre',
            key: 'tipo',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Valor unitario',
            dataIndex: 'valorUnitario',
            key: 'valorUnitario',
        },
        {
            title: 'Valor Total + Descuento',
            dataIndex: 'valorTotal',
            key: 'valorTotal',
        },
    ];

    const onFinish = (values:any)=>{
        dataList.forEach(async (entrada:any)=>{
            const data = {
                valorTotal: entrada.valorTotal,
                valorUnitario: entrada.valorUnitario,
                cantidad: entrada.cantidad,
                tipoEntradaId: entrada.tipo,
            }
            await callEndpoint(CreateEntrada(data));
        });
        notification['success']({
            message: 'Entradas adquiridas correctamente',
          });
    }



    const calcValorTotal = (data = dataList) => {
        const totalData =data.reduce((acc, curr:any) => acc + curr.valorTotal, 0);
        return totalData;
    }

    const getMembresia = async () => await callEndpoint(GetMembresiaUsuario());

    const adaptMembresia = async (res: any) => {
        const descuento = res.descuentos.find((descuento: any) => descuento.type === 2);
        if (descuento) setMembresia(descuento.value);
    }


    useAsync(getTiposEntradas, adaptTiposEntradas, () => { });
    useAsync(getMembresia, adaptMembresia, () => { });

    return (
        <>
            <Title level={1}>Entradas</Title>
            <Form
                layout="vertical"
                form={form}
                id="container-entradas"
                onFinish={onFinish}
            >
                <Card>


                    <Form.List name="entradas" initialValue={[{
                        tipo: '',
                        cantidad: '',
                    }]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row gutter={16} align='middle' key={key}

                                    >
                                        <Col span={11}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'tipo']}
                                                rules={[{ required: true, message: 'El tipo es requerido' }]}
                                                label="Tipo"
                                            >
                                                <Select style={{ width: '100%' }} onChange={reloadDataList} >
                                                    {tiposEntradas.map((item: any) => (<Option key={item.id} value={item.id}>{item.nombre} - ${item.valor}</Option>))}
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={11}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'cantidad']}
                                                rules={[{ required: true, message: 'La cantidad es requerida' }]}
                                                label="Cantidad"
                                            >
                                                <Input type="number" placeholder="Cantidad" onChange={reloadDataList} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2} style={{ textAlign: 'center' }} >
                                            <Button type="text" onClick={() => {
                                                remove(name);
                                                reloadDataList();
                                            }} block icon={<MinusCircleOutlined />} disabled={fields.length <= 1}>
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Agregar tipo de entrada
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Card>
                <Card>
                    <Title level={2}>Resumen</Title>
                    <Table dataSource={dataList} columns={columns}
                        pagination={{
                            hideOnSinglePage: true,
                            pageSize: 5,
                        }}
                    />

                    <Divider />
                    {
                        membresia && (
                            <div >
                                <Title level={5}>Descuento: {membresia}%</Title>
                                <Divider />
                            </div>
                        )
                    }
                    <Title level={4}>Total: {total}</Title>

                    <Form.Item style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit" disabled={!user.accessToken} >
                            Reservar
                        </Button>
                        {
                            !user.accessToken && (
                                <p style={{ textAlign: 'center' }}>Para reservar debes iniciar sesion</p>
                            )
                        }
                    </Form.Item>
                </Card>
            </Form>


        </>
    )
}

export default Entradas