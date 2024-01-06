import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {ContainerPage, InspectorsPage, StagesPage, StartPage} from "./pages";


let browserRouter = createBrowserRouter([{
    element: <MainLayout/>,
    children: [
        {
            index: true,
            element: <Navigate to={'start'}/>
        },
        {
            path: 'start',
            element: <StartPage/>
        },
        {
            path: 'inspectors',
            element: <InspectorsPage/>
        },
        {
            path: 'containers',
            element: <ContainerPage/>
        },
        {
            path: 'stages',
            element: <StagesPage/>
        },


    ]
}]);

export {browserRouter}