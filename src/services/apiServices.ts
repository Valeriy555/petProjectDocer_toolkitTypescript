import axios, {AxiosResponse} from "axios";
import {baseURL} from "../configs/urls";

type IResponse<DATA> = Promise<AxiosResponse<DATA>>;

const apiServices = axios.create({baseURL});

export type {
    IResponse
}

export {
    apiServices
}
