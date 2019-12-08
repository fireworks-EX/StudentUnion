var app = getApp()
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
    departments: '',
    appointmentTime: '',
    level: '',
    // value: 0,
    value1: 0,
    value2: 0,
  },

  // onChange(event) {
  //   this.setData({
  //     value: event.detail
  //   });
  // },

  onChange1(event) {
    this.setData({
      value1: event.detail
    });
    // console.log(event.detail)
  },

  onChange2(event) {
    this.setData({
      value2: event.detail
    });
    // console.log(event.detail)
  },

  submit(event) {
    var score = ((this.data.value1 + this.data.value2)*10)
    // console.log(score)
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/judgestu/addBatch', //仅为示例，并非真实的接口地址
      data: {
        batchid: app.appData.batchid,
        uid: app.appData.result.uid,
        score: score,
        judgeuid: app.appData.uid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "评分成功",
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
  },

  reset(event) {
    this.setData({
      value: 0,
      value1: 0,
      value2: 0,
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
    var uid = app.appData.result.uid
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/user/getusrinfobyId', //仅为示例，并非真实的接口地址
      data: {
        userId: uid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        var lv = ''
        if (res.data.dataObj.rank == 2) {
          lv = "干事"
        }
        else if (res.data.dataObj.rank == 3) {
          lv = "部长"
        }
        else if (res.data.dataObj.rank == 4) {
          lv = "副主席"
        }
        else if (res.data.dataObj.rank == 5) {
          lv = "主席"
        }
        else if (res.data.dataObj.rank == 6) {
          lv = "指导老师"
        } 
        that.setData({
          uid: res.data.dataObj.uid,
          username: res.data.dataObj.username,
          branch: res.data.dataObj.branch,
          classId: res.data.dataObj.classId,
          sex: res.data.dataObj.sex,
          phonenumber: res.data.dataObj.phonenumber,
          email: res.data.dataObj.email,
          level: lv,
          departments: res.data.dataObj.departments,
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