import React, {FC, PropsWithChildren} from 'react';
import {IStage} from "../../../interfaces";
import {stageActions} from "../../../redux/slices";
import {useAppDispatch} from "../../../hooks";


interface IProps extends PropsWithChildren {
    stageProps: IStage,
}

const Stage: FC<IProps> = ({stageProps}) => {

    const {_id, stage} = stageProps;
    const dispatch = useAppDispatch();

    const updateStage = async () => {
        await dispatch(stageActions.setStageForUpdate({stage: stageProps }))
    };
    const deleteStage = async () => {
        await dispatch(stageActions.deleteStage({_id, stage: stageProps}))
    };
    return (
        <div>
            <div>{stage}</div>

            <button onClick={updateStage}>Update Stage</button>
            <button onClick={deleteStage}>Delete Stage</button>
        </div>
    );
};

export {Stage};