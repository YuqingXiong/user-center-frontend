import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, Image, message, Space, Tag} from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import {deleteUser, login, searchUsers, updateUser} from "@/services/ant-design-pro/api";
import {
  EditableProTable,
} from '@ant-design/pro-components';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
        <div>
          <Image src={record.avatarUrl} width={80}/>
        </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'Default'
      },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
      >
        编辑
      </a>,
      // <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      //   查看
      // </a>,
      // <TableDropdown
      //     key="actionGroup"
      //     onSelect={() => action?.reload()}
      //     menus={[
      //       { key: 'copy', name: '复制' },
      //       { key: 'delete', name: '删除' },
      //     ]}
      // />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
      <EditableProTable<API.CurrentUser>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params, sort, filter) => {
            console.log(sort, filter);
            await waitTime(2000);
            const userList = await searchUsers();
            return {
              data: userList,
            }
            // request<{
            //   data: CurrentUser[];
            // }>('https://proapi.azurewebsites.net/github/issues', {
            //   params,
            // });
          }}
          editable={{
            type: 'multiple',
            onSave: async (rowKey, data, row) => {
              try {
                console.log(rowKey, data);
                const res = await updateUser({
                  ...data,
                });
                if (res) {
                  message.success('修改成功');
                }
              }catch (error){
                message.error('修改失败');
              }
            },
            onDelete: async (rowKey, data) => {
              try {
                console.log(rowKey, data);
                const res = await deleteUser(
                  data.id
                );
                if (res) {
                  message.success('删除成功');
                }
              }catch (error){
                message.error('删除失败');
              }
            },
          }}


          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            defaultValue: {
              option: { fixed: 'right', disable: true },
            },
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="用户表格"
          toolBarRender={() => [
            // <Button
            //     key="button"
            //     icon={<PlusOutlined />}
            //     onClick={() => {
            //       actionRef.current?.reload();
            //
            //     }}
            //     type="primary"
            // >
            //   新建
            // </Button>,
          ]}
          // 新建按钮：未实现，因为注册新用户就是新建
          recordCreatorProps={{
            position: 'top',
            // 每次新增的时候需要Key
            record: {},
            style: {
              display: 'none',
            },
          }}
      />
  );
};
