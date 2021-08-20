!function (win, lib) {
    function refreshRem() {
        var rem = docEl.getBoundingClientRect().width / 10;
        docEl.style.fontSize = rem + "px";
        flexible.rem = win.rem = rem;
    }

    var tid, doc = win.document, docEl = doc.documentElement, metaEl = doc.querySelector('meta[name="viewport"]'),
        flexibleEl = doc.querySelector('meta[name="flexible"]'), flexibleElX5 = doc.querySelector('meta[name="flexible-in-x5"]'), hasX5centent = true,
        dpr = 0, scale = 0, flexible = lib.flexible || (lib.flexible = {});
    if (metaEl) {
        console.warn("将根据已有的meta标签来设置缩放比例");
        var match = metaEl.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        match && (scale = parseFloat(match[1]), dpr = parseInt(1 / scale))
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute("content");
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/), maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            initialDpr && (dpr = parseFloat(initialDpr[1]), scale = parseFloat((1 / dpr).toFixed(2)))
            maximumDpr && (dpr = parseFloat(maximumDpr[1]), scale = parseFloat((1 / dpr).toFixed(2)))
        }
    }
    if (flexibleElX5 && (hasX5centent = "false" !== flexibleElX5.getAttribute("content")), !dpr && !scale) {
        var isAndroid = (win.navigator.appVersion.match(/android/gi), win.chrome),
            isIPhone = win.navigator.appVersion.match(/iphone/gi), DPR = win.devicePixelRatio,
            isTBS = /TBS\/\d+/.test(win.navigator.userAgent), inFlexibleList = false;
        try {
            inFlexibleList = "true" === localStorage.getItem("IN_FLEXIBLE_WHITE_LIST")
        } catch (e) {
            inFlexibleList = false
        }
        scale = 1 / (dpr = isIPhone || isAndroid || isTBS && hasX5centent && inFlexibleList ? DPR >= 3 && (!dpr || dpr >= 3) ? 3 : DPR >= 2 && (!dpr || dpr >= 2) ? 2 : 1 : 1)
    }
    if (docEl.setAttribute("data-dpr", dpr), !metaEl)
        if ((metaEl = doc.createElement("meta")).setAttribute("name", "viewport"),
        metaEl.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no"), docEl.firstElementChild)
            docEl.firstElementChild.appendChild(metaEl);
    else {
        var wrap = doc.createElement("div");
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
    win.addEventListener("resize", function () {
        clearTimeout(tid)
        tid= setTimeout(refreshRem, 300)
    }, !1)
    win.addEventListener("pageshow", function (e) {
        win.persisted && (clearTimeout(tid), tid = setTimeout(refreshRem, 300))
    }, !1)
    "complete" === doc.readyState ? doc.body.style.fontSize = 12 * dpr + "px" : doc.addEventListener("DOMContentLoaded", function (e) {
        doc.body.style.fontSize = 12 * dpr + "px"
    }, !1)
    refreshRem()
    flexible.dpr = win.dpr = dpr
    flexible.refreshRem = refreshRem
    flexible.rem2px = function (e) {
        var val = parseFloat(e) * this.rem;
        return "string" == typeof e && e.match(/rem$/) && (t += "px"), val
    }
    flexible.px2rem = function (e) {
        var val = parseFloat(e) / this.rem;
        return "string" == typeof e && e.match(/px$/) && (t += "rem"), val
    }
}(window, window.lib || (window.lib = {}));

// ;(function(win, lib) { // lib-flexible
//     var doc = win.document;
//     var docEl = doc.documentElement;
//     var metaEl = doc.querySelector('meta[name="viewport"]');
//     var flexibleEl = doc.querySelector('meta[name="flexible"]');
//     var dpr = 0;
//     var scale = 0;
//     var tid;
//     var flexible = lib.flexible || (lib.flexible = {});
//
//     if (metaEl) {
//         console.warn('将根据已有的meta标签来设置缩放比例');
//         var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
//         if (match) {
//             scale = parseFloat(match[1]);
//             dpr = parseInt(1 / scale);
//         }
//     } else if (flexibleEl) {
//         var content = flexibleEl.getAttribute('content');
//         if (content) {
//             var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
//             var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
//             if (initialDpr) {
//                 dpr = parseFloat(initialDpr[1]);
//                 scale = parseFloat((1 / dpr).toFixed(2));
//             }
//             if (maximumDpr) {
//                 dpr = parseFloat(maximumDpr[1]);
//                 scale = parseFloat((1 / dpr).toFixed(2));
//             }
//         }
//     }
//
//     if (!dpr && !scale) {
//         var isAndroid = win.navigator.appVersion.match(/android/gi);
//         var isIPhone = win.navigator.appVersion.match(/iphone/gi);
//         var devicePixelRatio = win.devicePixelRatio;
//         if (isIPhone || isAndroid) {
//             // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
//             if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
//                 dpr = 3;
//             } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
//                 dpr = 2;
//             } else {
//                 dpr = 1;
//             }
//         } else {
//             // 其他设备下，仍旧使用1倍的方案
//             dpr = 1;
//         }
//         scale = 1 / dpr;
//     }
//
//     console.log(2345, dpr);
//
//     docEl.setAttribute('data-dpr', dpr);
//     if (!metaEl) {
//         metaEl = doc.createElement('meta');
//         metaEl.setAttribute('name', 'viewport');
//         metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
//         if (docEl.firstElementChild) {
//             docEl.firstElementChild.appendChild(metaEl);
//         } else {
//             var wrap = doc.createElement('div');
//             wrap.appendChild(metaEl);
//             doc.write(wrap.innerHTML);
//         }
//     }
//
//     function refreshRem(){
//         var width = docEl.getBoundingClientRect().width;
//         if (width / dpr > 540) {
//             width = 540 * dpr;
//         }
//         var rem = width / 10;
//         docEl.style.fontSize = rem + 'px';
//         flexible.rem = win.rem = rem;
//     }
//
//     win.addEventListener('resize', function() {
//         clearTimeout(tid);
//         tid = setTimeout(refreshRem, 300);
//     }, false);
//     win.addEventListener('pageshow', function(e) {
//         if (e.persisted) {
//             clearTimeout(tid);
//             tid = setTimeout(refreshRem, 300);
//         }
//     }, false);
//
//     if (doc.readyState === 'complete') {
//         doc.body.style.fontSize = 12 * dpr + 'px';
//     } else {
//         doc.addEventListener('DOMContentLoaded', function(e) {
//             doc.body.style.fontSize = 12 * dpr + 'px';
//         }, false);
//     }
//
//
//     refreshRem();
//
//     flexible.dpr = win.dpr = dpr;
//     flexible.refreshRem = refreshRem;
//     flexible.rem2px = function(d) {
//         var val = parseFloat(d) * this.rem;
//         if (typeof d === 'string' && d.match(/rem$/)) {
//             val += 'px';
//         }
//         return val;
//     }
//     flexible.px2rem = function(d) {
//         var val = parseFloat(d) / this.rem;
//         if (typeof d === 'string' && d.match(/px$/)) {
//             val += 'rem';
//         }
//         return val;
//     }
//
// })(window, window['lib'] || (window['lib'] = {}));

function throttle(fn = new Function(), delay = 200, mustRunDelay = 100) {
    var timer = null;
    var t_start;
    return function () {
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if (!t_start) {
            t_start = t_curr;
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}
var ticking = false;
function throttle2(callback){
    if(!ticking) {
        requestAnimationFrame(callback);
    }
    ticking = false;
}
