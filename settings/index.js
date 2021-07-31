export const elements = [
    {
        text: '输入框',
        name: 'input',
        schema: {
            title: '输入框',
            type: 'string',
            'y-setting-name': 'input',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        setting: {
            'x-component-props[allowClear]': {
                title: '是否点击删除图标清空内容',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
            },
            minLength: {
                title: '最小长度',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
            },
            maxLength: {
                title: '最大长度',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
            },
        },
    },
    {
        text: '文本域',
        name: 'textarea',
        schema: {
            title: '文本域',
            type: 'string',
            'y-setting-name': 'textarea',
            'x-decorator': 'FormItem',
            'x-component': 'Input.TextArea',
        },
        setting: {
            'x-component-props[defaultValue]': {
                title: '默认值',
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
            },
            'x-component-props[allowClear]': {
                title: '是否点击删除图标清空内容',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
            },
            'x-component-props[autoSize]': {
                title: '自适应内容高度',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
            },
        },
    },
    {
        text: '数字输入框',
        name: 'numberPicker',
        schema: {
            title: '数字输入框',
            type: 'string',
            'y-setting-name': 'numberPicker',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
        },
        setting: {
            minimum: {
                title: '最小值',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
            },
            maximum: {
                title: '最大值',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'NumberPicker',
            },
        },
    },
    {
        text: '开关',
        name: 'switch',
        schema: {
            title: '开关',
            type: 'string',
            'y-setting-name': 'switch',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
        },
        setting: {
            'x-component-props[checked]': {
                title: '指定是否选中',
                type: 'number',
                'x-decorator': 'FormItem',
                'x-component': 'Switch',
            },
        },
    },
    {
        text: '单选',
        name: 'radiogroup',
        schema: {
            title: '单选',
            type: 'number',
            'y-setting-name': 'radiogroup',
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
        },
        setting: {
            enum: {
                type: 'string',
                title: '选项配置',
                'x-decorator': 'FormItem',
                'x-component': 'AutoSelect',
            },
        },
    },
    {
        text: '日期选择',
        name: 'datePicker',
        schema: {
            title: '日期选择',
            type: 'number',
            'y-setting-name': 'datePicker',
            'x-decorator': 'FormItem',
            'x-component': 'DatePicker',
        },
        setting: {
            'x-component-props[picker]': {
                type: 'number',
                title: '周期选择',
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                enum: [
                    { label: '默认', value: '' },
                    { label: '周选择', value: 'week' },
                    { label: '月选择', value: 'month' },
                    { label: '财年选择', value: 'quarter' },
                    { label: '年选择', value: 'year' },
                ],
            },
        },
    },
    {
        text: '同步数据源下拉',
        name: 'select',
        schema: {
            title: '同步数据源下拉',
            type: 'string',
            'y-setting-name': 'select',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
        },
        setting: {
            enum: {
                type: 'string',
                title: '选项配置',
                'x-decorator': 'FormItem',
                'x-component': 'AutoSelect',
            },
        },
    },
]

export const defaultSettings = [
    {
        title: '基础组件',
        widgets: elements,
        show: true,
        useCommon: true, // TODO: 是否将common
    },
]

export const defaultGlobalSettings = {
    type: 'object',
    properties: {
        column: {
            type: 'number',
            title: '整体布局',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [
                { label: '一行一列', value: 1 },
                { label: '一行二列', value: 2 },
                { label: '一行三列', value: 3 },
                { label: '一行四列', value: 4 },
                { label: '一行五列', value: 5 },
            ],
        },
        layout: {
            type: 'string',
            title: '标签展示模式',
            enum: [
                {
                    label: '同行',
                    value: 'horizontal',
                },
                {
                    label: '单独一行',
                    value: 'vertical',
                },
            ],
            'x-decorator': 'FormItem',
            'x-component': 'Radio.Group',
        },
        labelWidth: {
            title: 'label宽度',
            type: 'number',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
        },
    },
}

export const defaultCommonSettings = {
    type: 'object',
    properties: {
        $id: {
            type: 'string',
            title: 'ID',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        title: {
            type: 'string',
            title: '标题',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
        },
        required: {
            title: '是否必填',
            type: 'number',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
        },
    },
}
