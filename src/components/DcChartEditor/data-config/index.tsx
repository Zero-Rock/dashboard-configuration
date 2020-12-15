import React, { useMemo } from 'react';
import ChartEditorStore from '../../../stores/chart-editor';

export default () => {
  const [viewCopy, { getAPIFormComponent }] = ChartEditorStore.useStore((s) => [s.viewCopy, s.editorContextMap]);
  const { updateEditor } = ChartEditorStore;
  const APIFormComponent = useMemo(() => getAPIFormComponent(), [getAPIFormComponent]);

  return (
    <APIFormComponent
      currentChart={viewCopy}
      submitResult={(apiObj: any, restConfig: any = {}) => updateEditor({ api: apiObj, ...restConfig })}
    />
  );
};
