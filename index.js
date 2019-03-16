
'use strict'
const awsflashgordon = require(`./awsflashgordon`);

if (process.env.LAMBDA_TASK_ROOT) {
    const awsServerlessExpress = require('aws-serverless-express')
    const awsflashgordon = require('./awsflashgordon')
    const querystring = require('querystring')
    const server = awsServerlessExpress.createServer(awsflashgordon)

    exports.handler = (event, context) => {
        let body = JSON.stringify(querystring.parse(event.body));
        console.log("The body is" + body);
        console.log(JSON.stringify(event));
        awsServerlessExpress.proxy(server, event, context)
    }
} else {
    const port = process.env.HTTP_PORT || 3000;
    awsflashgordon.listen(port,() => console.log('Listening on ' + port));
}
