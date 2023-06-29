<template>
  <!-- <el-row>
    <el-col :span="18" style="padding-right:10px;">
      <div class="svgDiv">
        <el-card class="svgBox">
          <h3>左边区域</h3>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" style="padding-left:10px">
      <div class="rightDiv">
        <div style="margin-top:10px; width:100%">
          <h3>右侧区域</h3>
        </div>
      </div> 
    </el-col>
  </el-row> -->
  <div style="padding: 10px; background-color: #f8f8f8">
    <el-row :gutter="20" style="margin: 10px 0px 20px 0px">
      <el-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <div style="overflow: hidden; border: 1px solid #ccc">
          <div ref="map" style="height: 650px"></div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <el-card shadow="none" style="">
          <h3 style="font-weight: bold">
            <i class="el-icon-s-data"></i> 设备统计
          </h3>
          <el-row :gutter="40" class="panel-group">
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue">
                  <svg-icon icon-class="device" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">设备数量</div>
                  <count-to
                    :start-val="0"
                    :end-val="2"
                    :duration="3000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-red">
                  <svg-icon
                    icon-class="monitor-a"
                    class-name="card-panel-icon"
                  />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">监测数据</div>
                  <count-to
                    :start-val="0"
                    :end-val="3"
                    :duration="3000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue">
                  <svg-icon icon-class="model" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">产品数量</div>
                  <count-to
                    :start-val="0"
                    :end-val="4"
                    :duration="1000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-red">
                  <svg-icon icon-class="alert" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">告警数量</div>
                  <count-to
                    :start-val="0"
                    :end-val="5"
                    :duration="1000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-blue">
                  <svg-icon icon-class="log-a" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">操作记录</div>
                  <count-to
                    :start-val="0"
                    :end-val="6"
                    :duration="2000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="card-panel-col">
              <div class="card-panel">
                <div class="card-panel-icon-wrapper icon-red">
                  <svg-icon icon-class="event-a" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                  <div class="card-panel-text">上报事件</div>
                  <count-to
                    :start-val="0"
                    :end-val="7"
                    :duration="2000"
                    class="card-panel-num"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card shadow="none" style="margin-top: 22px; height: 302px">
          <h3 style="font-weight: bold; margin-bottom: 10px">
            <i class="el-icon-s-order"></i> 信息栏
          </h3>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import { homeWsUrl } from '@/api/webSocket.js'
