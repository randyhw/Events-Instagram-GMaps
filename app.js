var http = require('http');
var https = require("https");
var path = require('path');
var express = require('express');
var hogan = require('hogan-express');
var mysql = require('mysql');
var fs = require('fs');
var url = require('url');
//var instagram = require('./instagram')

var queries = [];

var port = (process.env.VCAP_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');

var scores = {};
var packet_score = {};

var global_res;

// all environments
app = express();

// check if application is being run in cloud environment
if (process.env.VCAP_SERVICES) {
  var services = JSON.parse(process.env.VCAP_SERVICES);

  // look for a service starting with 'mysql'
  for (var svcName in services) {
    if (svcName.match(/^mysql/)) {
      var mysqlCreds = services[svcName][0]['credentials'];
      var db = mysql.createConnection({
        host: mysqlCreds.host,
        port: mysqlCreds.port,
        user: mysqlCreds.user,
        password: mysqlCreds.password,
        database: mysqlCreds.name
      });

      createTable();
    }
  }
}

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('env', 'development');
app.engine('html', hogan);

app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// show table
/*app.all('/', function (req, res) {

    res.render('index.html', {posts: posts});

  getPosts(function (err, posts) {
    if (err) return res.json(err);
    res.render('index.html', {posts: posts});
  });
});

// upload file
app.post('/upload', function (req, res) {
  fs.readFile(req.files.file.path, 'utf8', function (err, data) {
    if (err) return res.json(err);
    // split file into array of non-empty Strings
    var posts = data.split(/\r\n?|\n/).filter(isNotEmpty);
    
    // insert posts into mysql db
    addPosts(posts, function (err, result) {
      if (err) return res.json(err);
      var msg = 'Added ' + result.affectedRows + ' rows.';

      // display all posts
      getPosts(function (err, posts) {
        if (err) return res.json(err);
        res.render('index.html', {posts: posts, msg: msg});
      });
    });
  });
});*/


app.get('/map.js', function (req, res) {
    var buffer1 = fs.readFileSync("map.js");
        res.writeHead(200);
        res.end(buffer1);

  });

// index
app.get('/', function (req, res) {
  var url_get = url.parse(req.url).search;
  global_res = res;

  if (url_get) {
    query = GetValueFromUrlGet(url_get,"query");
    //res.render('result.html', {msg: query});

    getLocationsType(query, function (err, locations) {
      if (err) return res.json(err);
      var packet = [];

      for (var i=0; i<locations.length; i++) {
        packet.push(locations[i].name);
      }
      console.log(packet);

      var msg = query;
      if (locations.length == 0) {
        msg = "Sorry, currently we don't have " + query + " data in our database";
        res.render('result.html', {locations: locations, msg: msg});
      }
      else {
        queries = packet;
        for (q in packet) {
          query_igram(packet[q], function() {
            normalize_scores();
            print_scores();

            for (var i in locations) {
              locations[i].score = packet_score[locations[i].name];  
            }
      console.log(locations);

            var content = "var beaches = [\n";

            for (var i in locations) {
              if (i > 0)
                content += ",\n";

              content += '[\'' + locations[i].hname + '\', ' + 
                locations[i].latitude + ', ' + locations[i].longitude + ', ' +
                i + ', ' + locations[i].score + ']\n';
            }
            content += '];\n\n';

            for (var i in locations) {
              content += 'var contentString_temp = \'<div id=\"content\">\'+\'<div id=\"siteNotice\">\'+\'</div>\'+\'<h1 id=\"firstHeading\" class=\"firstHeading\">';
              content += locations[i].hname;
              content += '</h1>\'+\'<div id=\"bodyContent\">\'+\'</div>\'+\'</div>\';contentString.push(contentString_temp);';
            }

            fs.writeFile("content.js", content, function(err) {});

            var buffer1 = fs.readFileSync("map1.js");
            var buffer2 = fs.readFileSync("map2.js");
            var content = fs.readFileSync("content.js");

            content = buffer1 + content + buffer2;

            global_res.render('result.html', {locations: locations, msg: msg, jscr: content, js: "map.js"}); 
          });
          //normalize_scores();
          //print_scores();
        }       
      }
      
    });
  }
  else {
    // handle request without GET variables
    res.render('index.html');
  }
});

// clear table
/*app.get('/delete', function (req, res) {
  deletePosts(function (err, result) {
    if (err) return res.json(err);
    var msg = 'Deleted ' + result.affectedRows + ' rows.';
    res.render('index.html', {msg: msg});
  });
});*/

// delete table
app.get('/delete_table', function (req, res) {
  deleteTables(function (err, result) {
    if (err) return res.json(err);
    res.render('test.html', {msg: msg});
  });
});

// get locations
app.get('/get_locations', function (req, res) {
  getLocationsType("beach", function (err, locations) {
    if (err) return res.json(err);
    console.log(locations);
    var packet = [];

    for (var i=0; i<locations.length; i++) {
      packet.push(locations[i].name);
    }
    console.log(packet);
    var msg = '';
    res.render('test.html', {locations: locations, msg: msg});
  });
});

function add_loc_cb (err, result) {
    if (result) {
      console.log('added successfully!');
      //msg += ' added ' + result.affectedRows + ' rows.';
    }
    console.log(result);
  };

// add locations
app.get('/add_locations', function (req, res) {

  var values = []

  values = ["beach", "myrtlebeach", "Myrtle Beach", 33.7167, -78.8833];
  addLocations(values, add_loc_cb);
  values = ["beach", "outerbanks", "Outer Banks", 35.3736, -75.4953];
  addLocations(values, add_loc_cb);
  values = ["beach", "wrightsville", "Wrightsville Beach", 34.0189, -77.8986];
  addLocations(values, add_loc_cb);
  msg = "ok"

  res.render('test.html', {msg: msg});

});


// start server
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening at http://' + host + ':' + port);
});

