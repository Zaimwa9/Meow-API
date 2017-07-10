var express=require('express');
var app=express();
var mongoose=require('mongoose');
var config=require('./config');
var fs=require('fs');
var request=require('request');
var Users=require('./models/subscribemodel');
var setupController=require('./controllers/setupController');
var bodyParser=require('body-parser');

var html="";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// in http module we have access to createServer that gets a function parameter
// the function is actually an eventemitter that listens on 'request'
// and emits 2 objects: req and res. Check the format of a response to see how to
// code the function

var port=process.env.PORT || 3000;

app.use('/', express.static(__dirname+'/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionstring(),function(){
        console.log('Successfuly connected')
        });


app.get('/', function(req,res){
        res.render('index.ejs');
});

app.get('/meow', (req,res) => {
          request('http://random.cat/meow',function (err,_,body){
                if (err) return console.error(err);
                body=JSON.parse(body);
                res.render('./indexcat.ejs', {test : body.file});
        });
});

app.get('/getall', (req, res)=> {
        Users.find({}, function(err,user){
                if (err) throw err;
                console.log(user);
                res.send(user);
        })
});

app.get('/subscribe', (req, res) => {
        res.render('./subscribepage.ejs')
})

app.post('/newuser', (req,res) => {
        console.log(req.body);
        console.log(Users.find({email: req.body.email}));
        if (req.body.email == null) {
                res.send('Wow dude, write something');
        }
        // remember to add the error case
        else if (Users.find({email: req.body.email})==null){
                res.send('Dude, this email is already registered');
        }
        else {
                var newUser = new Users({
                    email: req.body.email,
                    frequency: req.body.frequency
                });
                newUser.save(function(err){
                        if (err) throw err;
                        res.send('Successfully added');
                });
        };
});  //update and/or delete

setupController(app);

app.listen(port);


/*     app.get('/meow', (req,res) => {
        request('http://random.cat/meow',function (err,body){
                if (err) return console.error(err);
              //  image=JSON.parse(body)},
                res.render('./indexcat.ejs', {test : body.file})
        });
});
        });
});
*/


/*
http.createServer(function(req,res){
        //200 is the status code and the rest is the header of the response

        if (req.url === '/meow') {
                res.writeHead(200, {'Content-Type': 'text/html'});

                request('http://random.cat/meow',function (err,resto,body){
                if (err) return console.error(err);
                image=JSON.parse(body);

                html=fs.createReadStream(__dirname+'/indexcat.htm');

                html.on('data',function(data){
                data=data.toString().replace('{MESSAGE}',image.file);
                console.log(data);
                res.write(data);
                        });

                html.on('end',function(data){
                        res.end(data);
                        });
                });
        }

	else if (req.url === '/') {
                fs.createReadStream(__dirname+'/index.htm').pipe(res);
        }

        //This is the json version

	else if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        //creating the json object
        var obj={
                firstname: 'Simon',
                lastname: 'Lebgdu32',
        };

        //Outputting the Json object in the response
        // we have to stringify the JSON or use Javascript on the browser side
        res.end(JSON.stringify(obj));
        }
	
	//In case the url doesn't exist, send a 404 and an empty answer
	else{
		res.writeHead(404);
		res.end();
	}

}).listen(1337);*/

    //.listen is an event given by ttp. Wecan configure the port with it
    //the second parameter (optional) is the address we will be looking for, he is localhost
