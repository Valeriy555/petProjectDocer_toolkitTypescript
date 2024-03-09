import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IContainer} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {useNavigate} from "react-router-dom";
import {containerActions} from "../../../redux/slices";
import {InspectorSelect, StageSelect} from "../../Selects";

interface IProps extends PropsWithChildren {

}

const ContainerForm: FC<IProps> = () => {
    const {reset, register, handleSubmit, setValue, formState: {errors}} = useForm<IContainer>();
    const {containerForUpdate, error} = useAppSelector((state) => state.containerReducer);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [selectedStage, setSelectedStage] = useState<string | null>(containerForUpdate?.stage?._id || null);
    const [selectedInspector, setSelectedInspector] = useState<string | null>(containerForUpdate?.inspector?._id || null);


    useEffect(() => {
        if (containerForUpdate) {
            const {shipper, consignee, forwarder, goods, container, consignment, stage, inspector} = containerForUpdate;

            setValue('shipper', shipper)
            setValue('consignee', consignee)
            setValue('forwarder', forwarder)
            setValue('goods', goods)
            setValue('container', container)
            setValue('consignment', consignment)

            setSelectedStage(stage?._id || null);
            setSelectedInspector(inspector?._id || null); // Установка выбранного пользователя в состояние
        }
    }, [containerForUpdate, setValue]);

    const submit: SubmitHandler<IContainer> = async (data) => {
        try {
            if (containerForUpdate) {
                // Объединяем текущие данные контейнера с новыми данными, чтобы сохранить все необходимые поля
                const updatedContainer = {
                    ...containerForUpdate,
                    ...data,

                    stage: selectedStage ? {_id: selectedStage, stage: ""} : containerForUpdate.stage,
                    inspector: selectedInspector ? {_id: selectedInspector, name: "", email: "", age: 0}
                        : containerForUpdate.inspector,
                };
                await dispatch(containerActions.updateContainer({
                    _id: containerForUpdate._id,
                    container: updatedContainer,
                }));
            } else {
                await dispatch(containerActions.createContainer({

                    container: {
                        ...data, stage: selectedStage ? {_id: selectedStage, stage: ""} : null,
                        inspector: selectedInspector ? {_id: selectedInspector, name: "", email: "", age: 0} : null
                    }
                }));


                reset();
                setSelectedInspector(null); // Сброс выбранного пользователя
                setSelectedStage(null); // Сброс выбранного этапа
            }
            reset();
            dispatch(containerActions.setContainerForUpdate({cont: null})); // Сброс данных для обновления
            await dispatch(containerActions.getAllContainer());

        } catch (e) {
            // setFormError(e.response.data)
        }
    };

    const clearForm = () => {
        dispatch(containerActions.setContainerForUpdate({cont: null}));
        reset();
        setSelectedInspector(null);
        setSelectedStage(null);
    }

    const handleBackToStart = (event: React.FormEvent) => {
        event.preventDefault();
        navigate(`/`);

    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={'shipper'} {...register('shipper')} />
                <input type="text" placeholder={'consignee'} {...register('consignee')} />
                <input type="text" placeholder={'forwarder'} {...register('forwarder')} />
                <input type="text" placeholder={'goods'} {...register('goods')} />
                <input type="text" placeholder={'container'} {...register('container')} />
                <input type="text" placeholder={'consignment'} {...register('consignment')}/>
                <StageSelect
                    setSelectedStage={setSelectedStage}/> {/* Передача состояния и функции установки выбранного этапа */}
                <InspectorSelect
                    setSelectedInspector={setSelectedInspector}/> {/* Передача состояния и функции установки выбранного пользователя */}

                <button>
                    {containerForUpdate ? 'Update changes' : 'Create'}
                </button>

                {containerForUpdate && <button onClick={clearForm}>clear form</button>}

                <button onClick={handleBackToStart}
                        onFocus={() => dispatch(containerActions.setContainerForUpdate({cont: null}))}>
                    Click to back to Start Page
                </button>

                {error && (
                    <div>
                        Status: {error.status} Error: {error.message}

                    </div>
                )}


                <div>

                    {errors.shipper && <span>{errors.shipper.message}</span>}
                    {errors.consignee && <span>{errors.consignee.message}</span>}
                    {errors.forwarder && <span>{errors.forwarder.message}</span>}
                    {errors.goods && <span>{errors.goods.message}</span>}
                    {errors.container && <span>{errors.container.message}</span>}
                    {errors.consignment && <span>{errors.consignment.message}</span>}
                    {errors.stage && <span>{errors.stage.message}</span>}
                    {errors.inspector && <span>{errors.inspector.message}</span>}

                </div>

            </form>
        </div>
    );
};

export {ContainerForm};