import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employeeList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setEmployees(state, action) {
            state.employeeList = action.payload;
        },
        addEmployee(state, action) {
            state.employeeList.push(action.payload);
        },
        updateEmployee(state, action) {
            const index = state.employeeList.findIndex(employee => employee._id === action.payload._id);
            if (index !== -1) {
                state.employeeList[index] = action.payload;
            }
        },
        deleteEmployee(state, action) {
            state.employeeList = state.employeeList.filter(employee => employee._id !== action.payload);
        },
    },
});

export const { setEmployees, addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
