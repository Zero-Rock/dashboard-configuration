import * as React from 'react';
import { Menu, Dropdown } from '@terminus/nusi';
import { map } from 'lodash';
import { If, Choose, When, Otherwise } from 'tsx-control-statements/components';
import DashboardStore from '../../../../../stores/dash-board';
import { DcInfoIcon } from '../../../../../common';
import { DIMENSIONS_CONFIGS, SPECIAL_METRIC_TYPE, COMMON_DIMENSIONS_CONFIGS } from '../constants';

import './index.scss';

const textMap = DashboardStore.getState((s) => s.textMap);
const { Item: MenuItem, Divider: MenuDivider, SubMenu } = Menu;

interface IProps {
  children: JSX.Element;
  type: DICE_DATA_CONFIGURATOR.DimensionMetricType;
  dimensionType: DICE_DATA_CONFIGURATOR.DimensionType;
  aggregation?: string;
  aggregationOptions?: Array<{ value: string; label: string }>;
  onTriggerAction: (type: DICE_DATA_CONFIGURATOR.DimensionConfigsActionType, option?: { payload?: any; isUpdateDirectly?: boolean }) => void;
}

const DimensionConfigs = ({
  children,
  type,
  dimensionType,
  aggregationOptions,
  aggregation,
  onTriggerAction,
}: IProps) => {
  const child = React.Children.only(children);
  let configs = DIMENSIONS_CONFIGS[type];
  let selectedKeys;

  if (['value', 'type'].includes(dimensionType)) {
    configs = [...configs, ...COMMON_DIMENSIONS_CONFIGS];
  }

  if (type === 'field') {
    configs = [
      {
        key: SPECIAL_METRIC_TYPE.field,
        label: textMap['metric aggregation'],
        type: 'sub',
        options: aggregationOptions,
      },
      {
        key: 'divider1',
        type: 'divider',
      },
      ...configs,
    ];
    aggregation && (selectedKeys = [aggregation, SPECIAL_METRIC_TYPE.field]);
  }

  if (type === 'filter') {
    configs = [
      {
        key: SPECIAL_METRIC_TYPE.filter,
        label: textMap['filter config'],
        actionKey: 'configFilter',
      }
    ];
  }

  const handleClick = ({ keyPath }: any) => {
    if (keyPath[1] === SPECIAL_METRIC_TYPE.field) {
      onTriggerAction('configFieldAggregation', {
        payload: {
          aggregation: keyPath[0] === aggregation ? undefined : keyPath[0],
        },
        isUpdateDirectly: true
      });
    }
  };

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu
          onClick={handleClick}
          defaultOpenKeys={[SPECIAL_METRIC_TYPE.field]}
          selectedKeys={selectedKeys}
        >
          {
            map(configs, ({ label, info, actionKey, key, type: menuItemType, options }) => (
              <Choose key={key}>
                <When condition={menuItemType === 'divider'}>
                  <MenuDivider />
                </When>
                <When condition={menuItemType === 'sub'}>
                  <SubMenu key={key} title={label}>
                    {map(options, (option) => (
                      <MenuItem key={option.value}>{option.label}</MenuItem>
                    ))}
                  </SubMenu>
                </When>
                <Otherwise>
                  <MenuItem key={key} onClick={() => onTriggerAction(actionKey as DICE_DATA_CONFIGURATOR.DimensionConfigsActionType)}>
                    <span className="dc-editor-dimension-config">
                      {label}
                      <If condition={!!info}><DcInfoIcon info={info as string} /></If>
                    </span>
                  </MenuItem>
                </Otherwise>
              </Choose>
            ))
          }
        </Menu>
      }
    >
      {child}
    </Dropdown>
  );
};

export default DimensionConfigs;
