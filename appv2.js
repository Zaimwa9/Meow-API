// Meow - API v2: cleaning

var request=require('request');
var Slack=require('slack-node');

function Req(image){request('http://random.cat/meow', function(error,response,body){
	resp=JSON.parse(body);
	image=JSON.stringify(resp.file);
	console.log(image);	
	})
}
;

function sendtoslack(image,callback){
webhookurl="https://hooks.slack.com/services/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";

slack= new Slack();

textsend="Heeeey check this out ";

slack.setWebhook(webhookurl);

slack.webhook({
channel:"#meow",
username:"hackercatlover",
text: textsend + Req(image)
	
	});
}
;

sendtoslack();
