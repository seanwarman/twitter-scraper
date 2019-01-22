const curl = require('curl');
const fs = require('fs');
curl.get('https://twitter.com/sohwanwei', (err, response, body) => {
  fs.writeFile('./twitter.html', body, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});