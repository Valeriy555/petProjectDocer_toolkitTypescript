import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {stageActions} from "../../redux/slices";


interface IProps extends PropsWithChildren {

    setSelectedStage: (value: string | null) => void;
}

const StageSelect: FC<IProps> = ({ setSelectedStage }) => {
    const dispatch = useAppDispatch();
    const {stages} = useAppSelector(state => state.stageReducer);

    useEffect(() => {
        dispatch(stageActions.getAllStage())
    }, [dispatch])

    const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStageId = e.target.value;
        setSelectedStage(selectedStageId);
    };
    return (
        <select onChange={handleStageChange}>
            {stages.map(stage => (
                <option key={stage._id} value={stage._id}>
                    {stage.stage}
                </option>
            ))}
        </select>
    );
};

export {StageSelect};