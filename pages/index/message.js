var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'message',
    notice: '',
    timer: ''
  },


  // event.detail 的值为当前选中项的索引
  onChange(event) {
    if (event.detail === 'manage'){
      wx.redirectTo({
        url: 'manage',
      })
    }
    else if (event.detail === 'user'){
      wx.redirectTo({
        url: 'index',
      })
    }
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
      notice: app.appData.notice
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