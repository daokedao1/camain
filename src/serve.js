export const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],//加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'],//引用，代码块

    [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
    [{ 'list': 'ordered'}, { 'list': 'bullet' }], //列表
    [{ 'script': 'sub'}, { 'script': 'super' }],// 上下标
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
    [{ 'direction': 'rtl' }],                         // 文本方向
    [{
        // 'size': ['10px', '12px', '14px', '16px', '18px', '20px']
        //1/75 *2
        //1px =0.026rem
        //1rem=36px
        'size': ['0.26rem', '0.31rem', '0.37rem', '0.41rem', '0.47rem', '0.52rem']
    }],
    // [{ 'size': ['small', false, 'large', 'huge', '0.52rem'] }],  // 字体大小
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],//几级标题

    [{ 'color': [] }, { 'background': [] }],         // 字体颜色，字体背景颜色
    [{ 'font': [] }],//字体
    [{ 'align': [] }],//对齐方式
    ['link', 'image', 'video'],//上传图片、上传视频
    ['clean']                     //清除字体样式                     // remove formatting button
];