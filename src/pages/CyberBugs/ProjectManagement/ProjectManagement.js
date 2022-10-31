import React, { useState, useEffect } from 'react';
import {
	Table,
	Tag,
	Space,
	Button,
	Avatar,
	Image,
	message,
	Popconfirm,
	Popover,
	AutoComplete,
} from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { FormOutlined, DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_USER_PROJECT_API, GET_LIST_PROJECT_SAGA, GET_USER_API, OPEN_DRAWER, REMOVE_USER_PROJECT_API } from '../../../redux/constants/Cyberbugs/Cyberbugs';
import FormEditProject from '../../../components/Form/FormEditProject';
import {useCallback} from 'react';
import _debounce from 'lodash/debounce';
import { NavLink } from 'react-router-dom';

const { Column, ColumnGroup } = Table;


export default function ProjectManagement(props) {
	//Lấy dữ liệu từ reducer về component
	const projectList = useSelector(
		(state) => state.ProjectCyberBugsReducer.projectList
	);

	const {userSearch} = useSelector(state=> state.UserLoginCyberBugsReducer)
	const [value,SetValue]  = useState('')
	//Sử dụng useDispatch để gọi action
	const dispatch = useDispatch();
	const [state, setState] = useState({
		filteredInfo: null,
		sortedInfo: null,
	});
	
	const handleDebounceFn =(value) => {
		dispatch({
			type: GET_USER_API,
			keyWord: value
		})
	}
	const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
	useEffect(() => {
		dispatch({ type: GET_LIST_PROJECT_SAGA });
	}, [dispatch]);

	const handleChange = (pagination, filters, sorter) => {
		console.log('Various parameters', pagination, filters, sorter);
		setState({
			filteredInfo: filters,
			sortedInfo: sorter,
		});
	};

	const clearFilters = () => {
		setState({ filteredInfo: null });
	};

	const clearAll = () => {
		setState({
			filteredInfo: null,
			sortedInfo: null,
		});
	};

	const setAgeSort = () => {
		setState({
			sortedInfo: {
				order: 'descend',
				columnKey: 'age',
			},
		});
	};

	let { sortedInfo, filteredInfo } = state;
	sortedInfo = sortedInfo || {};
	filteredInfo = filteredInfo || {};
	const columns = [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			sorter: (item2, item1) => {
				return item2.id - item1.id;
			},
			sortDirections: ['descend'],
		},
		{
			title: 'projectName',
			dataIndex: 'projectName',
			key: 'projectName',
			render:(text,record,index)=>{
				return <NavLink to={`project-Detail/${record.id}`}>{text}</NavLink>
			},
			sorter: (item2, item1) => {
				let projectName1 = item1.projectName?.trim().toLowerCase();
				let projectName2 = item2.projectName?.trim().toLowerCase();
				if (projectName2 < projectName1) {
					return -1;
				}
				return 1;
			},
		},

		{
			title: 'category',
			dataIndex: 'categoryName',
			key: 'categoryName',
			sorter: (item2, item1) => {
				let categoryName1 = item1.categoryName?.trim().toLowerCase();
				let categoryName2 = item2.categoryName?.trim().toLowerCase();
				if (categoryName2 < categoryName1) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: 'creator',
			// dataIndex: 'creator',
			key: 'creator',
			render: (text, record, index) => {
				return <Tag color="green">{record.creator?.name}</Tag>;
			},
			sorter: (item2, item1) => {
				let creator1 = item1.creator?.name.trim().toLowerCase();
				let creator2 = item2.creator?.name.trim().toLowerCase();
				if (creator2 < creator1) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: 'members',
			key: 'members',
			render: (text, record, index) => {
				return (
					<div>
						{record.members?.slice(0,3).map((member, index) => {
							return (
								<Popover key={index} placement="bottom" title="Members" trigger="click" content={() => {
									return <table className="table">
										<thead>
											<tr>
												<th>Id</th>
												<th>avatar</th>
												<th>name</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{record.members?.map((item, index) => {
												return <tr key={index}>
													<td>{item.userId}</td>
													<td><img src={item.avatar} width="30" height="30" style={{borderRadius:'15px'}} /></td>
													<td>{item.name}</td>
													<td>
														<button onClick={()=>{
															dispatch({
																type:REMOVE_USER_PROJECT_API,
																userProject:{
																	userId:item.userId,
																	projectId:record.id
																}
															})
														}} className="btn btn-danger" style={{borderRadius:'50%'}}>X</button>
													</td>
												</tr>
											})}
										</tbody>
									</table>
								}}>
									<Avatar key={index} src={member.avatar} />
								</Popover>
							)
						})}
						{record.members?.length > 3 ? <Avatar>...</Avatar> :''}
						<Popover 
						placement="top" 
						title={'Add-User'} 
						content={()=>{
							return (
                                <AutoComplete 
								style={{width:'100%'}} 
								onSearch={(value) =>{
									debounceFn(value)
								}} 
								options={userSearch?.map((user,index)=>{
									return {label:user.name,value:user.userId.toString()}
								})}
								onSelect={(valueSelect,option)=> {
									SetValue(option.label)
									dispatch({
										type:ADD_USER_PROJECT_API,
										userProject:{
											projectId:record.id,
											userId:valueSelect
										}
									})
								}}
								value={value}
								onChange={(text)=>{SetValue(text)}}
								/>)
							}} 
						trigger="click">
							<Button style={{marginLeft:'0.5rem'}} type="dashed" shape="circle" icon={<PlusOutlined />}></Button>
						</Popover>
					</div>
				);
			},
		},
		{
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (text, record, index) => {
				return (
					<div>
						<button
							className="btn mr-2 btn-primary"
							onClick={() => {
								const action = {
									type: 'OPEN_FORM_EDIT_PROJECT',
									Component: <FormEditProject />,
								};
								dispatch(action);
								const actionEditProject = {
									type: 'EDIT_PROJECT',
									projectEditModel: record,
								};
								dispatch(actionEditProject);
							}}
						>
							<FormOutlined style={{ fontSize: 17 }} />
						</button>
						<Popconfirm
							title="Are you sure to delete this Project?"
							onConfirm={() => {
								dispatch({
									type: 'DELETE_PROJECT_SAGA',
									idProject: record.id,
								});
							}}
							onCancel={() => {}}
							okText="Yes"
							cancelText="No"
						>
							<button className="btn btn-danger">
								<DeleteOutlined style={{ fontSize: 17 }} />
							</button>
						</Popconfirm>
					</div>
				);
			},
		},
	];
	return (
		<div className="container m-5">
			<h3>Project management</h3>
			<Space style={{ marginBottom: 16 }}>
				<Button onClick={setAgeSort}>Sort age</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table
				columns={columns}
				rowKey={'id'}
				dataSource={projectList}
				onChange={handleChange}
			/>
		</div>
	);
}
