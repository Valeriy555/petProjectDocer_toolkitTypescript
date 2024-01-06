import {FC, PropsWithChildren} from 'react';
import {IInspector} from "../../../interfaces";
import {useDispatch} from "react-redux";
import {inspectorActions} from "../../../redux";
import {useAppDispatch} from "../../../hooks";


interface IProps extends PropsWithChildren {
    inspector: IInspector,
}

const Inspector: FC<IProps> = ({inspector}) => {

    const {_id, name, age, email} = inspector;
    const dispatch = useAppDispatch();


    const updateInspector = async () => {
        await dispatch(inspectorActions.setInspectorForUpdate({inspector}))

    };

    const deleteInspector = async () => {
        await dispatch(inspectorActions.deleteInspector({_id}));
    };

    return (
        <div>

            <div>name:{name}</div>
            <div>age:{age}</div>
            <div>email:{email}</div>
            <button onClick={updateInspector}>Update Inspector</button>
            <button onClick={deleteInspector}>Delete Inspector</button>

            <hr/>

        </div>
    );
};

export {Inspector};