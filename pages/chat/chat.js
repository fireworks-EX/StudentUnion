var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: ''
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
    app.appData.notice = false
    var that = this
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
        wx.request({
          url: 'http://api.wangz.online/api/activity/getActList', //仅为示例，并非真实的接口地址
          data: {},
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success(ress) {
            // console.log(res.data)
            if (ress.data.msg === 'success') {
              let temp = [];
              let flag = true
              res.data.dataObj.forEach(function (item, index) {
                flag = true
                ress.data.dataObj.forEach(function (items, indexs){
                  if (item.informerid == items.activityid){
                    temp.push(items)
                    flag = false
                  }
                })
                if (flag) {
                  temp.push(item)
                }
              })
              that.setData({
                result: temp
              })
              console.log(temp)
            }
            else {
              wx.showToast({
                title: ress.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail(ress) {
            wx.showToast({
              title: '连接服务器失败',
              icon: 'loading',
              duration: 2000
            })
          }
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