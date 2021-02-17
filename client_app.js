const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefs = protoLoader.loadSync('./tasks.proto');
const taskProto = grpc.loadPackageDefinition(packageDefs);

const clientgRPC = new taskProto.TaskService(
    '127.0.0.1:9000',
    grpc.credentials.createInsecure()
);

module.exports = clientgRPC;