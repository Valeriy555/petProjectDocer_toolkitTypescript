import {FC, PropsWithChildren} from "react";
import {IContainer} from "../../../interfaces";
import {useAppDispatch} from "../../../hooks";
import {containerActions} from "../../../redux/slices";

import css from './Conteiner.module.css'

interface IProps extends PropsWithChildren {
    cont: IContainer
}

const Container: FC<IProps> = ({cont}) => {

    const dispatch = useAppDispatch();
    const {_id, container, consignee, consignment, forwarder, goods, shipper, stage, inspector} = cont;

    const updateContainer = async () => {
        await dispatch(containerActions.setContainerForUpdate({cont}))
    };
    const deleteContainer = async () => {
        await dispatch(containerActions.deleteContainer({_id: _id}))
    };

    return (
        <div className={css.Container}>
            <div className={css.Content}>
                <p> {shipper}</p>
                <p> {consignee}</p>
                <p> {forwarder}</p>
                <p> {goods}</p>
                <p> {container}</p>
                <p> {consignment}</p>
                <p> {stage?.stage}</p>
                <p> {inspector?.name}</p>
            </div>

            <div className={css.Btn}>
                <button onClick={updateContainer}>Update Container</button>
                <button onClick={deleteContainer}>Delete Container</button>

            </div>
            <hr/>
        </div>
    );
};

export {Container};