### 一个函数预览图片

### 简介
对`PhotoSwipe`的封装.已将其打包,UMD格式

### 安装
`npm i @redbuck/preview`

### 使用
```javascript
import previewImage from './main';

const imgList = [
"https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
"https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
"https://farm4.staticflickr.com/3894/15008518202_b016d7d289_b.jpg",
]

previewImage({
    imgList,
    current: 0,
});
```

options:

属性 | 类型 | 默认值|描述|必须
--:|--:|--:|--:|--:
imgList| `url[]` |undefined|图片链接数组|是
current|`string丨number丨HTMLImageElement`|0|打开哪个|是
elList|`HTMLImageElement[]`|document.images|与imgList对应的图片元素数组|否
getTemplate|`Function`|undefined|自定义模板|否
options|`Object`|{}|PhotoSwipe配置对象|否

### 一些吐槽
PhotoSwipe是个很好图片预览库,动画流畅,效果美观.

可惜文档写的太烂了😂,而且使用起来有点麻烦.需要预先提供一个HTML模板.

官网称是为了减小体积同时可以让开发者自定义UI.

不过讲真,为了减小这点体积,付出调用复杂实在不是什么好的选择.而且实际上最终用户那里,始终是要加载这个模板的.一样少不了.只是让库的体积看起来美好一点吧😁.完全可以内置,如果有开发者需要自定义,可以提供一个`getTemplate`选项,自行传入嘛.

本来还不想麻烦的.`gayhub`搜搜,找到一个`vue-preview`,fork一看,我去,代码几乎跟官网的demo一模一样,这样也行😓?而且只能组件形式的用,只能传入图片链接,展示完全由组件负责了.一点自定义的余地都没有.如果我的需求是散落在页面各处的图片都要能预览,我就得到处插入这个组件.侵入性也太强了.说到底,作者只是把官方demo改了改而已.而实际上个人觉得官网的示例写的非常差.

洋洋洒洒写了一大坨,实际上都是无效信息.
真正有效的只有两处
```JavaScript
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
```
其中`pswpElement`是上文提到的HTML模板,`PhotoSwipeUI_Default`是一个库里的一个包,这两个基本是固定的.
`items`是一个图片信息数组.形状如下
```javascript
interface Item {
  h: number,
  w: number,
  el: HTMLElement,
  src: ImagePath
}
```
实际上有这三个参数就可以了.只是缺少图片过渡动画.

`options`是其他的一些配置参数,最重要的就是`getThumbBoundsFn`,打开图片预览与关闭预览时需要获取图片在页面的位置,这个方法注入index,返回index对应的图片位置即可.

```javascript
options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };
```
