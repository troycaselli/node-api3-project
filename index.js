const server = require('./api/server');

const port = 8000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
