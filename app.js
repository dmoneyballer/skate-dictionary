const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
let app = express();

let skateTerms = [
	{
		term: "gnar",
		defined: "something gnarly sometimes used twice, ie: 'we shredded some gnar gnar last night'"
	},
	{
		term: "tre flip",
		defined: "generally aknowledged as the most beautiful fliptrick. It get's its name because the board rotates 360 degrees while flipping once."
	},
	{
		term: "switch",
		defined: "a stance of skating in which the skater uses his non-dominant foot to be the back foot"
	}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.use(express.static("./public"));

app.use(cors());

app.get("/dictionary-api", function(req, res) {
	res.json(skateTerms);
});

app.post("/dictionary-api", function (req, res) {
  skateTerms.push(req.body);
  res.json(skateTerms)
});
app.delete("/dictionary-api/:term", function(req, res) {
    skateTerms = skateTerms.filter(function(definition) {
        return definition.term.toLowerCase() !== req.params.term.toLowerCase();
    });
    res.json(skateTerms);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
