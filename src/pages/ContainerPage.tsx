import React, {FC} from 'react';
import {ContainerForm, Containers} from "../components";
import css from "./ContainerPage.module.css";

const ContainerPage: FC = () => {

    return (
        <div className={css.ContainersPageWrap}>

            <ContainerForm/>
            <hr/>
            <Containers/>

        </div>
    );
};

export {ContainerPage};