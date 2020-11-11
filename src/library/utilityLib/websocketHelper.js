const AWS = require("aws-sdk");
const websocketHelper = [];
//TODO: Replace the logic to automatically find url
// const url = "http://a7ldn4mjkj.execute-api.ap-south-1.amazonaws.com/dev";
// const url = "http://localhost:3001";

websocketHelper.broadcastToEveryoneInRoom = async (users, data) => {
    try {
        users.map(user => {
            sendMessageToClient(user.connectionId, JSON.stringify(data));
        });
    } catch (e) {
        console.log(e);
    }
}
websocketHelper.broadcastToRoomExceptCurrentUser = async (users, data, currentUser) => {
    try {
        users.map(user => {
            if (user.connectionId == currentUser.connectionId) {
                return false;
            }
            sendMessageToClient(user.connectionId, JSON.stringify(data));
        });
    } catch (e) {
        console.log(e);
    }
}

websocketHelper.broadcastToUser = async (user, data) => {
    try {
        sendMessageToClient(user.connectionId, JSON.stringify(data));
    } catch (e) {
        console.log(e);
    }
}

const sendMessageToClient = (connectionId, payload) =>
    new Promise((resolve, reject) => {
        const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
            apiVersion: '2018-11-29',
            endpoint: process.env.WSS_URL,
        });
        apigatewaymanagementapi.postToConnection(
            {
                ConnectionId: connectionId, // connectionId of the receiving ws-client
                Data: JSON.stringify(payload),
            },
            (err, data) => {
                if (err) {
                    console.log('err is', err);
                    reject(err);
                }
                console.log(err, data);
                resolve(data);
            }
        );
    });


module.exports = websocketHelper;
