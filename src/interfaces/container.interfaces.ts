export interface IContainer {
    _id: number;
    shipper: string;
    consignee: string;
    forwarder: string;
    goods: string;
    container: string;
    consignment: number;
    stage: {
        _id: string;
        stage: string;
    } | null;
    inspector: {
        _id: string;
        name: string;
        email: string;
        age: number;
    } | null;
}