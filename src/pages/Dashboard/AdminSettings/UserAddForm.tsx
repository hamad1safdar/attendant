import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { MenuItem } from '@mui/material';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useAddUser from './useAddUser';

import { DEPARTMENTS, POSITIONS } from './utils';

const AddUserForm = () => {
    const { values, handleInputChange, handleSelectChange, handleSaveClick } =
        useAddUser();

    return (
        <div className="form">
            <h2>Add new user</h2>
            <div className="inline-form centered-flex">
                <div>
                    <InputLabel htmlFor="first-name">First name</InputLabel>
                    <Input
                        name="firstName"
                        placeholder="First name"
                        type="text"
                        onChange={handleInputChange}
                        value={values.firstName}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="last-name">Last name</InputLabel>
                    <Input
                        name="lastName"
                        placeholder="Last name"
                        type="text"
                        onChange={handleInputChange}
                        value={values.lastName}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        type="text"
                        name="email"
                        placeholder="Work email"
                        onChange={handleInputChange}
                        value={values.email}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="email">Department</InputLabel>
                    <Select
                        name="department"
                        className="custom-select"
                        onChange={handleSelectChange}
                        value={values.department}
                    >
                        {DEPARTMENTS.map((department) => (
                            <MenuItem key={department} value={department}>
                                {department}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <InputLabel htmlFor="email">Position</InputLabel>
                    <Select
                        placeholder="select position"
                        className="custom-select"
                        value={values.position}
                        name="position"
                        onChange={handleSelectChange}
                    >
                        {POSITIONS[values.department].map((position) => (
                            <MenuItem key={position} value={position}>
                                {position}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <Button sx={{ marginTop: '10px' }} onClick={handleSaveClick}>
                Save
            </Button>
        </div>
    );
};

export default AddUserForm;
