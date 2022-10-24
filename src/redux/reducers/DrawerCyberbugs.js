import {
	CLOSE_DRAWER,
	OPEN_DRAWER,
	OPEN_FORM_EDIT_PROJECT,
} from '../constants/Cyberbugs/Cyberbugs';
import React from 'react';
const initialState = {
	open: false,
	ComponentContentDrawer: <p>Default Content</p>,
	callBackSubmit: (propsValue) => {
		alert('click demo');
	},
};

export const drawerReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER:
			return { ...state, open: true };
		case CLOSE_DRAWER:
			return { ...state, open: false };
		case OPEN_FORM_EDIT_PROJECT:
			return {
				...state,
				open: true,
				ComponentContentDrawer: action.Component,
			};
		case 'SET_SUBMIT_EDIT_PROJECT': {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}
		default:
			return state;
	}
};
