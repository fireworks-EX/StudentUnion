var app = getApp()

function add0(m) { return m < 10 ? '0' + m : m }
function format(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    overtime: '',
    minDate: new Date().getTime(),
    maxDate: new Date(2030, 11, 31).getTime(),
    currentDate: new Date().getTime(),
    show: false,
  },

  over(event) {
    this.setData({ show: true });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },

  onConfirm(event) {
    this.setData({ overtime: format(event.detail), show: false });
  },

  onCancel() {
    this.setData({ show: false });
  },


  submit(event) {
    var rank = app.appData.rank
    console.log(this.data.overtime)
    if (rank >= 5) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/batch/addBatch', //仅为示例，并非真实的接口地址
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          endtime: that.data.overtime,
        },
        success(res) {
          // console.log(res.data)
          if (res.data.msg === 'success') {
            wx.showToast({
              title: "批次添加成功",
              icon: 'success',
              duration: 2000
            })
          }
          else {
            var message = res.data.msg
            wx.showToast({
              title: message,
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
      overtime: '',
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