const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const tasks = require('./tasks');

const packageDefs = protoLoader.loadSync('./tasks.proto');
const taskProto = grpc.loadPackageDefinition(packageDefs);

const gRpcServer = new grpc.Server();
gRpcServer.addService(taskProto.TaskService.service, {
    findAll: (_, callback) => {
        callback(null , { tasks });
    },
    insert: (_, callback) => {
        const task = _.request;
        tasks.push(task);
        callback(null, { task });
    },
    find: (_, callback) => {
        const task = tasks.find(el => el.id == _.request.id);
        if (task) {
            callback(null, { task });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                reason: 'Id does not exists'
            });
        }
    }
});

gRpcServer.bind('127.0.0.1:9000', grpc.ServerCredentials.createInsecure());
gRpcServer.start();
console.log('gRPC Server has been started.. http://127.0.0.1:9000');