let express  = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('<h1>Project started</h1>')
})

app.listen(3000, function(){
	console.log("Listening on port: 3000")
})