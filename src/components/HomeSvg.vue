<template>
  <div style="position:relative">
    <img src="../assets/images/梁面图2.svg" width="100%" height="100%">
    <div class="test" style="position:absolute" @click="sendId(tempOne.id)">
        <div>
            <el-button circle>温</el-button>
        </div>
        <div>
            <p>{{tempOne.value}}℃</p>
        </div>
    </div>
    <!-- <svg class="svg" width="100%" height="600">
        
        <rect x="50" y="50" width="800" height="200" stroke="black" fill="transparent"/>
        <rect x="50" y="350" width="800" height="200" stroke="black" fill="transparent"/>
        
        <rect x="60" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="100" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="140" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="180" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="220" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="260" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="300" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="340" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="380" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="420" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="460" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="500" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="540" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="580" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="620" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="660" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="700" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="740" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="780" y="70" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="820" y="70" width="20" height="160" stroke="black" fill="transparent"/>

        
        <rect x="60" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="100" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="140" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="180" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="220" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="260" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="300" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="340" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="380" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="420" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="460" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="500" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="540" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="580" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="620" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="660" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="700" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="740" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="780" y="370" width="20" height="160" stroke="black" fill="transparent"/>
        <rect x="820" y="370" width="20" height="160" stroke="black" fill="transparent"/>

        
        <line x1="50" x2="850" y1="150" y2="150" stroke="black" stroke-dasharray="20,10,5,10,20,10" stroke-width="0.5"/>
        <line x1="50" x2="850" y1="450" y2="450" stroke="black" stroke-width="0.5"/>

        <line x1="50" x2="850" y1="100" y2="100" stroke="black" stroke-width="0.5"/>
        <line x1="50" x2="850" y1="120" y2="120" stroke="black" stroke-width="0.5"/>
        <line x1="50" x2="850" y1="180" y2="180" stroke="black" stroke-width="0.5"/>
        <line x1="50" x2="850" y1="200" y2="200" stroke="black" stroke-width="0.5"/>

        
        <polyline points="63 100,63 80,77 80,77 100" stroke="black" fill="transparent"/>
        <polyline points="63 120,63 140,77 140,77 120" stroke="black" fill="transparent"/>
        <polyline points="63 180,63 160,77 160,77 180" stroke="black" fill="transparent"/>
        <polyline points="63 200,63 220,77 220,77 200" stroke="black" fill="transparent"/>
        <line x1="63" x2="77" y1="82" y2="82" stroke="black" stroke-width="1"/>
        <circle cx="70" cy="83" r="1" stroke="black" fill="transparent" stroke-width="1"/>
        <line x1="63" x2="77" y1="85" y2="85" stroke="black" stroke-width="1"/>
        <line x1="63" x2="77" y1="90" y2="90" stroke="black" stroke-width="1"/>
        <circle cx="70" cy="91" r="1" stroke="black" fill="transparent" stroke-width="1"/>
    </svg> --> 
  </div>
</template>

<script>
    export default {
        name:'HomeSvg',
        data(){
            return{
                tempOne:{
                    value:'',
                    id:'EP01',
                },
            }
        },
        methods:{
            // 将id传给home组件
            sendId(id){
                this.$emit("getId",id)
                console.log("id传给了home")
            }
        },
        mounted(){
            // 这里取数据应该定时器调用接口，记得销毁定时器
            this.tempOne.value = 22.5
        }
    }
</script>

<style lang="less" scoped>
    .test{
        cursor: pointer;
        display: flex;
        top:2%;
        left: 14%;
    }
</style>