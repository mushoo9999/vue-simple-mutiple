<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login.jpg") no-repeat;
    padding-bottom: 10%;
}

.wrapper > h1 {
    text-align: center;
    vertical-align: middle;
    margin-bottom: 20px;
    color: #000;
}

.login {
    padding: 50px;
    width: 500px;
    height: auto;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
}

.title {
    height: 60px;
    padding-bottom: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #d5d5d5
}

.mt15 {
    margin-top: 15px;
}

.bg_w {
    background-color: #fff;
}
</style>
<style>
.bg_w .ivu-input-icon-normal+.ivu-input {
    padding-right: 7px;
    padding-left: 32px;
}

.bg_w .ivu-input-icon {
    left: 0;
    right: auto;
    color: #eee;
}
</style>
<template>
    <div class="wrapper" style="display:flex;justify-content: center;align-items:center">
        <div class="login">
            <Row class="title" type="flex" justify="center" align="middle">
                <i-col span="4" style="height:100%"><img src="../../assets/img/logo.png" height="100%" /></i-col>
                <i-col span="20">
                    <p style="font-size:20px;color:#3b96e5;font-weight:bold">水利规划院动能经济一体化设计系统</p>
                </i-col>
            </Row>
            <i-form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <Input v-model="formInline.id" size="large" class="bg_w" icon="android-person" placeholder="请输入您的ID"></Input>
                </Form-item>
                <Form-item prop="password">
                    <Input v-model="formInline.passwd" @keyup.native.enter="handleSubmit('formInline')" type="password" size="large" class=" bg_w" icon="android-lock" placeholder="请输入您的密码"></Input>
                </Form-item>
                <Form-item class="mt15">
                    <Button type="success" @click.native="handleSubmit('formInline')" long style="background-color:#3b96e5;font-size:16px" size="large" icon="log-in">
                        进入系统</Button>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                formInline: {
                    id: '',
                    passwd: '',
                },
                ruleInline: {
                    id: [{
                        required: true,
                        message: '请填写您的ID',
                        trigger: 'blur'
                    }],
                    passwd: [{
                        required: true,
                        message: '请填写您密码',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 6,
                        message: '密码长度不能小于6位',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    this.$router.push('/program');
                    if (valid) {
                        this.$http.post("/user/login", this.formInline).then(
                            function(r) {
                                if (r.data.result == 0) {
                                    this.myData.inputBwUIList[0].hyScheme.autherName = r.data.data;
                                    this.myData.inputEcoUIList[0].hyScheme.autherName = r.data.data;
                                    this.myData.inputFdUIList[0].hyScheme.autherName = r.data.data;
                                    this.myData.inputRoUIList[0].hyScheme.autherName = r.data.data;
                                    this.$Message.success('登录成功!');
                                } else {
                                }
                            });
                    } else {
                        this.$Message.error('登录失败!');
                    }
                });
            }
        }
}
</script>
