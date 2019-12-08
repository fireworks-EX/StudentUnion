var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    depId: '',
    departmentname: '',
    ministerid: '',
    chairmanid: '',
    peoplenumber: '',
    introduction: '',
    createtime: '',
    deletetime: ''
  },

  onChangedepid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ depId: event.detail })
  },

  onChangedep(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ departmentname: event.detail })
  },

  onChangemin(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ ministerid: event.detail })
  },

  onChangecha(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ chairmanid: event.detail })
  },

  onChangenum(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ peoplenumber: event.detail })
  },

  onChangeintro(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ introduction: event.detail })
  },

  submit(event) {
    var rank = app.appData.rank
    if (rank >= 4) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/depart/departinfoedit', //仅为示例，并非真实的接口地址
        data: {
          depId: that.data.depId,
          departmentname: that.data.departmentname,
          ministerid: that.data.ministerid,
          chairmanid: that.data.chairmanid,
          peoplenumber: that.data.peoplenumber,
          introduction: that.data.introduction,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success(res) {
          // console.log(res.data)
          if (res.data.msg === 'success') {
            app.appData.depinfo = {
              depId: res.data.dataObj.departmentid,
              departmentname: res.data.dataObj.departmentname,
              ministerid: res.data.dataObj.ministerid,
              chairmanid: res.data.dataObj.chairmanid,
              peoplenumber: res.data.dataObj.peoplenumber,
              introduction: res.data.dataObj.introduction,
              createtime: res.data.dataObj.createtime,
              deletetime: res.data.dataObj.deletetime,
            },
              wx.showToast({
                title: "部门信息修改成功",
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
      departmentname: '',
      ministerid: '',
      chairmanid: '',
      peoplenumber: '',
      introduction: '',
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