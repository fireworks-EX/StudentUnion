import Toast from '../../dist/toast/toast';

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    depuid: '',
    informerid: '',
    informtype: 1,
    noticetype: 1
  },

  onChangeid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ uid: event.detail })
  },

  onChangedepuid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ depuid: event.detail })
  },

  onChangeinformerid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ informerid: event.detail })
  },

  submit(event) {
    var rank = app.appData.rank
    if (rank >= 3) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/notice/postnoticeZidingyi',
        data: {
          userid: that.data.userid,
          depuid: that.data.depuid,
          informerid: that.data.informerid,
          informtype: that.data.informtype,
          noticetype: that.data.noticetype
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success(res) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
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
    }
    else {
      wx.showToast({
        title: "无操作权限",
        icon: 'none',
        duration: 2000
      })
    }

  },

  reset(event) {
    this.setData({
      depuid: '',
      informerid: '',
      informtype: 1,
      noticetype: 1
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
    userid: app.appData.uid
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