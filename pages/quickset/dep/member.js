var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    depId: '',
    depName: '',
    createtime: '',
    peoplenumber: '',
    introduction: '',
    ministerid: '',
    chairmanid: '',
    active:'message'
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
    var depId = app.appData.depId
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/depart/getDepBydepId', //仅为示例，并非真实的接口地址
      data: {
        depId: depId
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        that.setData({
          depId: res.data.dataObj.departmentid,
          depName: res.data.dataObj.departmentname,
          createtime: res.data.dataObj.createtime,
          peoplenumber: res.data.dataObj.peoplenumber,
          introduction: res.data.dataObj.introduction,
          ministerid: res.data.dataObj.ministerid,
          chairmanid: res.data.dataObj.chairmanid
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

    wx.request({
      url: 'http://api.wangz.online/api/depart/getdepMenberById', //仅为示例，并非真实的接口地址
      data: {
        depId: depId
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