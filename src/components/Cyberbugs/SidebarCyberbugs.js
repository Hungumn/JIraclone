import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
    BarsOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
const { Header, Sider, Content } = Layout;

export default function SidebarCyberbugs() {
	const [state, setState] = useState({
		collapsed: false,
	});
	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};

	return (
		<div>
			<Sider trigger={null} collapsible collapsed={state.collapsed} style={{height:'100%'}}>
                <div className='text-right pr-2' onClick={toggle} style={{cursor:'pointer', fontSize:'20px',color:'#fff'}} >
                    <BarsOutlined/>
                </div>
                <div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <PlusOutlined />,
							label: 'Create Issues',
						},
						{
							key: '2',
							icon: <SearchOutlined />,
							label: 'Search',
						},
					]}
				/>
			</Sider>
		</div>
	);
}
