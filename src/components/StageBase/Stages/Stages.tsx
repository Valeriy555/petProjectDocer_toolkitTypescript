import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {stageActions} from "../../../redux/slices";
import {Stage} from "../Stage/Stage";

interface IProps extends PropsWithChildren {
}

const Stages: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {stages} = useAppSelector(state => state.stageReducer);


    useEffect(() => {
        dispatch(stageActions.getAllStage())
    }, [])


    return (
        <div>
            {stages.map(stageProps =>
                <Stage stageProps={stageProps} key={stageProps._id}/>
            )}
        </div>
    );
};

export {Stages};