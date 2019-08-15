## 如何使用
```js
  // 1、将model加入项目的model中
  // 引入
  import { biModels } from '@terminus/bi-ui-package'

  // 加入，各项目不同，model引入的方式可能不同
  model = [
    ...biModels
  ]
  ...

  // 2、引入组件，栅格布局
  import { BoardGrid } from '@terminus/bi-ui-package'

  <BoardGrid
    readOnly={false}
    extra={extra}
    onSave={this.onSave}

    theme={theme}
    themeObj={themeObj}
    customCharts={customCharts}
    controlsMap={controlsMap}
    UrlComponent={UrlComponent}
  />

  // 3、webpack相关配置变更，因为当前没有转为es5
  // 1) scss变更
  test: /\.scss$/,
  include: [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'node_modules/@terminus/bi-ui-package'),
  ],
  exclude: /node_modules\/(?!@terminus\/).*/,

  // 2) ts变更
  test: /\.(tsx?|jsx?)$/,
  exclude: /node_modules\/(?!@terminus\/).*/,

  // 3）主题色
  // a.定义颜色值
  {
    loader: 'sass-resources-loader',
    options: {
      sourceMap: false,
      resources: [
        path.resolve(__dirname, './app/styles/_color.scss'),
      ],
    },
  },
  // b._color.scss中请务必定义$color-primary的颜色值
  $color-primary: #44c790; // 举例
```

## 属性Props说明
```js
  /**
   * 常规属性
   */
  // 只读
  // 默认为false
  readOnly: false

  // 仪表盘的基本信息
  // 非必传, 默认如下
  extra: {
    layout: [], // 布局信息
    drawerInfoMap: {}, // 所有图表配置信息
    linkMap: {}, // 所有联动信息
  }

  // 保存时的回调接口
  // 非必传
  onSave: (extra) => void,

  /**
   * 扩展属性
   */
  // echarts的主题
  // 非必传, 默认如下, 如果传入必须同时传入
  // 用户可以去http://www.echartsjs.com/download-theme.html 这里去下载或者定制自己的主题
  theme: 'dice'
  themeObj: dice的themeObj

  // 图表扩充
  // 非必传，可以覆盖已经存在的图表, 也可以新增新的图表, DataSettingsCommonCharts可以不用
  import { DataSettingsCommonCharts } from '@terminus/bi-ui-package'

  customCharts: {
    line: {
      name: '折线图',
      icon: <Icon type="line-chart" />, // icon
      Component: ChartLine,  // 图表组件
      mockData: mockDataLine, // mock数据
      dataSettings: [DataSettingsCommonCharts], // 数据配置
    },
  };

  // 控件扩充
  // 非必传，可以覆盖已经存在的控件, 也可以新增新的, DataSettingsCommonControls可以不用
  import { DataSettingsCommonControls } from '@terminus/bi-ui-package'

  controlsMap: {
    selectNormal: {
      name: '常规下拉框',
      icon: '常规下拉框',
      Component: SelectNormal,
      dataSettings: [DataSettingsCommonControls],
    },
  };

  // 第三方系统的url配置器
  // 非必传，可以覆盖内置的Input填写方式，会传入当前编辑的viewId(必须小写，否则Input时会有warning提示)
  UrlComponent: Input

  // url参数映射
  // 非必传，可以映射url中的类似{paramName}字段
  // 举例：urlParamsMap={id: 1}，接口如 '/api/{id}?pro={id}' 会在请求时被转换为/api/1?pro=1
  urlParamsMap: undefined

  // url的Form Item Layout 控制
  // 非必传，默认是全局的formItemLayout
  urlItemLayout: formItemLayout

  // url 接口数据处理
  // 非必传
  urlDataHandle?: ({ type, url, data }) => any // 接口数据处理

  // 扩展图表样式，可自定义全局样式
  // 非必传，不会再编辑器中被显示，应当设置对用户无感的全局自定义设置，否则会出现来回编辑清掉图表自定义设置后，又再次受到全局的影响
  expandOption?: ({ chartType, url }: IExpand) => object
```

## 对外提供的其他参数
#### 1、DataSettingsCommonCharts
用于外部扩充图表组件时使用
#### 2、DataSettingsCommonCharts
用于外部扩充控件组件时使用
#### 3、convertOptionToSetting
将option的层级树平铺
#### 4、convertSettingToOption
将平铺的内容，重新组织成为option

## 如何开发
### 1、可自行定义extra存放位置
可以存在数据库中，或者本地的js/json文件中
### 2、extra如何处理默认的平铺结构
可以配合convertOptionToSetting、convertSettingToOption去组织结构提升阅读性

## 其他文档
[如何调试](./Debug.md)

[功能规划](https://yuque.antfin-inc.com/docs/share/4d74d1c0-367f-4dd2-94ff-30eb3fcad10a)
