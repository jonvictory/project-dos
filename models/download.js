
const fs = require('fs');
const pkgcloud = require('pkgcloud');


var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: key, // access key id
    key: key, // secret key
    region: 'us-west-2', // region
  });

client.download({
  container: 'zstorm',
  remote: 'image.jpg'
}).pipe(fs.createWriteStream('image1.jpg'));


