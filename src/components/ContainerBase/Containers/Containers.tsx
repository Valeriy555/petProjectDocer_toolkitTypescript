import {FC, PropsWithChildren, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {containerActions} from "../../../redux/slices";
import {Container} from "../Container/Container";
import css from "./Containers.module.css";


interface IProps extends PropsWithChildren {

}

const Containers: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {containers} = useAppSelector(state => state.containerReducer);

    useEffect(() => {
        dispatch(containerActions.getAllContainer())
    }, [])

    return (
        <div className={css.ContainersWrap}>
            {containers.map(cont =>
            <Container key={cont._id} cont = {cont} />
            )}
        </div>
    );
};

export {Containers};