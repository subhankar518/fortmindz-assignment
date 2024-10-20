import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AddAndUpdateModal from './AddAndUpdateModal';
import { setEmployees, addEmployee, updateEmployee, deleteEmployee } from '../store/employeeSlice';
import axios from 'axios';
import { getAllEmployeeUrl, addNewEmployeeUrl, updateEmployeeUrl, removeEmployeeUrl } from '../Network/API';

export const EmployeeList = () => {
    const dispatch = useDispatch();
    const employeeList = useSelector((state) => state.employees.employeeList);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleModalClose = () => {
        setOpenUpdateModal(false);
        setSelectedEmployee(null);
    };

    const getAllEmployee = async () => {
        try {
            const response = await axios.get(getAllEmployeeUrl);
            if (response?.data?.data) {
                dispatch(setEmployees(response.data.data));
            } else {
                console.error(response?.data);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleAddAndUpdate = async (employee) => {
        try {
            let response;
            if (employee._id) {
                response = await axios.put(`${updateEmployeeUrl}${employee._id}`, employee);
                dispatch(updateEmployee(response.data)); 
            } else {
                response = await axios.post(addNewEmployeeUrl, employee);
                dispatch(addEmployee(response.data)); 
            }
            await getAllEmployee();
            handleModalClose();
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await axios.delete(`${removeEmployeeUrl}${employeeId}`);
            dispatch(deleteEmployee(employeeId)); 
            // await getAllEmployee();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const addAndUpdateEmployee = (employee = null) => {
        setSelectedEmployee(employee);
        setOpenUpdateModal(true);
    };

    useEffect(() => {
        getAllEmployee();
    }, []); 

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Employee List</h2>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => addAndUpdateEmployee()}
                className="mr-2 mb-4"
            >
                Add Employee
            </Button>
            <TableContainer component={Paper} className="shadow-md rounded-lg">
                <Table className="min-w-full">
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell className="font-semibold">Name</TableCell>
                            <TableCell className="font-semibold">Email</TableCell>
                            <TableCell className="font-semibold">Contact</TableCell>
                            <TableCell className="font-semibold">Salary</TableCell>
                            <TableCell className="font-semibold">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeList.map((employee) => (
                            <TableRow key={employee?._id} className="hover:bg-gray-100">
                                <TableCell className="py-2">{employee?.fullName}</TableCell>
                                <TableCell className="py-2">{employee?.email}</TableCell>
                                <TableCell className="py-2">{employee?.phone}</TableCell>
                                <TableCell className="py-2">{employee?.salary}</TableCell>
                                <TableCell className="py-2">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => addAndUpdateEmployee(employee)}
                                        className="mr-2"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteEmployee(employee?._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openUpdateModal && (
                <AddAndUpdateModal
                    openUpdateModal={openUpdateModal}
                    handleModalClose={handleModalClose}
                    employee={selectedEmployee}
                    handleAddAndUpdate={handleAddAndUpdate}
                />
            )}
        </div>
    );
};

export default EmployeeList;
