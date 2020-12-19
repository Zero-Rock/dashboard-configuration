import { get } from 'lodash';
import { Form } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { RenderPureForm } from '../../../common';
import ChartEditorStore from '../../../stores/chart-editor';
import DashboardStore from '../../../stores/dash-board';

interface IProps {
  form: WrappedFormUtils;
  forwardedRef: { current: any };
}

const TableConfigurator = (props: IProps) => {
  const [viewMap, editChartId, isTouched] = ChartEditorStore.useStore((s) => [s.viewMap, s.editChartId, s.isTouched]);
  const textMap = DashboardStore.useStore((s) => s.textMap);
  const { setTouched, onEditorChange } = ChartEditorStore;
  const currentChart = get(viewMap, [editChartId]);
  const { form, forwardedRef } = props;

  const setFieldsValue = useMemo(() => form.setFieldsValue, [form.setFieldsValue]);

  useEffect(() => {
    forwardedRef.current = form;
    if (!isTouched && form.isFieldsTouched()) {
      setTouched(true);
    }
  }, [form, forwardedRef, isTouched, setTouched]);

  useEffect(() => {
    setTimeout(() => {
      setFieldsValue(currentChart);
    }, 0);
  }, [currentChart, setFieldsValue]);

  const fields = [
    {
      label: textMap.title,
      name: 'title',
      type: 'input',
      size: 'small',
      itemProps: {
        onBlur(e: any) {
          onEditorChange({ title: e.target.value });
        },
      },
    },
    {
      label: textMap.description,
      name: 'description',
      type: 'textArea',
      size: 'small',
      itemProps: {
        onBlur(e: any) {
          onEditorChange({ description: e.target.value });
        },
      },
    },
  ];

  return (
    <section className="configurator-section">
      <RenderPureForm
        list={fields}
        form={form}
      />
    </section>
  );
};

const TableForm = Form.create()(TableConfigurator);

export default React.forwardRef((props, ref) => (
  <TableForm forwardedRef={ref} {...props} />
));
