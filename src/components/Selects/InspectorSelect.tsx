import React, {FC, PropsWithChildren, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {inspectorActions} from "../../redux";



interface IProps extends PropsWithChildren {

    setSelectedInspector: (value: string | null) => void;
}

const InspectorSelect: FC<IProps> = ({setSelectedInspector}) => {
    const dispatch = useAppDispatch();
    const {inspectors} = useAppSelector(state => state.inspectorReducer);

    useEffect(() => {
        dispatch(inspectorActions.getAllInspector())
    }, [dispatch])

    const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStageId = e.target.value;
        setSelectedInspector(selectedStageId);
    };

    return (
        <select onChange={handleStageChange}>
            {inspectors.map(inspector => (
                <option key={inspector._id} value={inspector._id}>
                    {inspector.name}
                </option>
            ))}
        </select>
    );
};

export {InspectorSelect};