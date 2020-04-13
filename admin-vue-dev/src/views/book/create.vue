<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        default-active="1-3"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        mode="vertical"
        :unique-opened="false"
        :collapse="isCollapse"
        :collapse-transition="false"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">
              <i class="el-icon-location" />分组一
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu" />
            <span slot="title">导航二</span>
          </template>
          <el-menu-item index="2-1">选项2-1</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document" />
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting" />
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col>
      <el-button @click="isCollapse = !isCollapse">折叠</el-button>
    </el-col>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    // const url = "https://test.youbaobao.xyz:18081/book/home/v2";
    // axios.get(url, {
    //   params: {openId: 1234},
    //   headers:{token:'abcd'}
    //   })
    //   .then(response => {
    //     console.log(response);
    //   }).catch(err=>{
    //     console.log(err)
    //   });

    // const url = "/book/home/v2";
    // const request = axios.create({
    //   baseURL: "https://test.youbaobao.xyz:18081",
    //   timeout: 5000
    // });
    // request({
    //   url,
    //   methods: "get",
    //   params: {
    //     openId: 1234
    //   },
    //   headers:{token:'1232132132132132'}
    // }).then(response => {
    //   console.log(response);
    // });

    const WhiteUrl = ['/login', '']
    const url = '/book/home/v2'
    const request = axios.create({
      baseURL: 'https://test.youbaobao.xyz:18081',
      timeout: 5000
    })
    request.interceptors.request.use(
      config => {
        const url = config.url.replace(config.baseURL, '')
        if (WhiteUrl.some(wl => url === wl)) {
          return config
        } else {
          // throw new Error('aaa')
          config.headers['token'] = '123321123321'
          return config
        }
      },
      error => {
        Promise.reject(err)
      }
    )

    request.interceptors.response.use(
      response => {
        const res = response.data
        if (res.error_code === 0) {
          return res
        } else {
          Promise.reject(res.msg)
        }
      },
      err => {
        Promise.reject(err)
      }
    )

    request({
      url,
      methods: 'get',
      params: {
        openId: 1234
      },
      headers: { token: 'aaaaaaaaaaaaaaaaaaa' }
    })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('handleClose', key, keyPath)
    }
  }
}
</script>
