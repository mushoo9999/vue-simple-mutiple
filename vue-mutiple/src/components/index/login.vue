<style>
@import '../../assets/scss/index.scss';
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
                <a href="../../pages/sotho/index.html">点我点我</a>
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
                    } else {
                        this.$Message.error('登录失败!');
                    }
                });
            }
        }
}
</script>
