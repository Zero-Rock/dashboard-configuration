import React from 'react';
import { BoardGrid } from '../src/index';
import layout from './mock/data';

function App() {
  return <BoardGrid layout={layout} onSave={(saveLayout: any) => { console.log(saveLayout); }} />;
}

export default App;
