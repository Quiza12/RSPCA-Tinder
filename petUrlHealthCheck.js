var request = require('request');
var rp = require('request-promise');
var fs = require('fs');

console.log('RSPCA Scraper' + '\n');
console.log('Processing...');

//Logic
function loopUrls() {
  for (var i = 560000; i <= 565000; i++) {
    var url = 'https://www.adoptapet.com.au/pet/' + i;
    fireRequest(url);
  }
}

function writeToFile(contents) {
  var stream = fs.createWriteStream('./healthy-urls.txt', {flags:'a'});
  stream.write(contents + '\n');
  stream.end();
}

function fireRequest(url) {
   rp({uri: url, resolveWithFullResponse: true})
      .then(function (response) {
      console.log('Valid URL - ' + url);
      writeToFile(url);
    }).catch(function (reason) {
      console.log('---NOT VALID - ' + url);
    });
}

loopUrls();
