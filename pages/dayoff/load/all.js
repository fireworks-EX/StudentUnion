var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    activeName: '1'
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
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
    var rank = app.appData.rank
    var temp = []
    var info = []
    var that = this
    if (rank >= 3) {
      if (rank == 3) {
        var ministerId = app.appData.uid
        wx.request({
          url: 'http://api.wangz.online/api/qingjia/getdepMenberQingByministerId', //仅为示例，并非真实的接口地址
          data: {
            ministerId: ministerId
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success(res) {
            // console.log(res.data)
            if (res.data.msg === 'success') {
              res.data.dataObj.forEach(function (item, index) {
                temp.push(item.judgeid);
              })
              // console.log(temp)
              let len = temp.length
              for (let i = 0; i < len; i++) {
                let judgeId = temp[i]
                // console.log(judgeId)
                wx.request({
                  url: 'http://api.wangz.online/api/qingjia/getQingByjudgeId', //仅为示例，并非真实的接口地址
                  data: {
                    judgeId: judgeId,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success(res) {
                    // console.log(res.data)
                    if (res.data.msg === 'success') {
                      info.push(res.data.dataObj)
                      // console.log(info)
                      if (i == len - 1) {
                        that.setData({
                          result: info
                        })
                      }
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
              }
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
      }
      else {
        if (rank == 4){
          var url = 'http://api.wangz.online/api/qingjia/getministMenberQingBychairId'
        }
        else{
          var url = 'http://api.wangz.online/api/qingjia/getfuchairMenberQingByzhengchairId'
        }
        var chairId = app.appData.uid
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          data: {
            chairId: chairId
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success(res) {
            // console.log(res.data)
            if (res.data.msg === 'success') {
              res.data.dataObj.forEach(function (item, index) {
                temp.push(item.judgeid);
              })
              // console.log(temp)
              let len = temp.length
              for (let i = 0; i < len; i++) {
                let judgeId = temp[i]
                // console.log(judgeId)
                wx.request({
                  url: 'http://api.wangz.online/api/qingjia/getQingByjudgeId', //仅为示例，并非真实的接口地址
                  data: {
                    judgeId: judgeId,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success(res) {
                    // console.log(res.data)
                    if (res.data.msg === 'success') {
                      info.push(res.data.dataObj)
                      // console.log(info)
                      if (i == len - 1) {
                        that.setData({
                          result: info
                        })
                      }
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
              }
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
      }
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