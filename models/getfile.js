const fs = require('fs');
const pkgcloud = require('pkgcloud');

var container = ({ name: 'zstorm' });

var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: 'AKIAJYBJDMHXDTUROUHQ', // access key id
    key: 'j0OhIoMpDyz0AJ3Zc9w//3SHIXpqOjYVUQHtGkpT', // secret key
    region: 'us-west-2', // region
  });

client.getFiles( container, function (err, files) {
console.log(files);

  if (err) {
    return (err);
  }
});

