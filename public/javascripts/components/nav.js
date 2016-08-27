import React from "react"
import { render } from "react-dom"
import { Link } from "react-router";

class Nav extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
                <nav className="menu pure-u-1" >
                    <ul>
                        <li><Link to="about" activeClassName="active">About</Link></li>
                        <li><Link to="create" activeClassName="active">Create</Link></li>
                    </ul>
                </nav>                    
                );
    }

}

export default Nav;
