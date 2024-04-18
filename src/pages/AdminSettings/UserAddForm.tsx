import Button from '../../components/Button';
import Input from '../../components/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const AddUserForm = () => {
    return (
        <div className="form">
            <h2>Add new user</h2>
            <div className="inline-form centered-flex">
                <div>
                    <InputLabel htmlFor="first-name">First name</InputLabel>
                    <Input placeholder="First name" type="text" />
                </div>
                <div>
                    <InputLabel htmlFor="last-name">Last name</InputLabel>
                    <Input placeholder="Last name" type="text" />
                </div>
                <div>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input type="text" placeholder="Work email" />
                </div>
                <div>
                    <InputLabel htmlFor="email">Department</InputLabel>
                    <Select defaultValue={'SE'}>
                        <MenuItem value="SE">Engineering</MenuItem>
                        <MenuItem value="M">Marketing</MenuItem>
                        <MenuItem value="HR">Human Resourse</MenuItem>
                    </Select>
                </div>
                <div>
                    <InputLabel htmlFor="email">Position</InputLabel>
                    <Select placeholder="select position" defaultValue={'HR'}>
                        <MenuItem value="SE">Engineering</MenuItem>
                        <MenuItem value="M">Marketing</MenuItem>
                        <MenuItem value="HR">Human Resourse</MenuItem>
                    </Select>
                </div>
            </div>
            <Button sx={{ marginTop: '10px' }}>Save</Button>
        </div>
    );
};

export default AddUserForm;
