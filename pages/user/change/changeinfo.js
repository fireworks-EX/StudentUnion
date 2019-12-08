var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    uid: '',
    username: '',
    branch: '',
    classId: '',
    sex: '',
    phonenumber: '',
    email: '',
    rank: '',
    departments: '',
    show1: false,
    columns1: ['计算分院', '信电分院', '商学院', '医学院', '法学院'],
    show2: false,
    columns2: [],
    check1: false,
    check2: false
  },

  bra(event) {
    this.setData({ show1: true });
  },

  onConfirm1(event) {
    const { picker, value, index } = event.detail;
    this.setData({ branch: value, show1: false });
  },

  onCancel1() {
    this.setData({ show1: false });
  },

  dep(event) {
    this.setData({ show2: true });
  },

  onConfirm2(event) {
    const { picker, value, index } = event.detail;
    this.setData({ departments: value, show2: false });
  },

  onCancel2() {
    this.setData({ show2: false });
  },

  onChangeid(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ uid: event.detail })
  },

  onChangename(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ username: event.detail })
  },

  onChangebranch(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ branch: event.detail })
  },

  onChangeclassId(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ classId: event.detail })
  },

  onChangesex(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    var sex = event.detail.value
    this.setData({ sex: sex })
    if (sex == '男') {
      this.setData({ check1: true, check2: false })
    } else {
      this.setData({ check2: true, check1: false })
    }
  },

  onChangephone(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ phonenumber: event.detail })
  },

  onChangeemail(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ email: event.detail })
  },

  onChangedep(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ departments: event.detail })
  },

  // onChangerank(event) {
  //   // event.detail 为当前输入的值
  //   // console.log(event.detail);
  //   this.setData({ rank: event.detail })
  // },

  submit(event) {
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
        rank: that.data.rank,
        departments: that.data.departments,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          app.appData.uid = res.data.dataObj.uid,
          app.appData.username = res.data.dataObj.username,
          app.appData.branch = res.data.dataObj.branch,
          app.appData.classId = res.data.dataObj.classId,
          app.appData.sex = res.data.dataObj.sex,
          app.appData.phonenumber = res.data.dataObj.phonenumber,
          app.appData.email = res.data.dataObj.email,
          app.appData.rank = res.data.dataObj.rank,
          app.appData.depName = res.data.dataObj.departments,

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
  },

  reset(event) {
    this.setData({
      username: '',
      branch: '',
      classId: '',
      sex: '',
      phonenumber: '',
      email: '',
      rank: '',
      departments: '',
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
    this.setData({
      uid: app.appData.uid,
      username: app.appData.username,
      branch: app.appData.branch,
      classId: app.appData.classId,
      sex: app.appData.sex,
      phonenumber: app.appData.phonenumber,
      email: app.appData.email,
      rank: app.appData.rank,
      departments: app.appData.depName,
    })
    if (this.data.sex == '男') {
      this.setData({ check1: true, check2: false })
    } else {
      this.setData({ check2: true, check1: false })
    }
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/depart/getdepList', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "连接服务器成功",
            icon: 'success',
            duration: 2000
          })
          let temp = [];
          res.data.dataObj.forEach(function (item, index) {
            if (item.deletetime == null && item.departmentname != '主席团') {
              temp.push(item.departmentname);
            }
          })
          that.setData({
            columns2: temp
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