import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./components/app"
import { About, AboutInfo, Policy, Author } from "./components/about"
import Register from "./components/registerurl"
import Check from "./components/check"

render( (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Register} />
                    {/* Add children view routes here */}
                    <Route path="/about" component={About} >
                        <IndexRoute component={AboutInfo} />
                        <Route path="/about2" component={AboutInfo} />
                        <Route path="/policy" component={Policy} />
                        <Route path="/author" component={Author} />
                    </Route>
                    <Route path="/create" component={Register} />
                    <Route path="/check" component={Check} />
                </Route>
            </Router>
        )
        ,document.getElementById('app') );
