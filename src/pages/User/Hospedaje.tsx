import FormHospedaje from "@components/User/Hospedaje/FormHospedaje";
import { Typography } from "antd";

const { Title } = Typography;

const Hospedaje = () => {
    return (
        <>
            <Title level={1}>Hospedaje</Title>
            <FormHospedaje/>
        </>
    )
}

export default Hospedaje