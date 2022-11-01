import React from 'react'
import { Radio, Select } from 'antd';

const { Option } = Select;

export default function FormCreatetask() {
  return (
    <div className='container'>
        <div className='form-group'>
            <p>Project</p>
            <Select
                defaultValue="HangZhou"
                style={{ width: 120,}}
                dropdownMatchSelectWidth={false}
                placement='topLeft'
            >
                <Option value="HangZhou">HangZhou #310000</Option>
                <Option value="NingBo">NingBo #315000</Option>
                <Option value="WenZhou">WenZhou #325000</Option>
            </Select>
        </div>
    </div>
  )
}
