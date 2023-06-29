<template>
<div class="login_container">
  <el-card class="card_container">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <h3 class="login_title" style="margin-bottom:20px">无缝线路伸缩调节器在线监测系统</h3>
        <!-- 用户名 -->
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" style="width: 100%;">
                <i slot="prefix" class="el-icon-user" style="margin-right:10px;"></i>
            </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" style="width: 100%;" show-password>
                <i slot="prefix" class="el-icon-lock" style="margin-right:10px;"></i>
            </el-input>
        </el-form-item>
        <!-- 验证 -->
        <el-form-item prop="checkInfo" class="check_container">
            <el-input v-model="loginForm.checkInfo" ref="checkInput" placeholder="请输入右侧验证值" style="width: 60%;"></el-input>
            <div class="codeCanvas" @click="refreshCode">
                <!-- 验证组件 -->
                <Sidentify :identifyCode="identifyCode"></Sidentify>
            </div>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
            <el-button @click="submit" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
    import mock from 'mockjs'
    import cookie from 'js-cookie'
    import {login} from '../api/login'
    import Sidentify from '../components/Sidentify.vue'
    export default {
        name:'Login',
        components:{Sidentify},
        data(){
            return{
                identifyCodes: "1234567890qwertyuioplkjhgfdsazxcvbnm",
                identifyCode: "",
                
                // 表单的信息
                loginForm:{
                    username:'',
                    password:'',
                    checkInfo:''
                },
                // 表单规则配置
                rules:{
                    username:[{required:true,message: '请填写用户名', trigger: 'blur'}],
                    password:[{required:true,message: '请输入密码', trigger: 'blur'}],
                    checkInfo:[{required:true,message: '请输入验证值', trigger: 'blur'}]
                }
            }
        },
        methods:{
            //验证码
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ]
                }
                console.log(this.identifyCode)
            },
            // 提交信息
            submit(){
                this.$refs.loginForm.validate((valid) => {
                    // 校验规则合法
                    if(valid){
                        // mock模拟生成token信息
                        const token =  mock.Random.guid()
                        // token信息储存在cookie中
                        cookie.set('token',token,{ expires: new Date(new Date() * 1 + 90 * 60 * 1000)})
                        cookie.set('username',this.loginForm.username)
                        this.$router.push('/home')
                        // login.checkUser(this.loginForm.username,this.loginForm.password).then((res)=>{
                        //     if(res.success){
                        //         // mock模拟生成token信息
                        //         const token =  mock.Random.guid()
                        //         // token信息储存在cookie中
                        //         cookie.set('token',token)
                        //         this.$router.push('/home')
                        //     }else{
                        //         this.$message({
                        //         type: 'error',
                        //         message: '用户名或密码错误!' 
                        //         })
                        //     }
                        // })
                    }
                })
            }
        },
        created(){
            //初始化验证码
            this.refreshCode();
        },
        mounted(){
            // this.getCode()
            // console.log(this.rCode())
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        }
    }
</script>

<style lang="less" scoped>
    body{
        margin: 0;
    }
    .login_container{
        width: 100%;
        height: 100vh;
        // 脱离文档流
        position: fixed;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover !important;
        background: url(~@/assets/images/钢轨.webp);
        .card_container{
            width: 400px;
            margin-left: 65%;
            margin-top: 7%;
            .check_container{
                position: relative;
            .codeCanvas{
                position: absolute;
                width: 40%;
                height: 50px;
                top: -1px;
                left: 220px;
            }
            }

        }
    }
</style>