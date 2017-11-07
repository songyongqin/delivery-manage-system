import WebSocket from 'ws';

const WebSocketServer = WebSocket.Server;

const app = new WebSocketServer({
  port: "6001"
})

const random = (start, end) => {
  return parseInt(Math.random() * (end - start + 1) + start)
}


const connectList = [];

app.on("connection", (ws) => {
  try {
    connectList.push(ws);
    // const mc=new SocketControllers(ws,socketConList,true);
    // mc.add('boardCast',socketControllers.boardCastController);
  } catch (e) {
    ws.close();
  }
});

let dataList = [
  {
    time: new Date().getTime(),
    data: {
      http: 0,
      tcp: 0,
      dns: 0,
    }
  }
]

const updateData = () => {
  const lastData = dataList[dataList.length - 1].data

  dataList.push({
    time: new Date().getTime(),
    data: {
      http: lastData.http + random(10, 30),
      tcp: lastData.tcp + random(50, 100),
      dns: lastData.tcp + random(5, 10)
    }
  })

  dataList = dataList.slice(dataList.length - 30 > 0 ? dataList.length - 30 : 0);

}

setInterval(() => {
  updateData();
  connectList.forEach((i, index) => {
    try {
      i.send(JSON.stringify(dataList, null, 2))
    } catch (e) {
      connectList.splice(index, 1)
    }
  })

}, 3000)

console.info("websocket is running")