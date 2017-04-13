(function() {
    let lazy = {};
    let scrollT = 0;
    let windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    lazy.install = function(Vue, options) {
        let lazyArr = [];
        Vue.directive('lazy', {
            bind(el, binding) {
                Vue.nextTick(function() {
                    lazyArr.push({
                        el: el,
                        height: getY(el),
                        src: binding.value,
                        show: false
                    });
                    showImg();
                });
            }
        })

        //显示图片
        function showImg() {
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollT = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollT = document.body.scrollTop;
            }
            let showHeight = scrollT + windowH;
            lazyArr.forEach((value, index) => {
                if (showHeight > value['height'] && !value['show']) {
                    value['el'].src = value.src;
                    value['show'] = true;
                }
            })
        }
        
        //绑定window滚动事件
        window.onscroll = showImg;
    }

    //获取相对文档高度
    function getY(elem) {
        var y = elem.offsetTop;
        while (elem = elem.offsetParent) {
            y += elem.offsetTop;
        }
        return y;
    }
    module.exports = lazy;
})()
