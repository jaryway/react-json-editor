import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import api from 'api';
// import FormDesigner from '@/designer';
// // import FormViewer from '@/viewer';
// import Preview from './Preview';
// import JsonViewer from './JsonViewer';
// import { Form } from 'antd';
import { Spin, Tabs } from 'antd';

// import { DndProvider } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
// const WrapFormViewer = Form.create()(FormViewer);
import './style';
const App = () => {
  // const [loading, setLoading] = useState(true);
  // const [layout, setLayout] = useState([]);
  // const [formInfo, setFormInfo] = useState({});
  // const [previewVisible, setPreviewVisible] = useState(false);
  // const [jsonViewerVisible, setJsonViewerVisible] = useState(false);

  // FormViewer 要传入 form 可以传进

  return (
    <div className='example-app'>
      {/* <div className='test-tabs'>
        <div className='test-tabs-bd'>
          <div className='test-tabs-content'>
            嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br> 嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br> 嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br> 嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br>
            嘻嘻嘻嘻嘻
            <br></br>
          </div>
        </div>
      </div> */}
      <Tabs className='test-tabs-toolbox'>
        <Tabs.TabPane key='1' tab='本地服务'>
          <div className='test-tabs-toolbox-bd'>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key='2' tab='远程服务'></Tabs.TabPane>
      </Tabs>

      <div className='test1-tabs'>
        <div className='test1-tabs-bd'>
          <div className='test1-tabs-content'>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
            <div className='item'>嘻嘻嘻嘻嘻</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
