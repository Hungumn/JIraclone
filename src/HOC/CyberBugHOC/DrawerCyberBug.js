import { PlusOutlined } from '@ant-design/icons';
import {
	Button,
	Col,
	DatePicker,
	Drawer,
	Form,
	Input,
	Row,
	Select,
	Space,
} from 'antd';
import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../redux/constants/Cyberbugs/Cyberbugs';

export default function DrawerCyberBug(props) {
	const {open,ComponentContentDrawer,callBackSubmit} = useSelector(state=>state.drawerReducer)
	console.log('state drawer', open)
	const dispatch = useDispatch();
	const showDrawer = ()=>{
		dispatch({
			type:OPEN_DRAWER,
		})
	}
	const onClose = () => {
		dispatch({
			type:CLOSE_DRAWER,
		})
	};
	return (
		<>
			<Drawer
				title="Create a new account"
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{
					paddingBottom: 80,
				}}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={callBackSubmit} type="primary">
							Submit
						</Button>
					</Space>
				}
			>
				{ComponentContentDrawer}
			</Drawer>
		</>
	);
}
