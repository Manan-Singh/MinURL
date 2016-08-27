import { render } from 'react-dom';
import { Link } from "react-router";

class Check extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
                <div className="pure-u-1">
                    <h1>See if youre URL is already shortened!</h1>
                    <p>Enter the URL you would like to check!</p>
                </div>
                );
    }
}

export default Check;
