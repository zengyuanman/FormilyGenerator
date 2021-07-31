import React from 'react';
import { Modal, Input, Button, message } from 'antd';
import copyTOClipboard from 'copy-text-to-clipboard';
import FR from './core';
import { looseJsonParse, isObject, schemaToState } from '../../utils';
import { useSet, useGlobal, useStore } from '../../hooks';

const { TextArea } = Input;

const Canvas = ({ onResultChange }) => {
  const setGlobal = useGlobal();
  const { userProps, displaySchema, displaySchemaString } = useStore();
  const [local, setState] = useSet({
    preview: false,
    showModal: false,
    showModal2: false,
    schemaForImport: '',
  });
  const { preview } = local;

  const { transformFrom, extraButtons = [] } = userProps;

  const toggleModal = () => setState({ showModal: !local.showModal });
  const toggleModal2 = () => setState({ showModal2: !local.showModal2 });

  const onTextareaChange = (e) => {
    setState({ schemaForImport: e.target.value });
  };

  const importSchema = () => {
    try {
      const value = transformFrom(looseJsonParse(local.schemaForImport));
      setGlobal(() => ({
        selected: undefined,
        ...schemaToState(value),
      }));
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  const copySchema = () => {
    copyTOClipboard(displaySchemaString);
    message.info('复制成功');
    toggleModal();
  };

  const clearSchema = () => {
    setGlobal({
      schema: {
        type: 'object',
        properties: {
          grid: {
            type: 'void',
            'x-component': 'FormGrid',
            properties: {},
          },
        },
      },
      formData: {},
      selected: undefined,
    });
  };

  const onChangeHandle = () => {
    if (onResultChange) onResultChange(displaySchemaString);
  };
  const tmpExtraButtons = Array.isArray(extraButtons) ? extraButtons : [];
  const tmpShowDefaultBtns = tmpExtraButtons.filter(
    (item) => item === true || item === false
  );
  const tmpExtraBtns = tmpExtraButtons.filter(
    (item) => isObject(item) && item.text
  );

  return (
    <div className="mid-layout pr2">
      <div className="mv2">
        {tmpShowDefaultBtns[0] !== false && (
          <Button
            className="mr2 mb1"
            onClick={() => {
              setState({ preview: !preview });
              setGlobal({ selected: '#' });
            }}
          >
            {preview ? '开始编辑' : '最终展示'}
          </Button>
        )}
        {tmpShowDefaultBtns[1] !== false && (
          <Button className="mr2" onClick={clearSchema}>
            清空
          </Button>
        )}
        {tmpShowDefaultBtns[2] !== false && (
          <Button className="mr2" onClick={toggleModal2}>
            导入
          </Button>
        )}
        {tmpShowDefaultBtns[3] !== false && (
          <Button type="primary" className="mr2" onClick={toggleModal}>
            查看schema
          </Button>
        )}
        <Button type="primary" className="mr2" onClick={onChangeHandle}>
          确定
        </Button>
        {tmpExtraBtns.map((item, idx) => {
          return (
            <Button key={idx.toString()} className="mr2" {...item}>
              {item.text || item.children}
            </Button>
          );
        })}
      </div>
      <div className={`dnd-container ${preview ? 'preview' : 'edit'}`}>
        <div style={{ height: preview ? 33 : 0 }} />
        <FR preview={preview} displaySchema={displaySchema} />
      </div>
      <Modal
        visible={local.showModal}
        onOk={copySchema}
        onCancel={toggleModal}
        title="查看"
        okText="复制"
        cancelText="取消"
      >
        <div className="mt3">
          <TextArea
            style={{ fontSize: 12 }}
            value={displaySchemaString}
            autoSize={{ minRows: 10, maxRows: 30 }}
          />
        </div>
      </Modal>
      <Modal
        visible={local.showModal2}
        title="导入"
        okText="导入"
        cancelText="取消"
        onOk={importSchema}
        onCancel={toggleModal2}
      >
        <div className="mt3">
          <TextArea
            style={{ fontSize: 12 }}
            value={local.schemaForImport}
            placeholder="贴入需要导入的schema，模样可点击导出schema参考"
            onChange={onTextareaChange}
            autoSize={{ minRows: 10, maxRows: 30 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Canvas;
