
//#Meow-API

var request=require('request');
var Slack=require('slack-node');


webhookurl="https://hooks.slack.com/services/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";


request('http://random.cat/meow', function geturl(error,response,body){
//console.log('error:',error);
//console.log('statusCode:', response && response.statusCode); 
//console.log('body:',body);
resp=body.split(':"');
resp=resp[1].replace(/"/g,'');
resp=resp.replace('}','')
//res=JSON.parse(body);
console.log(resp);

	})
;

slack= new Slack();

textsend="Heeeey check this out @Jimi";

slack.setWebhook(webhookurl);

slack.webhook({
channel:"#meow",
username:"hackercatlover",
text: textsend

})
;

