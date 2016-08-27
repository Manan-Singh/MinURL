# MinURL
An small MERN stack app that shortens URLs. If you want to try to use this project locally then you should first create a config.js file. It should look something like:

## Config.js
``` javascript
module.exports.MONGO_CONNECTION = "<YOUR CONNECTION INFORMATION FOR MONGOOSE GOES HERE>";
```

After that all you have to do is npm install and npm start. You'll also need to install webpack gloablly and use it to compile some of the ES6 to regular javascript. You can do that with npm install -g webpack. 

This was a pretty simple project but I thought it would be fun to mess around with React. It was. I have a samle demo running here: https://frozen-mountain-33886.herokuapp.com#/?_k=hkfv7q and yes, I see the irony of having a URL shortener having such a long URL. I don't feel like paying money for a domain so oh well. 
