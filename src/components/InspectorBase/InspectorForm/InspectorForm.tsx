import React, {FC, PropsWithChildren, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IInspector} from "../../../interfaces";
import {inspectorActions} from "../../../redux";
import {useNavigate} from "react-router-dom";


interface IProps extends PropsWithChildren {

}

const InspectorForm: FC<IProps> = () => {


    const {reset, register, handleSubmit, setValue, formState: {errors}} = useForm<IInspector>();
    const {inspectorForUpdate, error} = useAppSelector(state => state.inspectorReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        if (inspectorForUpdate) {

            setValue('name', inspectorForUpdate.name)
            setValue('age', inspectorForUpdate.age)
            setValue('email', inspectorForUpdate.email)

        }
    }, [inspectorForUpdate, setValue])

    const submit: SubmitHandler<IInspector> = async (data) => {
        try {
            if (inspectorForUpdate) {
                await dispatch(inspectorActions.updateInspector({_id: inspectorForUpdate._id, inspector: data}))
            } else {
                await dispatch(inspectorActions.createInspector({inspector: data}))
            }
            reset();
        } catch (e) {
            // setFormError(e.response.data)
        }
    };

    const clearForm = () => {
        dispatch(inspectorActions.setInspectorForUpdate({inspector: null}));
        reset();
    };


    const handleBackToStart = (event: React.FormEvent) => {
        event.preventDefault();
        navigate(`/`);

    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'name'} {...register('name')}/>
                <input type="text" placeholder={'age'} {...register('age')}/>
                <input type="text" placeholder={'email'} {...register('email')}/>
                <button>{inspectorForUpdate ? 'update' : 'create'}</button>
                {
                    !!inspectorForUpdate && <button onClick={clearForm}>clear form</button>
                }

                <button onClick={handleBackToStart}
                        onFocus={() => dispatch(inspectorActions.setInspectorForUpdate({inspector: null}))}>
                    Click to back to Start Page
                </button>

                {error && (
                    <div>
                        Status: {error.status} Error: {error.message}

                    </div>
                )}
                <div>
                    {errors.name && <span>{errors.name.message}</span>}
                    {errors.age && <span>{errors.age.message}</span>}
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
            </form>
        </div>
    );
};

export {InspectorForm};