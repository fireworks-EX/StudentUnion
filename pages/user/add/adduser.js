import Toast from '../../../dist/toast/toast';

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason: '',
    uid: '',
    pwd1: '',
    pwd2: '',
    username: '',
    branch: '',
    classId: '',
    sex: '',
    phonenumber: '',
    email: '',
    rank: 1,
    departments: '',
    appointmentTime: '',
    leavetime: '',
    show1: false,
    columns1: ['计算分院', '信电分院', '商学院', '医学院', '法学院'],
    show2: false,
    columns2: [],
    check1: false,
    check2: false
  },

  bra(event){
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

  onChangepwd1(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ pwd1: event.detail })
  },

  onChangepwd2(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ pwd2: event.detail })
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
    this.setData({ sex:  sex })
    if(sex == '男'){
      this.setData({ check1: true, check2: false })
    }else{
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

  onChangerea(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({ reason: event.detail })
  },

  submit(event) {
    var that = this
    if (that.data.pwd1 == that.data.pwd2){
      wx.request({
        url: 'http://api.wangz.online/api/user/register', //仅为示例，并非真实的接口地址
        data: {
          uid: that.data.uid,
          pwd: that.data.pwd1,
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

            app.appData.uid = that.data.uid,
            app.appData.username = that.data.username,
            app.appData.branch = that.data.branch,
            app.appData.classId = that.data.classId,
            app.appData.sex = that.data.sex,
            app.appData.phonenumber = that.data.phonenumber,
            app.appData.email = that.data.email,
            app.appData.rank = that.data.rank,
            app.appData.depName = that.data.departments
            app.appData.reason = that.data.reason
            
            if (that.data.rank == 1) {
              app.appData.level = "游客"
            }
            else if (that.data.rank == 2) {
              app.appData.level = "干事"
            }
            else if (that.data.rank == 3) {
              app.appData.level = "部长"
            }
            else if (that.data.rank == 4) {
              app.appData.level = "副主席"
            }
            else if (that.data.rank == 5) {
              app.appData.level = "主席"
            }
            else if (that.data.rank == 6) {
              app.appData.level = "指导老师"
            } 


            wx.reLaunch({
              url: '../../apply/apply',
            })
          }
          else {
            var message = res.data.msg
            if (!that.data.uid) {
              message = "用户名不能为空"
            }
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
    }else{
      wx.showToast({
        title: '两次输入密码不同',
        icon: 'none',
        duration: 2000
      })
    }
  },

  reset(event) {
    this.setData({
      reason: '',
      uid: '',
      pwd1: '',
      pwd2: '',
      username: '',
      branch: '',
      classId: '',
      sex: '',
      phonenumber: '',
      email: '',
      rank: 1,
      departments: '',
      check:''
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