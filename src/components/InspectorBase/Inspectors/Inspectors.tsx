import {FC, PropsWithChildren, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {inspectorActions} from "../../../redux";
import {Inspector} from "../Inspector/Inspector";

interface IProps extends PropsWithChildren {

}

const Inspectors: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {inspectors} = useAppSelector(state => state.inspectorReducer);

    useEffect(() => {
        dispatch(inspectorActions.getAllInspector())
    }, [])


    return (
        <div>
            {inspectors.map(inspector =>
            <Inspector inspector={inspector} key={inspector._id} />

            )}


        </div>
    );
};

export {Inspectors};