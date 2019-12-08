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
    value: '',
    vacateperson: '',
    vacatereason: '',
    leavetime: '',
    backtime: '',
    persondepartment: '',
    // show: false,
    // columns: [],
    minDate1: new Date().getTime(),
    maxDate1: new Date(2030, 11, 31).getTime(),
    currentDate1: new Date().getTime(),
    show1: false,
    minDate2: new Date().getTime(),
    maxDate2: new Date(2030, 11, 31).getTime(),
    currentDate2: new Date().getTime(),
    show2: false,
  },

  // dep(event) {
  //   this.setData({ show: true });
  // },

  // onConfirm(event) {
  //   const { picker, value, index } = event.detail;
  //   this.setData({ persondepartment: value, show: false });
  // },

  // onCancel() {
  //   this.setData({ show: false });
  // },

  start(event) {
    this.setData({ show1: true });
  },

  onInput1(event) {
    this.setData({
      currentDate1: event.detail
    });
  },

  onConfirm1(event) {
    this.setData({ leavetime: format(event.detail), minDate2: event.detail, show1: false });
  },

  onCancel1() {
    this.setData({ show1: false });
  },

  over(event) {
    this.setData({ show2: true });
  },

  onInput2(event) {
    this.setData({
      currentDate2: event.detail
    });
  },

  onConfirm2(event) {
    this.setData({ backtime: format(event.detail), show2: false });
  },

  onCancel2() {
    this.setData({ show2: false });
  },

  onChangeper(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ vacateperson: event.detail })
  },

  onChangerea(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ vacatereason: event.detail })
  },

  onChangedep(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ persondepartment: event.detail })
  },

  submit(event) {
    var that = this
    wx.request({
      url: 'http://api.wangz.online/api/qingjia/addvacate', //仅为示例，并非真实的接口地址
      data: {
        vacateperson: that.data.vacateperson,
        vacatereason: that.data.vacatereason,
        leavetime: that.data.leavetime,
        backtime: that.data.backtime,
        persondepartment: that.data.persondepartment,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success(res) {
        // console.log(res.data)
        if (res.data.msg === 'success') {
          wx.showToast({
            title: "请假申请成功",
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
      // vacateperson: '',
      vacatereason: '',
      leavetime: '',
      backtime: '',
      persondepartment: '',
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
      vacateperson: app.appData.uid,
      persondepartment: app.appData.depName,
    })
    // var that = this
    // wx.request({
    //   url: 'http://api.wangz.online/api/depart/getdepList', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: "GET",
    //   success(res) {
    //     // console.log(res.data)
    //     if (res.data.msg === 'success') {
    //       wx.showToast({
    //         title: "连接服务器成功",
    //         icon: 'success',
    //         duration: 2000
    //       })
    //       let temp = [];
    //       res.data.dataObj.forEach(function (item, index) {
    //         temp.push(item.departmentname);
    //       })
    //       that.setData({
    //         columns: temp
    //       })
    //     }
    //     else {
    //       wx.showToast({
    //         title: res.data.msg,
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   },
    //   fail(res) {
    //     wx.showToast({
    //       title: '连接服务器失败',
    //       icon: 'loading',
    //       duration: 2000
    //     })
    //   }
    // })
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