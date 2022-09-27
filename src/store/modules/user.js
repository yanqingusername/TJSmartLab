import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken,setName,setPhone,getName,getPhone,setroleId,getroleId } from '@/utils/auth'
import { setRole } from '../../utils/auth'
import axios from "axios";
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {

     

      const username = userInfo.username.trim();
      const password = userInfo.password.trim();
      return new Promise((resolve, reject) => {

        axios({
          method: "get",
          //url: "http://localhost:8070/0823lislab_war_exploded/Digitallaboratorylogin/xlogin.hn",
          //url: "https://lisalarm.coyotebio-lab.com/lislab/Digitallaboratorylogin/xlogin.hn",
          //url: "https://tj.coyotebio-lab.com/lislab/Digitallaboratorylogin/xlogin.hn",
          url: "http://xmr.coyotebio-lab.com:8080/lislab/Digitallaboratorylogin/xlogin.hn",
          //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getBatchNamberSampleInfo.hn",
          params: {
            
            username: username,
            passWord: password,
            
          },
        })
        .then((response) => {
          setRole(response.data.roleId)  //将roleId存入cookie中
          setToken(response.data.token)
          setName(response.data.realName)
          //从cookie中获取token值
          commit('SET_TOKEN', response.data.token)
          commit('SET_NAME', response.data.realName)    

          commit('SET_AVATAR', response.data.avatar)
          setPhone(response.data.phone)
          //window.localStorage.setItem("userInfo", JSON.stringify(response.data));
          
          //this.$router.addRoutes(response.data.routes);
          resolve()
        })
        .catch((error) => {
          //请求失败
          reject(error)
          console.log(error);
        }); 


        // login(username, userInfo.password).then(response => {
        //   const data = response.data
        //   console.log('---->:',data)
        //   //alert(data.token+"-----")
        //   setRole(data.roleId)  //将roleId存入cookie中
        //   setToken(data.token)
        //   setName(data.realName)
        //   //从cookie中获取token值
        //   commit('SET_TOKEN', data.token)
        //   commit('SET_NAME', data.realName)   
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })


      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {

      const phone = getPhone();

      return new Promise((resolve, reject) => {
        console.log(getName())
        
        axios({
          method: "get",
          //url: "http://localhost:8070/0823lislab_war_exploded/Digitallaboratorylogin/getUserInfo.hn",
          //url: "https://lisalarm.coyotebio-lab.com/lislab/Digitallaboratorylogin/getUserInfo.hn",
          //url: "https://tj.coyotebio-lab.com/lislab/Digitallaboratorylogin/getUserInfo.hn",
          url: "http://xmr.coyotebio-lab.com:8080/lislab/Digitallaboratorylogin/getUserInfo.hn",
          //url: "https://scldev.coyotebio-lab.com:8443/lislab/sampleCenter/getBatchNamberSampleInfo.hn",
          params: {
            
            phone: phone,
            
          },
        })
        .then((response) => {
          
          const data = response.data

          if (data.roleId && data.roleId.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roleId)

          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.realName)
          commit('SET_AVATAR', data.avatar)
          
          setPhone(data.phone)
          console.log(data+"---------------------")
          resolve(data)

        })
        .catch((error) => {
          //请求失败
          reject(error)
          console.log(error);
        }); 


        // getInfo(getName()).then(response => {
        //   const data = response.data
        //   if (data.roleId && data.roleId.length > 0) { // 验证返回的roles是否是一个非空数组
        //     commit('SET_ROLES', data.roleId)
        //     //alert(data.roleId)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.realName)
        //   commit('SET_AVATAR', data.avatar)
          
        //   setPhone(data.phone)
        //   console.log(data+"---------------------")
        //   resolve(data)
        // }).catch(error => {
        //   reject(error)
        // })
        

      })
    },

    // 登出
    LogOut() {
      return new Promise((resolve, reject) => {
          removeToken()
          resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
