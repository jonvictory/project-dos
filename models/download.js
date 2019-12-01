
const fs = require('fs');
const pkgcloud = require('pkgcloud');


var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: 'AKIAJYBJDMHXDTUROUHQ', // access key id
    key: 'j0OhIoMpDyz0AJ3Zc9w//3SHIXpqOjYVUQHtGkpT', // secret key
    region: 'us-west-2', // region
  });

client.download({
  container: 'zstorm',
  remote: 'image.jpg'
}).pipe(fs.createWriteStream('image1.jpg'));


