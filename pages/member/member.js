var app = getApp()
Page({

  /*
   页面的初始数据
  */
  data: {
    result: '',
    depName: '',
    uid: '',
    username: '',
    branch: '',
    classId: '',
    sex: '',
    phonenumber: '',
    email: '',
    rank: '',
    level: '',
    departments: '',
    show: false,
    columns: ['干事', '部长', '副主席', '主席'],
  },

  onConfirm(event) {
    const { picker, value, index } = event.detail;
    var nowrank = this.data.rank
    // console.log(this.data.rank)
    if (value == "干事") {
      nowrank = 2
    }
    else if (value == "部长") {
      nowrank = 3
    }
    else if (value == "副主席") {
      nowrank = 4
    }
    else if (value == "主席") {
      nowrank = 5
    }
    // console.log(nowrank)
    if(app.appData.uid == this.data.uid){
      wx.showToast({
        title: "不可修改自身职位",
        icon: 'none',
        duration: 2000
      })
    }
    else{
      if (nowrank >= this.data.level) {
        wx.showToast({
          title: "修改职位必须低于自身职位",
          icon: 'none',
          duration: 2000
        })
      }
      else {
        if (this.data.email == null) {
          this.setData({ email: '' });
        }
        var that = this
        wx.request({
          url: 'http://api.wangz.online/api/user/userinfoedit', //仅为示例，并非真实的接口地址
          data: {
            uid: that.data.uid,
            username: that.data.username,
            branch: that.data.branch,
            classId: that.data.classId,
            sex: that.data.sex,
            phonenumber: that.data.phonenumber,
            email: that.data.email,
            rank: nowrank,
            departments: that.data.departments,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success(res) {
            // console.log(res.data)
            if (res.data.msg === 'success') {
              wx.showToast({
                title: "修改成功",
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
      }
      this.setData({ rank: nowrank, show: false });
      this.onShow()
    }

  },

  onCancel() {
    this.setData({ show: false });
  },

  change: function (event) {
    this.setData({ show: true });
  },

  del: function (event) {
    if (this.data.level <= this.data.rank || this.data.level <3) {
      wx.showToast({
        title: "无操作权限",
        icon: 'none',
        duration: 2000
      })
    }
    else{
      var uid = this.data.uid
      var that = this
      wx.request({
        url: 'http://api.wangz.online/api/user/softdeleteuser', //仅为示例，并非真实的接口地址
        data: {
          userId: uid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success(res) {
          // console.log(res.data)
          if (res.data.msg === 'success') {
            wx.showToast({
              title: "删除成功",
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
    }
  },

  click: function (event) {
    // console.log(event.currentTarget.id)
    var i = event.currentTarget.id
    this.setData({
      uid: this.data.result[i].uid,
      username: this.data.result[i].username,
      branch: this.data.result[i].branch,
      classId: this.data.result[i].classId,
      sex: this.data.result[i].sex,
      phonenumber: this.data.result[i].phonenumber,
      email: this.data.result[i].email,
      rank: this.data.result[i].rank,
      departments: this.data.result[i].departments
    })
  },

  // event.detail 的值为当前选中项的索引
  submit(event) {
    if (this.data.level >= 3) {
      wx.navigateTo({
        url: '../user/add/addruser',
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
      level: app.appData.rank
    })
    var myrank = app.appData.rank
    // console.log(myrank)
    if (myrank >= 5){
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
            if (item.uid!=1){
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
            item.forEach(function (items, indexs){
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
    else {
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
          that.setData({
            result: res.data.dataObj
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