// redux/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Async thunk for fetching employee data
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('http://localhost:8000/api/getemployees');
  return response.data.data;
});

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:8000/api/updateemployees/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  toast.success(response.data.message);
  return response.data.payload;
});

// Async thunk for creating a new employee
export const createEmployee = createAsyncThunk('employees/createEmployee', async (formData) => {
  const response = await axios.post('http://localhost:8000/api/employees', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  toast.success(response.data.message);
  return response.data.payload;
});

// Slice definition
const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
      })
      // Update employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      // Create employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      });
  },
});

export default employeeSlice.reducer;
