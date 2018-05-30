var rp = require('request-promise');
var fs = require('fs');
var cheerio = require('cheerio');

var websiteTarget;
var startingPoint = 0;
var endingPoint = 0;
var targetUrl;
var targetFolder;

console.log('RSPCA Scraper' + '\n');
console.log('Processing...');

//Logic
function setArguments() {
  websiteTarget = process.argv[2];
  startingPoint = process.argv[3];
  endingPoint = parseInt(startingPoint) + 1000;
  if (websiteTarget === 'adoptapet') {
    targetUrl = 'https://www.adoptapet.com.au/pet/';
    targetFolder = './adoptapet-healthy-urls.txt';
  } else if (websiteTarget === 'rspcansw') {
    targetUrl = 'https://www.rspcansw.org.au/adopt/pet/';
    targetFolder = './rspcansw-healthy-urls.txt';
  }
  console.log(websiteTarget + ': ' + startingPoint + ' - ' + endingPoint);
}

function loopUrls() {
  for (var i = startingPoint; i <= endingPoint; i++) {
    var url = targetUrl + i;
    fireRequest(url);
  }
}

function writeToFile(contents) {
  var stream = fs.createWriteStream(targetFolder, {flags:'a'});
  stream.write(contents + '\n');
  stream.end();
}

function scrapeBody(body) {
  var $ = cheerio.load(body);
  console.log($('<b>Name:</b>').val());
}

function fireRequest(url) {
   rp({uri: url, resolveWithFullResponse: true})
      .then(function (response, body) {
      console.log('Valid URL - ' + url);
      writeToFile(url);
      //scrapeBody(body);
    }).catch(function (reason) {
      console.log('---NOT VALID---' + url);
    });
}

setArguments();
loopUrls();
