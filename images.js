//var http = require('http');
var https = require("https"); //MUST for Instagram

var queries = [ "myrtlebeach", "outerbanks", "wrightsville"];
var images = [];

function query_images(query){
    //media could be fetched either by hashtag or lat/long, opted #
    //var token_igram = "3639781.f59def8.f728cd91e86849f29e38c23ec9a021a2"
    //var token_igram2 = "3639781.650c17d.64f8d05fd1464ef898f37e6123839703"

    var query = query;
    //var url = "https://api.instagram.com/v1/tags/"+query+"?access_token="+token_igram;
    var url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+ query 

    var json_res,
        imgurl;

    //var date = Date.now() / 1000;
    //console.log(parseInt(date));

    console.log("req:\n" + url)

    https.get(url, function(res) {
        var body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            json_res = JSON.parse(body);
            for (r in json_res.responseData.results){
                imgurl = json_res.responseData.results[r].tbUrl;
                images.push(imgurl);
            }
                console.log(images);
        });
    }).on('error', function(e) {
        
          console.log("Got error: ", e);
    });

    console.log("end images.js");
}

//main
//for (q in queries){
    //console.log(queries[q]);
    //query_images(queries[q]);
//}
//USE THIS for each query:
query_images(queries[2]);

