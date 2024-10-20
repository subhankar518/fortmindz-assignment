import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm, Controller } from 'react-hook-form';

const AddAndUpdateModal = ({ openUpdateModal, handleModalClose, employee , handleAddAndUpdate }) => {
    const { handleSubmit, control, setValue } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (employee) {
            setValue('email', employee?.email);
            setValue('age', employee?.age);
            setValue('salary', employee?.salary);
            setValue('fullName', employee?.fullName);
            setValue('phone', employee?.phone);
            setValue('image', employee?.image);
            setImagePreview(employee?.image);
        }
    }, [employee, setValue]);

    const onSubmit =async (data) => {
        const updatedEmployeeobject={
          _id: employee?._id,
          fullName: data?.fullName,
          email: data?.email,
          age: data?.age,
          image: data?.image ? data?.image : "",
          phone: data?.phone,
          salary: data?.salary
        }
        await handleAddAndUpdate(updatedEmployeeobject)
        
    };

    return (
        <Modal show={openUpdateModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <div className="text-center mb-4">
                    <img
                        src={imagePreview || 'https://avatar.iran.liara.run/public'}
                        alt="Employee"
                        className="w-24 h-24 rounded-full mx-auto"
                    />
                </div>
                <Modal.Title>{employee?.fullName ? `${employee?.fullName}` : 'Add Employee'}</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field: { onChange } }) => (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setImagePreview(imageUrl);
                                            onChange(imageUrl);
                                        } else {
                                            setImagePreview(null);
                                            onChange(null);
                                        }
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <Controller
                            control={control}
                            name="fullName"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                        <Controller
                            control={control}
                            name="age"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="number"
                                    placeholder="Age"
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone No.</label>
                        <Controller
                            control={control}
                            name="phone"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="text"
                                    placeholder="Phone No."
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Salary</label>
                        <Controller
                            control={control}
                            name="salary"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    type="number"
                                    placeholder="Salary"
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        {employee === null ? 'Add' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default AddAndUpdateModal;
