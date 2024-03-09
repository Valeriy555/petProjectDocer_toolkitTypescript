import {FC, PropsWithChildren} from 'react';

import {IInspector} from "../../../interfaces";
import {inspectorActions} from "../../../redux";
import {useAppDispatch} from "../../../hooks";
import css from './Inspector.module.css'


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
        <div className={css.Inspector}>

            <div>name:{name}</div>
            <div>age:{age}</div>
            <div>email:{email}</div>

            <div className={css.Btn}>
                <button onClick={updateInspector}>Update Inspector</button>
                <button onClick={deleteInspector}>Delete Inspector</button>
            </div>
        </div>
    );
};

export {Inspector};