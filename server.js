const http = require('http');
const app = require('./app/app.js');

const port = process.env.port || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(app.get('port'), () => console.log(`Server is running on port ${app.get('port')}`));
