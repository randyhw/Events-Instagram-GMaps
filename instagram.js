var http = require('http');
var https = require("https");

var scores = [];
var queries = [ "myrtlebeach", "outerbanks", "wrightsville"];
var packet_score = {};

function print_scores(){
            console.log("Scores : "+ scores);
            console.log("Normalized Scores : "+ JSON.stringify(packet_score));
}

function normalize_scores(){
    var max = 0;
    for (s in scores){
        if (scores[s] > max){
            max = scores[s];
        }
    }
    for (q in queries){
        packet_score[queries[q]] = parseInt(scores[q] * 100/max);
    }

}
function query_igram(query){
    var token_igram = "<YOUR INSTAGRAM API KEY>"
    
    var query = query;
    var url = "https://api.instagram.com/v1/tags/"+query+"?access_token="+token_igram;

    var json_res,
        score,
        resp_status; //200 if OK

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
            score = json_res.data.media_count;
            scores.push(score);
            if (scores.length == 3){ 
                normalize_scores();
                print_scores();
            }
            resp_status = json_res.meta.code;
        });
    }).on('error', function(e) {
        
          console.log("Got error: ", e);
    });

    console.log("end instagram.js");

    return score;
}

//main
for (q in queries){
    console.log(queries[q]);
    //query_igram(queries[q]);
    scores = [91952,13868,608004];
    normalize_scores();
    print_scores();
}
