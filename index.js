var express = require("express");
var app = express();
var request = require("request");
var cheerio = require("cheerio");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/views"))
app.listen(process.env.PORT || 525)

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.post("/apitest", function(req, res){
    var oriLink = req.body.link; 
    request(oriLink, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
        
         var $ = cheerio.load(body);
         var ds = $('a[target=_blank]')
         //res.render("link", {html : ds })
         var arr = [];
         ds.each(function(i, e){
            //console.log($(this).text())
            arr[i]= e["attribs"]["href"]
            console.log(e["attribs"]["href"]);
            
         })
         console.log(arr)
         let linkQR = "http://api.qrserver.com/v1/create-qr-code/?data=" + arr[1] + "!&size=400x400";
         res.render("testPlayer", {link128: arr[0], link320: arr[1], lossless: arr[2], QR: linkQR});
      });
})

app.get("/home", function(req, res){
    res.render("home")
})
