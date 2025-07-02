const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const db = require('./config/db');

const PROTO_PATH = path.join(__dirname, 'user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

async function GetUserProfile(call, callback) {
    try {
        const userId = call.request.user_id;
        const query = 'SELECT id, username, "profileImage", email FROM "Users" WHERE id = $1';
        const result = await db.query(query, [userId]);
        const user = result.rows ? result.rows[0] : result[0];
        if (!user) return callback(null, {});
        callback(null, {
            user_id: user.id,
            username: user.username,
            profileImage: user.profileImage,
            email: user.email
        });
    } catch (err) {
        callback(err);
    }
}

function main() {
    const server = new grpc.Server();
    server.addService(userProto.UserService.service, { GetUserProfile });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('gRPC UserService listening on 0.0.0.0:50051');
    });
}

if (require.main === module) {
    main();
}
