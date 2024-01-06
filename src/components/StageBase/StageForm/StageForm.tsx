import React, {FC, PropsWithChildren, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IStage} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useNavigate} from "react-router-dom";
import {stageActions} from "../../../redux/slices";

interface IProps extends PropsWithChildren {

}

const StageForm: FC<IProps> = () => {
    const {reset, register, handleSubmit, setValue, formState: {errors}} = useForm<IStage>();
    const {stageForUpdate, error} = useAppSelector(state => state.stageReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (stageForUpdate) {
            setValue('stage', stageForUpdate.stage)
        }
    }, [stageForUpdate, setValue])

    const submit: SubmitHandler<IStage> = async (data) => {
        try {
            if (stageForUpdate) {
                await dispatch(stageActions.updateStage({_id: stageForUpdate._id, stage: data}))
            } else {
                await dispatch(stageActions.createStage({stage: data}))
            }
            reset()
        } catch (e) {
            // setFormError(e.response.data)
        }
    }

    const clearForm = () => {
        dispatch(stageActions.setStageForUpdate({stage: null}));
        reset();
    };

    const handleBackToStart = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/')
    };
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'enter stage'} {...register('stage')}/>
                <button>{stageForUpdate ? 'update' : 'create'}</button>
                {
                    !!stageForUpdate && <button onClick={clearForm}>clear form</button>
                }
                <button onClick={handleBackToStart}
                        onFocus={() => dispatch(stageActions.setStageForUpdate({stage: null}))}>
                    Click to back to Start Page
                </button>

            </form>
        </div>
    );
};

export {StageForm};