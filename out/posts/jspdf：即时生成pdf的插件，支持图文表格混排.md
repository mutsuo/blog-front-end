---
title: jspdf：即时生成pdf的插件，支持表单图文混排
date: 2024-03-01
tags: [插件, jspdf]
categories: [TypeScript|JavaScript]
---

# 介绍

jspdf是即时生成pdj的插件，支持通过html代码或源数据生成。



# 快速开始

## 安装

官方给出的安装方式有三种：

- `npm install jspdf jspdf-autotable`
- 前往github下载jspdf和jspdf-autotable： [jspdf](https://raw.githubusercontent.com/MrRio/jsPDF/master/dist/jspdf.umd.min.js) [jspdf-autotable](https://raw.githubusercontent.com/simonbengtsson/jsPDF-AutoTable/master/dist/jspdf.plugin.autotable.js)
- 通过CDN加载，例如： https://unpkg.com/jspdf 、 https://unpkg.com/jspdf-autotable

个人觉得通过npm安装比较省事。

## demo

1、[这个链接🔗](https://simonbengtsson.github.io/jsPDF-AutoTable/)展示了插件可实现的效果：除了基础的文字表格混排外，还展示了合并单元格、自定义表格风格、页眉页脚等效果。

2、[这个链接🔗](https://github.com/simonbengtsson/jsPDF-AutoTable/tree/master/examples)提供了nodejs、ts和webpack的示例代码，另外在[这个链接🔗](https://github.com/simonbengtsson/jsPDF-AutoTable/blob/master/examples/examples.js)可以查看html的示例代码。

------

## 核心代码

调用插件的核心代码如下：

```javascript
const doc = new jsPDF()
autoTable(doc, { ... }) //花括号内为pdf内容和样式的代码，可以是html或json格式
doc.save('table.pdf') //保存文件。注意文件路径应包含文件名
```

等价于以下写法：

```javascript
const doc = new jsPDF()
doc.autoTable({ ... }) 
doc.save('table.pdf')
```

## 后端写法

以下为文档给出的usage，其它框架的示例可以在[这个链接🔗](https://github.com/simonbengtsson/jsPDF-AutoTable/tree/master/examples)查看。

需要注意的是，不论你是使用上一节所述的哪一种写法，**`jsPDF`和`autoTable`这两个插件都必须引入**。

```javascript
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const doc = new jsPDF()

// It can parse html:
// <table id="my-table"><!-- ... --></table>
autoTable(doc, { html: '#my-table' })

// Or use javascript directly:
autoTable(doc, {
  head: [['Name', 'Email', 'Country']],
  body: [
    ['David', 'david@example.com', 'Sweden'],
    ['Castille', 'castille@example.com', 'Spain'],
    // ...
  ],
})

// Sometimes you might have to call the default function on the export (for example in Deno)
autoTable.default(doc, { html: '#my-table' })

doc.save('table.pdf')
```

## HTML写法

以下同样为官方文档中的示例，需要通过本地文件或CDN的方式引入插件。

```html
<script src="jspdf.min.js"></script>
<script src="jspdf.plugin.autotable.min.js"></script>
<script>
  var doc = new jsPDF()
  doc.autoTable({ html: '#my-table' })
  doc.save('table.pdf')
</script>
```



# Let we go

由于没有试过用html配置pdf内容，故按下不表。本节介绍通过源数据进行设置的常用操作。

## 配置

插件支持对内容、样式、表单进行配置，具体写法请见[文档](https://www.npmjs.com/package/jspdf-autotable#SnippetTab)。

## 常用操作

### 文本

1、设置文本字体和字号：

引用的字体ttf文件得放在`app/public/font`路径下

```javascript
doc.setFont('FZDBSJW'); //方正大标宋简体
doc.setFontSize(10.5); //五号
```

2、绘制文字

```javascript
doc.text(lrSpace, y, data); 
```

- lrSpace：左右外边距
- y：上下外边距
- data：文本数据

### 图像

1、绘制图像

```javascript
doc.addImage(img_obj, format, x, y, img_width, img_height);
```

- `img_obj`：node-base64-image模块返回的对象

  ```javascript
  const base64 = require('node-base64-image');
  const img_obj = await base64.encode(img_url);
  ```

- `format`：图片的格式，字符串类型。如`"png"`、`"jpg"`
- `x`、`y`：图像左上角的坐标
- `img_width`、`img_height`：图像的宽和高

### 表格

可以配置的option详见[文档](https://www.npmjs.com/package/jspdf-autotable#other-options)。以下为本人手写的示例代码，供学习参考：

```javascript
doc.autoTable({
    styles: { // 设置表格的字体，不然表格中文也乱码
        fillColor: [ 255, 255, 255 ],
        font: 'FZDBSJW',
        textColor: [ 0, 0, 0 ],
        halign: 'left',
        fontSize: 10.5, // 五号
    },
    columnStyles: {
        0: {
            cellWidth: img_height*2 + 2, //旧版本中为columnWidth
            minCellHeight: img_height * 0.6
        },
        1: {
            cellWidth: img_height*2 + 2, //如各列的cellWidth不一致，将取最大值
            minCellHeight: img_height * 0.6
        },
    },
    headStyles: { // 设置表头样式
        fillColor: '#fff', // 背景颜色
        textColor: '#000', // 文字颜色
        lineColor: '#D3D3D3', // 线颜色
        lineWidth: 0.1, // 线宽
    },
    theme: 'grid', // 主题
    body: [{}], // 表格内容
    columns: [ // 表头
    {
        header: header1,
        dataKey: 'header1',
    },
    {
        header: header2,
        dataKey: 'header2',
    },
    ],
    startY: y, // 距离上边的距离
    margin: lrSpace, // 距离左右边的距离
    didDrawCell: (data) => {
        if (data.column.index === 0) {
            cellY = data.cell.y; //获取左上角位置
            cellHeight = data.cell.height; //获取格子高度
        }
    },
});
```

1、body支持列表和key-value两种写法：

```javascript
 body:[
     ['David', 'david@example.com'],  
     ['Castille', 'castille@example.com']
 ]
```

等价于：

```javascript
 body:[
     {'header1':'David', 'header2':'david@example.com'},  
     {'header1':'Castille', 'header2':'castille@example.com'}
 ]
```

2、使用hooks可以实现精细的自定义，详见[文档](https://www.npmjs.com/package/jspdf-autotable#hooks)。

- `didParseCell:（HookData）=>｛｝`-当插件完成对单元格内容的解析时调用。可用于替代特定单元格的内容或样式。
- `willDrawCell:（HookData）=>｛｝`-在绘制单元格或行之前调用。可用于调用本地jspdf样式函数，如doc.setTextColor或在绘制文本之前更改文本的位置等。
- `didDrawCell:（HookData）=>｛｝`-在将单元格添加到页面后调用。可用于绘制其他单元格内容，如带有doc.addImage的图像、带有doc.add text的其他文本或其他jspdf形状。
- `willDrawPage:（HookData）=>｛｝`-在开始绘图之前调用。可以用来添加页眉或任何其他内容，您希望在每个页面上都有一个自动表格。
- `didDrawPage:（HookData）=>｛｝`-在插件完成在页面上绘制所有内容后调用。可用于添加带有页码的页脚或您希望在每页上添加的任何其他内容—有一个自动表格。

通过`didDrawCell`方法，我们可以在表格中插入图片，效果如下：

​    ![0](data:image/png;base64,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)

代码接上面的例子：

```javascript
var idx = 1;
doc.autoTable({
   // ... 省去前38行代码
   didDrawCell: (data) => {
        if (data.column.index === 0) {
            cellY = data.cell.y; //获取左上角位置
            cellHeight = data.cell.height; //获取格子高度
        }
        if (idx === 3 && data.column.index === 0) {
            doc.addImage(img_obj, 'png', data.cell.x+1, data.cell.y + 1, img_width, img_height);
        }
        if (idx === 4 && data.column.index === 1) {        
            doc.addImage(img_obj, 'png', data.cell.x+1, data.cell.y + 1, img_width, img_height);
            doc.addImage(img_obj, "png", data.cell.x + img_height + 1, data.cell.y + 1, img_height, img_height/2); 
        }
        idx++;
    },
});
```

由于`data.row.index`并不能表示所在行号，因此另外定义了一个自增变量`idx`。

`data.column`包含字段：

```json
{
  "wrappedWidth": 82,
  "minReadableWidth": 51.68194444444444,
  "minWidth": 82,
  "width": 82,
  "dataKey": "header1",
  "raw": {
    "header": "header1",
    "dataKey": "header1"
  },
  "index": 1
}
```

`data.row`包含的字段：

```javascript
{
  "height": 42,
  "raw": {},
  "index": 0,
  "section": "body",
  "cells": {
    "0": {
      "contentHeight": 42,
      "contentWidth": 3.5277777777777772,
      "wrappedWidth": 82,
      "minReadableWidth": 3.5277777777777772,
      "minWidth": 82,
      "width": 82,
      "height": 42,
      "x": 25,
      "y": 97.9325,
      "styles": {
        "font": "FZDBSJW",
        "fontStyle": "normal",
        "overflow": "linebreak",
        "fillColor": "#fff",
        "textColor": "#000",
        "halign": "left",
        "valign": "top",
        "fontSize": 10.5,
        "cellPadding": 1.7638888888888886,
        "lineColor": "#D3D3D3",
        "lineWidth": 0.1,
        "cellWidth": 82,
        "minCellHeight": 42,
        "minCellWidth": 0
      },
      "section": "body",
      "rowSpan": 1,
      "colSpan": 1,
      "text": [
        ""
      ]
    },
    "1": {
      "contentHeight": 42,
      "contentWidth": 3.5277777777777772,
      "wrappedWidth": 82,
      "minReadableWidth": 3.5277777777777772,
      "minWidth": 82,
      "width": 82,
      "height": 42,
      "x": 107,
      "y": 97.9325,
      "styles": {
        "font": "FZDBSJW",
        "fontStyle": "normal",
        "overflow": "linebreak",
        "fillColor": "#fff",
        "textColor": "#000",
        "halign": "left",
        "valign": "top",
        "fontSize": 10.5,
        "cellPadding": 1.7638888888888886,
        "lineColor": "#D3D3D3",
        "lineWidth": 0.1,
        "cellWidth": 82,
        "minCellHeight": 42,
        "minCellWidth": 0
      },
      "section": "body",
      "rowSpan": 1,
      "colSpan": 1,
      "text": [
        ""
      ]
    },
    "img_obj": {
      "contentHeight": 42,
      "contentWidth": 3.5277777777777772,
      "wrappedWidth": 82,
      "minReadableWidth": 3.5277777777777772,
      "minWidth": 82,
      "width": 82,
      "height": 42,
      "x": 25,
      "y": 97.9325,
      "styles": {
        "font": "FZDBSJW",
        "fontStyle": "normal",
        "overflow": "linebreak",
        "fillColor": "#fff",
        "textColor": "#000",
        "halign": "left",
        "valign": "top",
        "fontSize": 10.5,
        "cellPadding": 1.7638888888888886,
        "lineColor": "#D3D3D3",
        "lineWidth": 0.1,
        "cellWidth": 82,
        "minCellHeight": 42,
        "minCellWidth": 0
      },
      "section": "body",
      "rowSpan": 1,
      "colSpan": 1,
      "text": [
        ""
      ]
    }   
  },
  "spansMultiplePages": false
}
```

