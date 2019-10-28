// pages/markPapers/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        options: {}, //路由接收参数
        arr: 15,
        distance: 0, //评分按钮可滑动距离
        scrollLeft: 0, //评分按钮条左边距离
        isScroll: false, //是否开始左右滑动
        beginX: 0,
        url: "../../../image/blank.png",
        scale: 1,
        canvasInfo: {
            w: 320,
            h: 0
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            options
        });
        // 动态设置当前页面的标题
        wx.setNavigationBarTitle({
            title: "批阅"
        });
        // 设置页面导航条颜色
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ebf0f5"
        });
        // wx.downloadFile({
        //     url: this.data.url,
        //     success(res) {
        //         console.log(res)
        //     }
        // })
        this.drawCanvasImg(this.data.url)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let w;
        const query = wx.createSelectorQuery();
        query.select("#score-scroll").boundingClientRect(res => {
            w = res.width;
        }).exec(() => {
            query.select("#score-scroll-wrap").boundingClientRect(res => {
                console.log(res)
                this.setData({
                    distance: w - res.width
                })
            }).exec()
        })
    },

    onScale(e) {
        this.setData({
            scale: e.detail.scale
        })
    },

    drawCanvasImg(url) {
        const vm = this;
        const ctx = wx.createCanvasContext("handle-write", this);
        wx.getImageInfo({
            src: url,
            success(res) {
                let scale = 320 / res.width;
                console.log(scale)
                let h = parseInt(res.height * 320 / res.width);
                vm.setData({
                    'canvasInfo.h': h
                })
                ctx.drawImage(url, 0, 0, 320, h);
                ctx.scale(13, 2)
                ctx.draw();
            }
        })
    },

    // touchStart(e) {
    //     e.preventDefault;
    //     this.setData({
    //         isScroll: this.data.distance < 0 ? true : false,
    //         beginX: e.touches[0].clientX
    //     })
    //     console.log(e)
    // },

    // touchMove(e) {
    //     e.preventDefault;
    //     if (!this.data.isScroll) return false;
    //     let end = e.touches[0].clientX;
    //     let scrollLeft = end - this.data.beginX + this.data.scrollLeft; //当前手指滑动距离
    //     let distance = this.data.distance; //可滚动距离
    //     // 滑动距离不能大于可滚动距离
    //     if (scrollLeft >= distance && scrollLeft < 0) {
    //         this.setData({
    //             beginX: end,
    //             scrollLeft: scrollLeft
    //         });
    //     }
    // },

    // touchEnd(e) {
    //     e.preventDefault;
    //     if (!this.data.isScroll) return false;
    //     this.setData({
    //         isScroll: false
    //     })
    // },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
})