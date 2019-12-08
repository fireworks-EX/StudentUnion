var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    batchid:'',
    result: ''
  },

  click: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    app.appData.batchid = this.data.result.dataObj[i].batchid
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
    var myrank = app.appData.rank
    // console.log(myrank)
    if (myrank >= 3) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/batch/getAllBatch', //仅为示例，并非真实的接口地址
        data: {
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success(res) {
          // console.log(res.data)
          that.setData({
            result: res.data
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
        title: "权限不足，无法查看",
        icon: 'none',
        duration: 2000
      })
    }
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