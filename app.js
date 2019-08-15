const { browse } = require('./network.js');

process.stdout.write("Input URL : ");
process.stdin.on("data", function (input) {
    const urlString = input.toString().trim();
    console.log('Start browse url : ' + urlString);

    try { browse(urlString); } 
    catch(e) { console.log(e.message); }

}.bind(this));

// test
// browse("http://zum.com");
