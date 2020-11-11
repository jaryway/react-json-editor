import React from 'react';
import { Drawer, Button, Form } from 'antd';
// import moment from 'moment';
import FormViewer from 'viewer';
// import ButtonGroup from 'antd/lib/button/button-group';
const { Group: ButtonGroup } = Button;

/**
 * 把表单的富文本值转成HTML
 * @param {Object} values
 */
function richTextContentState2HTML(values) {
  // null undefind "" 直接返回
  if (!values) return values;
  // // 不是对象返回
  // if (Object.prototype.toString.call(values) !== '[object Object]') return values;

  const htmlContent = Object.entries(values)
    .filter(([, v]) => v && v.toHTML)
    .reduce((prev, [k, v]) => ({ ...prev, [k]: v.toHTML() }), {});

  return { ...values, ...htmlContent };
}

function Preview({ layout, form, visible, onClose }) {
  const _formvalues = localStorage.getItem('formValues');
  const prefix = 'formObj';
  let formvalues = _formvalues
    ? JSON.parse(_formvalues)
    : {
        '80c4aec05149c': 'qwerqwe',
        'ac3c8318bc60b': 'rqwwwwww',
        '单选框组': '选项1',
        'db15b4753441d': 1,
        'd9ec8b88c036e': '19244555441',
        '506ae7ae6e63f': 'wwew',
        'cf214ea2be12d': 'www',
        '976d546265006':
          '<p>asdfasd zkas kls </p><p>askdj askjdj sjxkjasndk nxasdf</p><p>sadfasd</p>',
      };

  formvalues = {
    ...formvalues,
    ___applyuser: JSON.stringify({ name: 'jaryway', department: '中船互联' }),
  };

  const onSave = () => {
    const { validateFieldsAndScroll } = form;

    validateFieldsAndScroll((err, values) => {
      if (err) return false;

      const formData = richTextContentState2HTML(prefix ? values[prefix] : values);
      console.log('formData1', JSON.stringify(values));
      console.log('formData2', JSON.stringify(formData));

      localStorage.setItem('formValues', JSON.stringify(formData));
    });
  };

  return (
    <Drawer
      className='example-preview'
      title={
        <div style={{ textAlign: 'center' }}>
          <ButtonGroup>
            <Button>电脑端</Button>
            <Button>手机端</Button>
          </ButtonGroup>
        </div>
      }
      visible={visible}
      placement='bottom'
      height='calc(100% - 28px)'
      maskClosable={false}
      onClose={onClose}
      bodyStyle={{
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        backgroundColor: '#fafafa',
        padding: '16px 0 0',
      }}
      headerStyle={{ padding: '10px 24px' }}
    >
      <div className='example-preview-bd'>
        <div className='example-preview-operations'>
          {/* <Button type='link'>导入</Button> */}
          <Button type='primary' onClick={onClose}>
            关闭
          </Button>
          <Button onClick={onSave}>保存</Button>
        </div>
        <FormViewer layout={layout} form={form} values={formvalues} prefix={prefix} />
        <div className='example-preview-operations'>
          {/* <Button type='link'>导入</Button> */}
          <Button type='primary' onClick={onClose}>
            关闭
          </Button>
          <Button onClick={onSave}>保存</Button>
        </div>
      </div>
    </Drawer>
  );

  // return (
  //   <Modal
  //     footer={null}
  //     visible={visible}
  //     mask={true}
  //     width='100%'
  //     bodyStyle={{ width: '100vw', height: '100vh', overflow: 'auto' }}
  //     style={{ top: 0, margin: 0, right: 0, left: 0, position: 'fixed' }}
  //     onCancel={onClose}
  //   >
  //     <div className='example-preview'>
  //       <div className='example-operations' style={{ margin: '0 auto', width: 760 }}>
  //         {/* <Button type='link'>导入</Button> */}

  //         <Button type='primary' onClick={onClose}>
  //           关闭
  //         </Button>
  //         <Button onClick={onSave}>保存</Button>
  //       </div>
  //       <FormViewer layout={layout} form={form} values={formvalues} prefix={prefix} />
  //     </div>
  //   </Modal>
  // );
}

export default Form.create()(Preview);
