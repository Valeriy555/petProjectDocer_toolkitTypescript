import React, {FC} from 'react';
import {InspectorForm, Inspectors} from "../components";

const InspectorsPage: FC = () => {

    return (
        <div>
            <InspectorForm/>
            <hr/>
            <Inspectors/>
        </div>
    );
};

export {InspectorsPage};