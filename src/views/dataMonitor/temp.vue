<template>
  <h3>测试界面</h3>
</template>

<script>
export default {
  name: "temp",
  data() {
    return {
      heartbeatTimer:null,
      webSocket:null,
      redata:null
    };
  },
  methods: {
    initWebSocket() {
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        // 初始化weosocket(必须)  配置服务器端 WebSocket 接受 url， 此处按照自己的项目路径进行配置
        let socketUrl =
          'ws://192.168.1.203:8088/ws/1111';
        this.webSocket = new WebSocket(socketUrl); // 新建一个webstock对象
        this.webSocket.onopen = this.webSocketOnOpen;
        this.webSocket.onmessage = this.webSocketOnMessage;
        this.webSocket.onerror = this.webSocketOnError;
        this.webSocket.onclose = this.webSocketOnClose;
      } else {
        this.$message.error("当前浏览器不支持 websocket");
      }
    },
    webSocketOnOpen() {
      console.log("---连接建立成功---");
      this.heartbeatTimer = setInterval(() => {
        this.websocketsend("PING");
      }, 30 * 1000); // 30 秒发一次心跳包
    },
    webSocketOnError() {
      this.initWebSocket()
    },
    webSocketOnMessage(e) {
      // 数据接收
      this.redata = JSON.parse(e.data);
      console.log("接收的数据为", this.redata);
      //此处获取到服务器推送的数据，就可以进行后续操作 。。。
    },
    websocketsend(Data) {
      // 数据发送
      this.webSocket.send(Data);
    },
    webSocketOnClose(e) {
      console.log("断开连接", e);
      if (this.heartbeatTimer) {
        clearInterval(this.heartbeatTimer); //清除定时器
      }
    },
  },
  mounted() {
    this.initWebSocket()
  },
  destroyed(){
    this.webSocket.onclose = this.webSocketOnClose
  }
};
</script>

<style>
</style>