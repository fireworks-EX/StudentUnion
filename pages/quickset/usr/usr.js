var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    score: '',
    level: ''
  },

  changepwd(event) {
    wx.navigateTo({
      url: '../../user/change/changepwd',
    })
  },

  changeinfo(event) {
    wx.navigateTo({
      url: '../../user/change/changeinfo',
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
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/judgestu/getBatchScoreByuid', //仅为示例，并非真实的接口地址
      data: {
        uid: app.appData.uid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        res.data.dataObj.forEach(function (item, index) {
          app.appData.score = item.score
        })
        that.setData({
          score: app.appData.score
        }) 
      },
      fail(res) {
        wx.showToast({
          title: '连接服务器失败',
          icon: 'loading',
          duration: 2000
        })
      }
    })
    that.setData({
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