import { loadBMap } from '@/util/map.js'
//安装的是echarts完整包，里面包含百度地图扩展，路径为 echarts/extension/bmap/bmap.js，将其引入
//ECharts的百度地图扩展，可以在百度地图上展现点图，线图，热力图等可视化
require('echarts/extension/bmap/bmap')
export default {
  name: "Home",
  components:{CountTo},
  data() {
    return {
      heartbeatTimer:null,
      webSocket:null,
      redata:null,

      isExit:false,
      deviceList:[
        {
          longitude:116.404,
          latitude:39.915,
          deviceName:'测试',//设备名称
          deviceId:'mqttx_0ba2fe99',//设备编号
          status:3,//设备状态
          lhStatus:null, //左前
          rhStatus:null, //右前
          ltStatue:null, //左后
          rtStatus:null, //右后
        }
      ]
    };
    
  },
  computed: {},
  created(){
    this.loadMap();
    this.initWebSocket()
  },
  methods: {
    initWebSocket() {
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        // 初始化weosocket(必须)  配置服务器端 WebSocket 接受 url
        let socketUrl = homeWsUrl();
        this.webSocket = new WebSocket(socketUrl); // 新建一个websocket对象
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
      }, 600 * 1000); // 600 秒发一次心跳包
    },
    webSocketOnError() {
      this.initWebSocket()
    },
    webSocketOnMessage(e) {
      // 数据接收
      this.redata = JSON.parse(e.data);
      console.log("接收的数据为", this.redata);
      //此处获取到服务器推送的数据，可以进行后续操作
      for(let i = 0; i < this.deviceList.length; i++){
        // 车辆信息已经存在deviceList表里，更新经纬度即可
        if(this.deviceList[i].deviceId === this.redata.deviceId){
          this.deviceList[i].longitude = this.redata.longitude
          this.deviceList[i].latitude = this.redata.latitude
          this.isExit = true
          break
        }
      }
      // 新的车辆信息，添加到deviceList中
      if(this.redata.deviceName && !this.isExit){
        this.deviceList.push({
          longitude:this.redata.longitude,
          latitude:this.redata.latitude,
          deviceName:this.redata.deviceName,
          deviceId:this.redata.deviceId,
          status:this.redata.status,
          lhStatus:this.redata.lhStatus, 
          rhStatus:this.redata.rhStatus, 
          ltStatue:this.redata.ltStatue, 
          rtStatus:this.redata.rtStatus, 
        })
      }
      console.log(this.deviceList)
      this.isExit = false
      this.getmap()
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

    // 加载地图
    loadMap(){
      this.$nextTick(() => {
        loadBMap().then(() => {
          this.getmap();
        });
      })
    },
    /** 地图 */
    getmap() {
        var myChart = echarts.init(this.$refs.map);
        var option;
        //格式化数据
        let convertData = function (data, status) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = [data[i].longitude, data[i].latitude];
                if (geoCoord && data[i].status == status) {
                    res.push({
                        name: data[i].deviceName,
                        value: geoCoord,
                        deviceId: data[i].deviceId,
                        status: data[i].status,
                        longitude:data[i].longitude,
                        latitude:data[i].latitude
                    });
                }
            }
            return res;
        };        
        option = {
            title: {
                text: '设备分布（在线数'+ this.deviceList.filter( item => item.status == 3).length +'）',
                textStyle: {
                    color: '#333',
                    textBorderColor: '#fff',
                    textBorderWidth: 10,
                },
                top: 10,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    var htmlStr = '<div style="padding:5px;line-height:28px;">';
                    htmlStr += "设备名称： <span style='color:#409EFF'>" + params.data.name + "</span><br />";
                    htmlStr += "设备编号： " + params.data.deviceId + "<br />";
                    htmlStr += "设备状态： ";
                    if (params.data.status == 1) {
                        htmlStr += "<span style='color:#E6A23C'>未激活</span>" + "<br />";
                    } else if (params.data.status == 2) {
                        htmlStr += "<span style='color:#F56C6C'>禁用</span>" + "<br />";
                    } else if (params.data.status == 3) {
                        htmlStr += "<span style='color:#67C23A'>在线</span>" + "<br />";
                    } else if (params.data.status == 4) {
                        htmlStr += "<span style='color:#909399'>离线</span>" + "<br />";
                    }
                    htmlStr += "经度： " + params.data.longitude + "<br />";
                    htmlStr += "纬度： " + params.data.latitude + "<br />";
                    htmlStr += "左前方洒水： " + params.data.lhStatus + "<br />";
                    htmlStr += "右前方洒水： " + params.data.rhStatus + "<br />";
                    htmlStr += "左后方洒水： " + params.data.ltStatus + "<br />";
                    htmlStr += "右后方洒水： " + params.data.rtStatus + "<br />";
                    // if (params.data.isShadow == 1) {
                    //     htmlStr += "设备影子： " + "<span style='color:#67C23A'>启用</span>" + "<br />";
                    // } else {
                    //     htmlStr += "设备影子： " + "<span style='color:#909399'>未启用</span>" + "<br />";
                    // }
                    // htmlStr += "产品名称： " + params.data.productName + "<br />";
                    // htmlStr += "固件版本： Version " + params.data.firmwareVersion + "<br />";
                    // htmlStr += "激活时间： " + params.data.activeTime + "<br />";
                    // htmlStr += "定位方式： ";
                    // if (params.data.locationWay == 1) {
                    //     htmlStr += "自动定位" + "<br />";
                    // } else if (params.data.locationWay == 2) {
                    //     htmlStr += "设备定位" + "<br />";
                    // } else if (params.data.locationWay == 3) {
                    //     htmlStr += "自定义位置" + "<br />";
                    // } else {
                    //     htmlStr += "未知" + "<br />";
                    // }
                    // htmlStr += "所在地址： " + params.data.networkAddress + "<br />";
                    htmlStr += '</div>';
                    return htmlStr;
                }
            },
            bmap: {
                center: [116.404, 39.915],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: [{
                            featureType: 'water',
                            elementType: 'all',
                            stylers: {
                                color: '#a0cfff'
                            }
                        },
                        {
                            featureType: 'land',
                            elementType: 'all',
                            stylers: {
                                color: '#fafafa' // #fffff8 淡黄色
                            }
                        },
                        {
                            featureType: 'railway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'highway',
                            elementType: 'all',
                            stylers: {
                                color: '#fdfdfd'
                            }
                        },
                        {
                            featureType: 'highway',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry',
                            stylers: {
                                color: '#fefefe'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#fefefe'
                            }
                        },
                        {
                            featureType: 'poi',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'green',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'subway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'manmade',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'local',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'boundary',
                            elementType: 'all',
                            stylers: {
                                color: '#999999'
                            }
                        },
                        {
                            featureType: 'building',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'label',
                            elementType: 'labels.text.fill',
                            stylers: {
                                color: '#999999'
                            }
                        }
                    ]
                }
            },
            series: [{
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(this.deviceList, 1),
                    symbolSize: 10,
                    itemStyle: {
                        color: '#E6A23C'
                    }
                },
                {
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(this.deviceList, 2),
                    symbolSize: 10,
                    itemStyle: {
                        color: '#F56C6C'
                    }
                }, {
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(this.deviceList, 4),
                    symbolSize: 10,
                    itemStyle: {
                        color: '#909399'
                    }
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: convertData(this.deviceList, 3),
                    symbolSize: 10,
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke',
                        scale: 5
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    itemStyle: {
                        color: '#67C23A',
                        shadowBlur: 100,
                        shadowColor: '#333'
                    },
                    zlevel: 1
                }
            ]
        };
        option && myChart.setOption(option);       
    },
  },  
  beforeDestroy() {
    this.webSocket.onclose = this.webSocketOnClose
  },
};
</script>

<style lang="scss" scoped>

.panel-group {
    .card-panel-col {
        margin-bottom: 10px;
    }

    .card-panel {
        height: 68px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        color: #666;
        border: 1px solid #eee;
        border-radius: 5px;
        //box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
        background-color: #fff;

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-blue {
                background: #36a3f7;
            }

            .icon-green {
                background: #34bfa3
            }

            .icon-red {
                background: #F56C6C;
            }

            .icon-orange {
                background: #E6A23C;
            }
        }

        .icon-blue {
            color: #36a3f7;
        }

        .icon-green {
            color: #34bfa3
        }

        .icon-red {
            color: #F56C6C;
        }

        .icon-orange {
            color: #E6A23C;
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 10px;
            padding: 10px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 30px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 15px;
            margin-left: 0px;

            .card-panel-text {
                line-height: 14px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 14px;
                margin-bottom: 12px;
                text-align: right;
            }

            .card-panel-num {
                font-size: 18px;
            }
        }
    }
}
</style>