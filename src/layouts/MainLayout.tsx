import {FC} from "react";
import {Outlet} from "react-router-dom";

import css from "./MainLayout.module.css";

interface IProps {
}

const MainLayout:FC<IProps> = () => {

    return (
        <div className={css.LayoutWrap}>
            MainLayout
            <Outlet/>
        </div>
    );
};

export {MainLayout};