const express = require('express'),
    app = express();

app.get('/', function(req, res){
    var apiResponse = [];
    var request = require('request');
    request({
        url: ' https://api.github.com/orgs/takenet/repos?language:C#%sort:created',
        headers: { 'user-agent': 'brunohrf' },
        json: true
    }, function (error, response, body) {
        if(!error && response.statusCode === 200) {
            apiResponse = body.slice(0,5);
            let repos = [];
            for(let i = 0; i < 5; i++) {
                repos.push({
                    name: apiResponse[i].full_name,
                    description: apiResponse[i].description,
                    avatar: apiResponse[i].owner.avatar_url
                });
            }
            res.send(repos);
        }
    });
});
var porta = process.env.PORT || 8080;
app.listen(porta);