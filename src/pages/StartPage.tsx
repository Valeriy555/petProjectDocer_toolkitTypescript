import {FC} from "react";
import {Link} from "react-router-dom";

const StartPage: FC = () => {
    return (
        <div>
            StartPage
            <ul>
                <li><Link to={'/inspectors'}> Customs inspectors </Link></li>
                <li><Link to={'/containers'}> Containers at customs inspections</Link></li>
                <li><Link to={'/stages'}> stages of customs inspection</Link></li>
            </ul>
        </div>
    );
};

export {StartPage};