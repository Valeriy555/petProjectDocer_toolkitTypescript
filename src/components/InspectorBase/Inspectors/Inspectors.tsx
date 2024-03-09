import {FC, PropsWithChildren, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {inspectorActions} from "../../../redux";
import {Inspector} from "../Inspector/Inspector";
import css from "./Inspectors.module.css";

interface IProps extends PropsWithChildren {

}

const Inspectors: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {inspectors,loading} = useAppSelector(state => state.inspectorReducer);

    useEffect(() => {
        dispatch(inspectorActions.getAllInspector())
    }, [])


    return (
        <div className={css.InspectorsWrap}>
            {loading && <h1 >loading..........................</h1>}

            {inspectors.map((inspector) =>
            <Inspector inspector={inspector} key={inspector._id}  />

            )}


        </div>
    );
};

export {Inspectors};