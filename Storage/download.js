
var fs = require('fs');
var pkgcloud = require('pkgcloud');
console.log(process.env.KEY)


var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: process.env.KEY, // access key id
    key: process.env.SECRET, // secret key
    region: 'us-west-2', // region
  });

client.download({
  container: 'zstorm',
  remote: 'image.jpg'
}).pipe(fs.createWriteStream('image1.jpg'));


module.exports = client;
