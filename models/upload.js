var fs = require('fs');
var pkgcloud = require('pkgcloud');


var client = pkgcloud.storage.createClient({
    provider: 'amazon',
    keyId: 'AKIAJYBJDMHXDTUROUHQ', // access key id
    key: 'j0OhIoMpDyz0AJ3Zc9w//3SHIXpqOjYVUQHtGkpT', // secret key
    region: 'us-west-2' // region
 });

 var readableStream = fs.createReadStream('./image.jpg');

var writableStream = client.upload({
    queueSize: 1, // == default value
    partSize: 5 * 1024 * 1024, // == default value of 5MB
    container: 'zstorm',
    remote: 'image.jpg'
});


readableStream.pipe(writableStream)
.on('success', function(file) {
    console.log(file);
}).on('error', function(err) {
    console.log(err);
});