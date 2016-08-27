import React from "react"
import { Link } from "react-router";

class Register extends React.Component{
    constructor() {
        super();
        this.state = {url: "", loading: false, posted: false, postInfo: {}};
        this.handleInput = this.handleInput.bind(this);
        this.processUrl = this.processUrl.bind(this);
    }

    handleInput(event) {
        this.setState({url: event.target.value, posted: false, postInfo: {}});
    }

    processUrl(event){
        if(this.state.url && !this.state.loading){
            this.setState({loading: true});
            {/* Try to use jQuery ajax to POST a new URL  */}
            $.ajax({
                    url: "/shorten",
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        url: this.state.url
                    },
                    success: function(data){
                        //console.log(data);
                        setTimeout(
                    () => {console.log("hello");                         this.setState({loading: false}); this.setState({posted: true, postInfo: data}); console.log(this.state.postInfo);
                    }, 2000
                    );

                        //this.setState({loading: false});
                    }.bind(this),
                    error: function(xhr, status, err){
                        this.setState({loading: false});
                        console.log(this.state.url, status, err);
                    }.bind(this)
            });

        }
    }

    render() {
        return (
            <div className="pure-u-1">
                <div className="register-sec">
                    <div className="register-info">
                        <h1>Shorten your url here!</h1>
                        <UrlMsgAlert loading={this.state.loading} posted={this.state.posted} postInfo={this.state.postInfo} />
                    </div>
                    <UrlForm whenTyping={this.handleInput} onSubmitted={this.processUrl} />
                </div>
            </div>
        );
    }
}

class UrlForm extends React.Component{
    constructor() {
        super();
    }

    render() {
        return (
                <div id="url-form-sbmt">
                    <input type="text" placeholder="Type your URL here" onChange={this.props.whenTyping.bind(this)} />
                    <button onClick={this.props.onSubmitted.bind(this)}>Shorten</button>
                </div>
                );
    }
}

class UrlMsgAlert extends React.Component{

    constructor(props) {
        super(props);
        this.showMsg = this.showMsg.bind(this);
    }

    extractDomain(url){
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        //domain = domain.split(':')[0];

        return domain; 
    }

    showMsg() {
        if(this.props.loading){
            return "Loading...";
        }
        if(this.props.posted){
            if(this.props.postInfo.result === -1){
                return "We already shortened that url. Use http://" + this.extractDomain(window.location.href) + "/" + this.props.postInfo.toAppend;
            }else if(this.props.postInfo.result === -2){
                return "That's not a URL!";
            }else{
                return "Alright! We just shortened " + this.props.postInfo.original + " to http://" + this.extractDomain(window.location.href) + "/" + this.props.postInfo.toAppend;
            }
        }
        return "Input a new URL to shorten";
        
    }

    render() {
        return(
                <div>
                    <p>{this.showMsg()}</p>
                </div>
                );
    }
}

export default Register;