////////////////////////////////////////////////////////////////////////////////

function createTable() {
  var sql = 'CREATE TABLE IF NOT EXISTS posts ('
            + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
            + 'posts text'
          + ');';
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("table posts created...");
  });

  sql = 'CREATE TABLE IF NOT EXISTS locations ('
            + 'id INTEGER PRIMARY KEY AUTO_INCREMENT,'
            + 'text varchar(255),'
            + 'name varchar(255),'
            + 'hname varchar(255),'
            + 'longitude float,'
            + 'latitude float'
          + ');';
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("table locations created...");
  });
}

function getPosts(cb) {
  var sql = 'SELECT text FROM posts';
  db.query(sql, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function getLocations(cb) {
  var sql = 'SELECT text,name,hname,longitude,latitude FROM locations';
  db.query(sql, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function getLocationsType(type,cb) {
  var sql = 'SELECT text,name,hname,longitude,latitude FROM locations WHERE text="' + type + '"';
  db.query(sql, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function addPosts(posts, cb) {
  var sql = 'INSERT INTO posts (text) VALUES ?';
  
  var values = posts.map(function (post) {
    return [post];
  });
  
  db.query(sql, [values], function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function addLocations(posts, cb) {
  var sql = 'INSERT INTO locations (text, name, hname, latitude, longitude) VALUES (' +
    ' "' + posts[0] + '" ' +
    ',"' + posts[1] + '" ' +
    ',"' + posts[2] + '" ' +
    ',' + posts[3] + ' ' +
    ',' + posts[4] + ' ' +
    ')';

  console.log(sql);
  db.query(sql, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function deletePosts(cb) {
  var sql = 'DELETE FROM posts WHERE 1';
  db.query(sql, function (err, result) {
    if (err) return cb(err);
    cb(null, result);
  });
}

function deleteTables(cb) {
  sql = 'DROP TABLE IF EXISTS posts';
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("table posts deleted...");
  });
  sql = 'DROP TABLE IF EXISTS locations';
  db.query(sql, function (err, result) {
    if (err) console.log(err);
    console.log("table locations deleted...");
  });
}

function isNotEmpty(str) {
  return str && str.trim().length > 0;
}

function GetValueFromUrlGet(url_get_string,variable) 
{
    var vars = url_get_string.split("?")[1].split("&");
    
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            return unescape(pair[1]);
        }
    }
    return "";
}

function print_scores(){
            console.log("Scores : "+ JSON.stringify(scores));
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
        packet_score[queries[q]] = (parseInt(scores[queries[q]] * 100/max) + 32);
    }

}
function query_igram(query, cb){
    //var token_igram = "3639781.f59def8.f728cd91e86849f29e38c23ec9a021a2"
    var token_igram = "3639781.650c17d.64f8d05fd1464ef898f37e6123839703"

    var query = query;
    var url = "https://api.instagram.com/v1/tags/"+query+"?access_token="+token_igram;

    var json_res, resp_status; //200 if OK
        

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
            var name = json_res.data.name;
            scores[name] = json_res.data.media_count;
            if (Object.keys(scores).length == 3){ 
              cb();
            }
            resp_status = json_res.meta.code;
        });
    }).on('error', function(e) {
        
          console.log("Got error: ", e);
    });

    return;
}
