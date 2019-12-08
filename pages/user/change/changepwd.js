var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    uid: '',
    pwd1: '',
    pwd2: '',
  },

  onChangeid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ uid: event.detail })
  },

  onChangepwd1(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ pwd1: event.detail })
  },

  onChangepwd2(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ pwd2: event.detail })
  },


  submit(event) {
    var that = this

    wx.request({
      url: 'http://api.wangz.online/api/user/userSecedit', //仅为示例，并非真实的接口地址
      data: {
        uid: that.data.uid,
        newpwd: that.data.pwd2,
        oldpwd: that.data.pwd1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === '密码修改成功') {
          app.appData.userinfo = {
            uid: that.data.uid,
            pwd: that.data.pwd2,
          }
          wx.showToast({
            title: "修改成功",
            icon: 'success',
            duration: 2000
          })

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

  reset(event) {
    this.setData({
      // uid: app.appData.uid,
      pwd1: '',
      pwd2: '',
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
    this.setData({
      uid: app.appData.uid,
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