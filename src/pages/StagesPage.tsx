import React, {FC} from 'react';
import {StageForm, Stages} from "../components";

const StagesPage: FC = () => {
    return (
        <div>
            StagesPage
            <StageForm/>
            <hr/>
            <Stages/>
        </div>
    );
};

export {StagesPage};