import React, { useCallback, useEffect, useRef } from 'react';
import { Drawer, Button, message } from 'antd';
import ace from 'ace';

const InternalComponent = ({ data, visible, onSave }) => {
  const aceRef = useRef(null);

  const _onSave = useCallback(() => {
    // console.log('xxxxx', value);
    try {
      const value = aceRef.current.getValue();
      // console.log('xxxxxx', value);
      onSave(JSON.parse(value));
    } catch (ex) {
      message.warn('JSON格式错误' + ex.message);
    }
  }, [onSave]);

  const callbackRef = useCallback((element) => {
    if (element !== null) {
      aceRef.current = ace.edit(element, {
        mode: 'ace/mode/json',
        selectionStyle: 'text',
        value: JSON.stringify(data, null, 2),
      });
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!aceRef.current) return;
    // 显示的时候更新值
    aceRef.current.setValue(JSON.stringify(data, null, 2), -1);
  }, [visible]);

  return (
    <div className='example-jsonviewer-bd'>
      <div className='example-preview-operations' style={{ paddingTop: 8 }}>
        <Button type='primary' onClick={_onSave}>
          更新
        </Button>
      </div>
      <div className='fregata-json-editor' ref={callbackRef}></div>
    </div>
  );
};

function JsonViewer({ data, visible, onSave, onClose }) {
  return (
    <>
      <Drawer
        className='example-jsonviewer'
        title='编辑 JSON'
        visible={visible}
        placement='bottom'
        height='calc(100% - 28px)'
        maskClosable={false}
        onClose={onClose}
        bodyStyle={{ height: 'calc(100% - 55px)', overflow: 'auto', padding: 0 }}
      >
        <InternalComponent onSave={onSave} data={data} visible={visible} />
      </Drawer>
    </>
  );
}

export default JsonViewer;
