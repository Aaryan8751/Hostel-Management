import * as ActionTypes from './actionTypes'

export const Employees = (state = {
    isLoading: true,
    errMess: null,
    employees: []
}, action) => {
    switch(action.type) {
        case ActionTypes.EMPLOYEES_SUCCESS:
            return {...state, isLoading: false, errMess: null, employees: action.payload};

        case ActionTypes.EMPLOYEES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, employees: []};
        
        case ActionTypes.EMPLOYEES_LOADING:
            return {...state, isLoading: true, errMess: [], employess: []};

        case ActionTypes.ADD_EMPLOYEE:
            var employee = action.payload;
            return {...state, employees: state.students.concat(employee)};

        default:
            return state;
    }
}