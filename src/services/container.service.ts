import {apiServices, IResponse} from "./apiServices";
import {IContainer} from "../interfaces";
import {urls} from "../configs/urls";

const containerService = {
    getAll:(): IResponse<IContainer[]> => apiServices.get(urls.containers.base),
    create:(dataContainers: IContainer): IResponse<IContainer> => apiServices.post(urls.containers.base, dataContainers),
    getById: (id:number):IResponse<IContainer> => apiServices.get(urls.containers.byId(id)),
    updateById:(id:number, dataContainers:IContainer) => apiServices.put<IContainer>(urls.containers.byId(id),dataContainers),
    deleteById:(id:number): IResponse<void> => apiServices.delete(urls.containers.byId(id))
}

export {containerService}