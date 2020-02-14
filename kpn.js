var request = require('request');
var body = [];

// Replace the URL and credentials with your own
request.get('https://restapi2.jasper.com/rws/api/v1/devices').auth('alfredrezk', '6810913e-d29c-4418-b60a-ddbf3aa87178', false)
   .on('error', function(error){
       console.log('I am here')
      console.log('Error:', error);
   })
   .on('response', function(response) {
      console.log(response.statusCode); // return statusCode
      console.log(response.headers['content-type']); // return contentType
   })
   .on('data',function(chunk){
      body.push(chunk);
   })
   .on('end',function(){
      body = Buffer.concat(body).toString();
      console.log(body);
   });