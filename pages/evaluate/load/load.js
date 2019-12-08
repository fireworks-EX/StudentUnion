var app = getApp()
Page({

  /*
   页面的初始数据
  */
  data: {
    result: '',
  },

  click: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    app.appData.result = this.data.result[i]
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
    if (myrank >= 5) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/user/getallusr', //仅为示例，并非真实的接口地址
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success(res) {
          // console.log(res.data)
          let temp = [];
          res.data.dataObj.forEach(function (item, index) {
            if (item.rank < myrank) {
              temp.push(item);
            }
          })
          that.setData({
            result: temp
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
    else if (myrank == 4) {
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/depart/getdepMenberByfenguan', //仅为示例，并非真实的接口地址
        data: {
          chairId: app.appData.uid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success(res) {
          // console.log(res.data)
          let temp = [];
          res.data.dataObj.forEach(function (item, index) {
            item.forEach(function (items, indexs) {
              temp.push(items);
            })
          })
          // console.log(temp)
          that.setData({
            result: temp
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
    else if (myrank == 3) {
      this.setData({
        depName: app.appData.depName
      })
      var depId = app.appData.depId
      var that = this
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
          let temp = [];
          res.data.dataObj.forEach(function (item, index) {
            if (item.rank < myrank) {
              temp.push(item);
            }
          })
          that.setData({
            result: temp
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