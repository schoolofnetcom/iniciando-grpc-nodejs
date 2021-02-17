const clientgRPC = require('./client_app');

clientgRPC.findAll({}, (err, tasks) => {
    if (err) {
        console.log('ERROR');
    }

    console.log('SUCCESS -> ', tasks);
});