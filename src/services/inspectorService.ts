import {apiServices, IResponse} from "./apiServices";
import {IInspector} from "../interfaces";
import {urls} from "../configs/urls";

const inspectorService = {
    getAll: (): IResponse<IInspector[]> => apiServices.get(urls.inspectors.base),
    create:(dataInspector: IInspector): IResponse<IInspector> => apiServices.post(urls.inspectors.base,dataInspector),
    getById: (id:number):IResponse<IInspector> => apiServices.get(urls.inspectors.byId(id)),
    updateById:(id:number, dataInspector:IInspector) => apiServices.put<IInspector>(urls.inspectors.byId(id),dataInspector),
    deleteById:(id:number): IResponse<void> => apiServices.delete(urls.inspectors.byId(id))
}

export {inspectorService}