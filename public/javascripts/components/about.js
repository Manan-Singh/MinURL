import { Router, Route, hashHistory } from "react-router";
import { render } from 'react-dom';
import { Link, IndexRoute } from "react-router";

class About extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
                <div className="pure-u-1">
                    <div className="about-blurb">
                        {/*<h1>About</h1>*/}
                        {/*<p>MinURL allows you to shorten URls!</p>*/}
                        {this.props.children}
                    </div>
                    <div id="btn-board">
                        <Link to="about2" className="abt-btn" activeClassName="active">About</Link>
                        <Link to="policy" className="abt-btn" activeClassName="active">Policy</Link>
                        <Link to="author" className="abt-btn" activeClassName="active">Author</Link>
                    </div>
                </div>
                );
    }
}

class AboutInfo extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
                
                <div className="info-container">
                    <h1>About</h1>
                    <p>MinURL allows you to shorten URls! All you have to do is just type in the URL that you would like to shorten on the "create" page. If the URL you typed in was already shortened then you will be shown a message telling you what to type in to the address bar to get to your page. </p>
                </div>
                );
    }
}

class Policy extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
                <div className="info-container">
                    <h1>Policy</h1>
                    <p>There is no guarnatee that the shortened URLs will always work since this site is subject to being taken down at any moment. That said, if the site is up then most likely all shortened URLs will work. Also please do not spam the site with garbage URLs to shady sites, I want to keep it up but only if nobody tries to mess with it.</p>
                </div>
                );
    }
}

class Author extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
                <div>
                    <h1>Author</h1>
                    <p>If you want to see more projects made by me you can check out my github page <a href="https://github.com/Manan-Singh">here</a></p>
                </div>
                );
    }
}

export default About;
export { About, AboutInfo, Policy, Author };
