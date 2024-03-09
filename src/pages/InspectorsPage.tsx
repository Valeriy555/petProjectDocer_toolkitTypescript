import React, {FC} from 'react';
import {InspectorForm, Inspectors} from "../components";
import css from "./InspectorsPage.module.css";

const InspectorsPage: FC = () => {

    return (
        <div className={css.InspectorsPageWrap}>
            <InspectorForm/>
            <hr/>
            <Inspectors/>
        </div>
    );
};

export {InspectorsPage};