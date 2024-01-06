import {apiServices, IResponse} from "./apiServices";
import {IStage} from "../interfaces";
import {urls} from "../configs/urls";

const stageService = {
    getAll: (): IResponse<IStage[]> => apiServices.get(urls.stages.base),
    create: (dataStage: IStage): IResponse<IStage> => apiServices.post(urls.stages.base, dataStage),
    updateById: (id:number, dataStage:IStage) => apiServices.put<IStage>(urls.stages.byId(id),dataStage),
    deleteById:(id:number): IResponse<void> => apiServices.delete(urls.stages.byId(id))

}

export {stageService}