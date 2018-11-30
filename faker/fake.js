const http = require('http');

const data = JSON.stringify({
  todo: 'Buy the milk'
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/fake',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options);

req.on('error', (error) => {
  console.error(error)
})

req.write(data);
req.end();
