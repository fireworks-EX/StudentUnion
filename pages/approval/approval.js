var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: '',
    result: '',
    apply: '',
    uid: '',
    actid: '',
    vacateid: '',
    applydepid: '',
    judgeid: '',
    isjudge: ''
  },

  clickact: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    this.setData({
      actid: this.data.act[i].activityid,
      judgeid: this.data.act[i].judgeid
    })
  },

  clickoff: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    this.setData({
      vacateid: this.data.result[i].vacateid,
      judgeid: this.data.result[i].judgeid
    })
  },

  clickapp: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    this.setData({
      uid: this.data.apply[i].uid,
      applydepid: this.data.apply[i].applydepid
    })
  },

  passact: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/activity/judgeAct', //仅为示例，并非真实的接口地址
      data: {
        actid: that.data.actid,
        judgeid: that.data.judgeid,
        isjudge: 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "活动审批成功",
            icon: 'success',
            duration: 2000
          })
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
    this.onShow()
  },

  passoff: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/qingjia/judgeQing', //仅为示例，并非真实的接口地址
      data: {
        vacateid: that.data.vacateid,
        judgeid: that.data.judgeid,
        isjudge: 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "请假审批成功",
            icon: 'success',
            duration: 2000
          })
        }
        else {
          wx.showToast({
            title: "请假审批成功",
            icon: 'success',
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
    this.onShow()
  },

  passapp: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/applydep/changeapplyflag', //仅为示例，并非真实的接口地址
      data: {
        key: that.data.applydepid,
        flag: 2
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.request({
            url: 'http://api.wangz.online/api/user/getusrinfobyId', //仅为示例，并非真实的接口地址
            data: {
              userId: that.data.uid
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success(ress) {
              wx.request({
                url: 'http://api.wangz.online/api/user/userinfoedit', //仅为示例，并非真实的接口地址
                data: {
                  uid: ress.data.dataObj.uid,
                  username: ress.data.dataObj.username,
                  branch: ress.data.dataObj.branch,
                  classId: ress.data.dataObj.classId,
                  sex: ress.data.dataObj.sex,
                  phonenumber: ress.data.dataObj.phonenumber,
                  email: ress.data.dataObj.email,
                  rank: 2,
                  departments: ress.data.dataObj.departments,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success(resss) {
                  // console.log(resss.data)
                  if (resss.data.msg === 'success') {
                    wx.showToast({
                      title: "申请已通过",
                      icon: 'success',
                      duration: 2000
                    })
                  }
                  else {
                    wx.showToast({
                      title: resss.data.msg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
                },
                fail(resss) {
                  wx.showToast({
                    title: '连接服务器失败',
                    icon: 'loading',
                    duration: 2000
                  })
                }
              })
            },
            fail(ress) {
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
    this.onShow()
  },


  rejectact: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/activity/judgeAct', //仅为示例，并非真实的接口地址
      data: {
        actid: that.data.actid,
        judgeid: that.data.judgeid,
        isjudge: 0
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "活动驳回成功",
            icon: 'success',
            duration: 2000
          })
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
    this.onShow()
  },

  rejectoff: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/qingjia/judgeQing', //仅为示例，并非真实的接口地址
      data: {
        vacateid: that.data.vacateid,
        judgeid: that.data.judgeid,
        isjudge: 0
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "请假驳回成功",
            icon: 'success',
            duration: 2000
          })
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
    this.onShow()
  },

  rejectapp: function (event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/applydep/changeapplyflag', //仅为示例，并非真实的接口地址
      data: {
        key: that.data.applydepid,
        flag: 1
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "申请驳回成功",
            icon: 'success',
            duration: 2000
          })
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
    this.onShow()
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
    var acttemp = []
    var actinfo = []
    var that = this
    if (rank >= 3) {
      if (rank == 3) {
        var ministerId = app.appData.uid
        wx.request({
          url: 'http://api.wangz.online/api/qingjia/getdepMenberQingByministerxId', //仅为示例，并非真实的接口地址
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
                if (item.isjudge == null) {
                  temp.push(item.judgeid);
                }
              })
              // console.log(temp)
              let len = temp.length
              for (let i = 0; i < len; i++) {
                let judgeId = temp[i]
                console.log(judgeId)
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
        var depId = app.appData.depId
        wx.request({
          url: 'http://api.wangz.online/api/applydep/getapplydepBydepid', //仅为示例，并非真实的接口地址
          data: {
            depId: depId
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success(res) {
            // console.log(res.data)
            if (res.data.msg === 'success') {
              res.data.dataObj.forEach(function (item, index) {
                if (item.flag == 0) {
                  temp.push(item);
                }
              })
              // console.log(temp)
              that.setData({
                apply: temp
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
        wx.request({
          url: 'http://api.wangz.online/api/activity/getActJudgeList', //仅为示例，并非真实的接口地址
          data: {
            page: 1,
            limit: 1000
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success(res) {
            // console.log(res.data)
            if (res.data.msg === 'success') {
              res.data.dataObj.list.forEach(function (item, index) {
                if (item.isjudge == null) {
                  acttemp.push(item.judgeid);
                }
              })
              // console.log(acttemp)
              let len = acttemp.length
              for (let i = 0; i < len; i++) {
                let judgeId = acttemp[i]
                // console.log(judgeId)
                wx.request({
                  url: 'http://api.wangz.online/api/activity/getactByjudgeId', //仅为示例，并非真实的接口地址
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
                      actinfo.push(res.data.dataObj)
                      // console.log(actinfo)
                      if (i == len - 1) {
                        that.setData({
                          act: actinfo
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
        if (rank == 4) {
          var url = 'http://api.wangz.online/api/qingjia/getministMenberQingByfenguanchairId'
        }
        else {
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
                if (item.isjudge == null){
                  temp.push(item.judgeid);
                }
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