import React from "react"
import { render } from "react-dom"
import { Link } from "react-router";
import Nav from "./nav"

class App extends React.Component{
    constructor() {
        super();
        this.state = {"name": "Manan Singh"};
    }

    render() {
        return (
                <div className="pure-g">
                   <Nav />

                   {/* Show the children components */}
                   {this.props.children}
                </div>                    
                );
    }
}

export default App;
