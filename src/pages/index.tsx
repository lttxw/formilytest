import React, { useState } from 'react';
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { Button, Switch, Icon, Select, message } from 'antd';
import ExporForms from './ExportForms';
import MomentDemo from './momentDemo';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});

const schema = {
  type: 'object',
  properties: {
    aaa: {
      type: 'string',
      title: '输入框1',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    bbb: {
      type: 'string',
      title: '输入框2',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ccc: {
      type: 'string',
      title: '输入框3',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    ddd: {
      type: 'string',
      title: '输入框4',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
  },
};

const aa = ['operation', 'territoryName'];

const tableColumns = [
  {
    title: '操作',
    dataIndex: 'operation',
    width: 40,
  },
  {
    title: '项目所属部门',
    dataIndex: 'territoryName',
    width: 120,
  },
  {
    title: '项目编号',
    dataIndex: 'projectCode',
    width: 90,
  },
  {
    title: '项目',
    dataIndex: 'projectName',
    width: 120,
  },
  {
    title: '客户',
    dataIndex: 'partnerName',
    width: 120,
  },
  {
    title: '异常类型',
    dataIndex: 'abnormalType',
    width: 80,
  },
  {
    title: '任务编号',
    dataIndex: 'taskCode',
    width: 110,
  },
  {
    title: '任务',
    dataIndex: 'taskName',
    width: 200,
  },
  {
    title: '异常任务',
    dataIndex: 'abnormalPhase',
    width: 120,
  },
  {
    title: '任务上传截止日期',
    dataIndex: 'deadline',
    width: 120,
  },
  {
    title: '任务负责',
    dataIndex: 'responsibleName',
    width: 80,
  },
  {
    title: '最新任务状态',
    dataIndex: 'latestTaskStatus',
    width: 100,
  },
  {
    title: '推送时间',
    dataIndex: 'pushTime',
    width: 130,
  },
];

const initCol = tableColumns.map((i) => {
  const { width, render, ...reset } = i;
  return { ...reset, isExport: !aa.includes(i.dataIndex) };
});

const initExport = tableColumns.filter(
  (column) => !aa.includes(column.dataIndex),
);

// console.log(initCol);
// console.log(initExport);

function Demo() {
  const demo = [
    {
      title: '操作',
      dataIndex: 'operation',
      isExport: false,
    },
    {
      title: '项目所属部门',
      dataIndex: 'territoryName',
      isExport: false,
    },
  ];
  const [column, setColumn] = useState(demo);
  const handleChe = (checked, dataIndex) => {
    console.log(dataIndex);
    const up = column.map((i) =>
      i.dataIndex === dataIndex ? { ...i, isExport: checked } : i,
    );
    setColumn(up);
  };

  console.log('column-----', column);

  return (
    <div>
      <A column={column} handleChe={handleChe}></A>
    </div>
  );
}

function A(props) {
  const { column, handleChe } = props;
  return (
    <div>
      <B column={column} handleChe={handleChe}></B>
    </div>
  );
}

const { Option } = Select;

function B(props) {
  const { column, handleChe } = props;
  return (
    <>
      <div>
        {column.map((i) => (
          <div key={i.dataIndex}>
            <Switch
              checked={i.isExport}
              onChange={(checked) => handleChe(checked, i.dataIndex)}
            />
            <span>{i.title}</span>
          </div>
        ))}
        {/* <Button onClick={} /> */}
      </div>
    </>
  );
}

export default () => {
  const [selectV, setSelectV] = useState(undefined);

  const handleChange = (value, Option) => {
    console.log('value', value);
    if (Array.isArray(value) && value.length > 3) {
      message.info('超过3');
      setSelectV(value.slice(0, 3));
    }
  };
  const handleSearch = (form) => {
    const { drop, ch } = form.getFieldValue();
    console.log('11111', drop);
    console.log('22222', ch);
  };
  return (
    <>
      <ExporForms columns={initCol} />
      <Demo />
      <Icon type="down" />
      <Select
        value={selectV}
        style={{ width: 160 }}
        mode="tags"
        onChange={handleChange}
        showCheckbox
      >
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
        <Option value="5">5</Option>
        <Option value="6">6</Option>
      </Select>
      <MomentDemo handleSearch={handleSearch} />
    </>
  );
};
