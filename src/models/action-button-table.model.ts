export interface ActionButtonTable {
    key: React.Key;
    label: string;
    action: () => void;
    icon: any;
    disabled: boolean;
}