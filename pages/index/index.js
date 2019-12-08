var app = getApp()
var timer;
function Countdown() {
  // var that = this;
  timer = setTimeout(function () {
    wx.request({
      url: 'http://api.wangz.online/api/notice/getnoticeByuid', //仅为示例，并非真实的接口地址
      data: {
        uid: app.appData.uid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          let temp = ''
          res.data.dataObj.forEach(function (item, index) {
            temp = item.starttime
          })
          // console.log(temp)
          // console.log(wx.getStorageSync('key'))
          if (wx.getStorageSync('key') != null) {
            if (wx.getStorageSync('key') != temp) {
              wx.setStorageSync('key', temp)
              app.appData.notice = true
            }
          }
          else {
            wx.setStorageSync('key', temp)
          }
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '连接服务器失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
    // that.setData({
    //   notice: app.appData.notice
    // })
    console.log(app.appData.notice)
    console.log(wx.getStorageSync('key'))
    if(app.appData.timer){
      Countdown();
    }
  }, 5000);
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: '',
    username: '',
    branch: '',
    classId: '',
    sex: '',
    phonenumber: '',
    email: '',
    rank: '',
    departments: '',
    appointmentTime: '',
    src: '',
    level: '',
    active:'user',
    notice: ''
  },




  // event.detail 的值为当前选中项的索引
  onChange(event) {
    if (event.detail === 'manage'){
      wx.redirectTo({
        url: 'manage',
      })
    }
    else if (event.detail === 'message'){
      wx.redirectTo({
        url: 'message',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.appData.timer = true
    Countdown();
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
    this.setData({
      uid: app.appData.uid,
      username: app.appData.username,
      branch: app.appData.branch,
      classId: app.appData.classId,
      sex: app.appData.sex,
      phonenumber: app.appData.phonenumber,
      email: app.appData.email,
      rank: app.appData.rank,
      level: app.appData.level,
      departments: app.appData.depName,
      appointmentTime: app.appData.appointmentTime,
      notice: app.appData.notice
    })

    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/depart/searchBydepName', //仅为示例，并非真实的接口地址
      data: {
        depName: that.data.departments
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        if (res.data.msg === 'success') {

          app.appData.depId = res.data.dataObj[0].departmentid
        }
        else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '连接服务器失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
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