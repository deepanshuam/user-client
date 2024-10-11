// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './EmployeSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
