const initialState = {
	projectEdit: {
		"id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "<h1>Test description</h1>",
        "categoryId": "3"
	},
};

export const ProjectReducer =  (state = initialState, action) => {
	switch (action.type) {
        case 'EDIT_PROJECT':
            state.projectEdit =action.projectEditModel
            return {...state}
		default:
			return state;
            
	}
};
