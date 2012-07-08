var express = require('express');
var spawn = require('child_process').spawn;
var fs = require('fs');

var app = express.createServer();

var publicDir = __dirname+"/public"

app.configure(function() {
    app.use(express.errorHandler());
    app.use(express.static(publicDir));
});

app.listen(process.env.PORT || '3000');
console.log("listening on "+(process.env.PORT || '3000'));

function getDirectories(baseDir) {
    var result = [];
    fs.readdirSync(baseDir).forEach(function(fileName) {
        if (fs.statSync(baseDir+'/'+fileName).isDirectory()) {
            result.push(fileName);
        }
    });
    return result;
}

function getAllModules() {
    
    function getModules(path, moduleType) {
        var modules = [];
        getDirectories(path).forEach(function(moduleName) {
            modules.push({
                type: moduleType,
                name: moduleName,
                path: path+'/'+moduleName
            });
        });
        return modules;
    };
    
    var modules = getModules(publicDir+'/angular-ui/modules/directives', 'directive')
        .concat(getModules(publicDir+'/angular-ui/modules/filters', 'filter'));
    
    return modules;
}

function buildModules(modules) {
    //Use Makefile to build an array of directory names into one js file
    //var make = spawn("make", [args...])
    //Listen for make.stdout and read file contents from stdout?
}

app.post('/build', function(req, res) {
    console.log('post build '+req.body);
    buildModules(req.body.modules);
});

app.get('/modules', function(req, res) {
    res.send(getAllModules());
});
    