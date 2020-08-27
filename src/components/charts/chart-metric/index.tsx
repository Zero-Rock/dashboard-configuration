/**
 * 数据指标
 */
import React from 'react';
import { uniqueId, map, isNumber, ceil } from 'lodash';
import ChartEditorStore from '../../../stores/chart-editor';

import './index.scss';

interface IResult {
  name?: string;
  unit?: string;
  value?: number | string;
  status?: string;
  color?: string;
}

interface IProps {
  viewId: string;
  results: IResult[];
  chartType: string;
  option: any;
}

const Metric = ({ results = [], viewId }: IProps) => (
  <React.Fragment>
    <section className="dc-metrics-panel">
      {
        map(results, ({ name, value, unit, status, color }) => (
          <div className="dc-metric-item" key={uniqueId(viewId)}>
            <span className={`dc-metric-value ${color ? `color-${color}` : ''}`}>
              {`${isNumber(value) ? ceil(value, 2) : value || '--'}${unit || ''}`}
            </span>
            <span className="dc-metric-name">{name || ''}</span>
          </div>
        ))
      }
    </section>
  </React.Fragment>
);

export default ({ data: { metricData: results, proportion }, option, ...rest }: any) => {
  const viewMap = ChartEditorStore.useStore(s => s.viewMap);
  const drawerInfo = viewMap[rest.viewId] || {};
  const props = {
    chartType: drawerInfo.chartType as string,
    results,
    option: { ...option, proportion },
  };
  return <Metric {...props} {...rest} />;
};
