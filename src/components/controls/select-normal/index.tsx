import React from 'react';
import { get, isEqual, map } from 'lodash';
import { connect } from 'dva';
import { Select, message } from 'antd';
import { pannelControlPrefix, getData } from '../../utils';

const Option = Select.Option;
type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class SelectNormal extends React.PureComponent<IProps> {
  state = {
    resData: [],
  };

  componentDidMount() {
    this.handleData(this.props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (!isEqual(nextProps.url, this.props.url) || !isEqual(nextProps.fixedData, this.props.fixedData)) {
      this.handleData(nextProps);
    }
  }

  onChange = (value: string) => {

  }

  handleData = ({ url, fixedData }: IProps) => {
    if (url) { // 接口获取
      getData(url).then((resData: any) => {
        this.setState({ resData });
      }).catch(() => {
        message.error('该常规下拉框接口获取数据失败', 3);
      });
    } else { // 静态数据
      try {
        const resData = JSON.parse(fixedData);
        this.setState({ resData });
      } catch (error) {
        console.error('常规下拉框静态数据转化失败', fixedData);
      }
    }
  }

  render() {
    const { width } = this.props;
    const { resData } = this.state;
    return (
      <Select defaultValue="" style={{ width }} onChange={this.onChange}>
        <Option key="all" value="">请选择</Option>
        {map(resData, ({ name, value }, i) => {
          return <Option key={value || `${i}`} value={value}>{name}</Option>;
        })}
      </Select>
    );
  }
}

const mapStateToProps = ({ biDrawer: { drawerInfoMap } }: any, { chartId }: any) => ({
  width: get(drawerInfoMap, [chartId, `${pannelControlPrefix}width`], 120),
  searchName: get(drawerInfoMap, [chartId, `${pannelControlPrefix}searchName`], ''),
  url: get(drawerInfoMap, [chartId, `${pannelControlPrefix}url`], ''),
  fixedData: get(drawerInfoMap, [chartId, `${pannelControlPrefix}fixedData`], '[]'),
});

const mapDispatchToProps = (dispatch: any) => ({
  onChoose(controlType: string) {
    dispatch({ type: 'biDrawer/chooseControl', controlType });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectNormal);
