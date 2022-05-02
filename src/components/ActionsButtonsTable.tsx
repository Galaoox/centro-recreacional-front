import { ActionButtonTable } from '@models/action-button-table.model';
import { Button, Space } from 'antd'
import { FC, createElement } from 'react';



interface props {
    items: ActionButtonTable[];
}

const ActionsButtonsTable: FC<props> = ({items}) => {

    return (
        <Space style={styles.containerButtons}>
            {
                items.map(item => (
                    <Button key={item.key} icon={createElement(item.icon)} onClick={item.action} disabled={item.disabled} >{item.label}</Button>
                ))
            }
        </Space>
    )
}

const styles = {
    containerButtons: {
        marginBottom: '1rem',
    }
}

export default ActionsButtonsTable