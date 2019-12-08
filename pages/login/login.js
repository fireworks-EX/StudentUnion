//index.js
//获取应用实例

var app = getApp()
var timer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    uid: '',
    pwd: '',
    username: '',
    branch: '',
    classId: '',
    sex: '',
    phonenumber: '',
    email: '',
    rank: '',
    departments: '',
    appointmentTime: '',
  },


  onChangeid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ uid: event.detail })
  },

  onChangepwd(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ pwd: event.detail })
  },

  add(event){
    wx.redirectTo({
      url: '../user/add/adduser',
    })
  },

  reset(event) {
    wx.redirectTo({
      url: '../user/change/resetpwd',
    })
  },


  click(event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/user/login', //仅为示例，并非真实的接口地址
      data: {
        uid: that.data.uid,
        pwd: that.data.pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  
      },
      method: "POST", 
      success(res) {
        // console.log(res.data)
        if (res.data.msg==='success'){          
          app.appData.uid = res.data.dataObj.uid, 
          app.appData.username = res.data.dataObj.username,
          app.appData.branch = res.data.dataObj.branch,
          app.appData.classId = res.data.dataObj.classId,
          app.appData.sex = res.data.dataObj.sex,
          app.appData.phonenumber = res.data.dataObj.phonenumber,
          app.appData.email = res.data.dataObj.email,
          app.appData.rank = res.data.dataObj.rank,
          app.appData.depName = res.data.dataObj.departments,
          app.appData.appointmentTime = res.data.dataObj.appointmentTime

          if (res.data.dataObj.rank == 1) {
            app.appData.level = "游客"
          }
          else if (res.data.dataObj.rank == 2) {
            app.appData.level = "干事"
          }
          else if (res.data.dataObj.rank == 3) {
            app.appData.level = "部长"
          }
          else if (res.data.dataObj.rank == 4) {
            app.appData.level = "副主席"
          }
          else if (res.data.dataObj.rank == 5) {
            app.appData.level = "主席"
          }
          else if (res.data.dataObj.rank == 6) {
            app.appData.level = "指导老师"
          } 

          if (res.data.dataObj.rank == 1){
            wx.reLaunch({
              url: '../apply/apply',
            })
          }
          else{
            wx.reLaunch({
              url: '../index/index',
            })
          }

        }
        else{
          var message = res.data.msg
          if (!that.data.uid){
            message="用户名不能为空"
          }
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res){
        wx.showToast({
          title: '连接服务器失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.appData.timer = false
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})