import request from '@/utils/request'

export default {
  //获取所有采样点
  getChannelNameList() {
    return request ({
        url: `http://localhost:8070/lis_appointment_war_exploded/admin/channel/getChannelNameList.hn`,
        method: 'get'
        })
    },
  //获取所有城市
    getAllCity() {
    return request ({
        url: `/admin/common/getAllCity`,
        method: 'post'
        })
    },
  //获取所有区域
  getAllArea() {
    return request ({
      url: `/admin/common/getAllArea`,
      method: 'get'
    })
  },
   //获取所有采样点
   getAllChannel(samplingLeader) {
    return request ({
      url: `/admin/common/getAllChannel/${samplingLeader}`,
      method: 'post',
      
    })
  },
  getPhone(samplingLeader){
    return request ({
      url: `/admin/common/getPhone`,
      method: 'get',
      params: {
        samplingLeader
      }
      })
  },
  //获取所有实验室
    getAllLab(name) {
    return request ({
        url: `/admin/common/getAllLab/${name}`,
        method: 'get'
        })
    },
    //获取所有负责人姓名
    getAllLeader() {
      return request ({
          url: `/admin/common/getAllLeader`,
          method: 'get'
          })
      },
       //获取所有检测类型
    getAllpaytype() {
      return request ({
          url: `/admin/common/getAllPaytype`,
          method: 'get'
          })
      },
       //获取所有支付渠道
    getAllsource() {
      return request ({
          url: `/admin/common/getAllSource`,
          method: 'get'
          })
      },
  
}
