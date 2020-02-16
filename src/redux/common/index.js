

export const key = 'default';

const initalState = {
    projectName: '北极星Bi',
    auth:{
      "uid": '',
       "permissions": [
       ],
       "role": "",
       "roleType": '',
       "userName": ""
    },
    token:'',
    responsive:''
};

const SAVE_AUTHINFO = 'saveAuthInfo'

export const projectDefault = (state = initalState, action) => {
    switch (action.type) {
      case SAVE_AUTHINFO:

        state.auth = action.data;

        return { ...state }
        default:
            return { ...state }
    }
}

export default projectDefault

export const saveAuthInfo = (data = {}) => {

    return dispatch => {
        dispatch({type:SAVE_AUTHINFO , data: data})
    }
}
