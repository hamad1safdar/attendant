import { ChangeEvent, useState } from 'react';

export default function useInput(name: string, initialValue: string = '') {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        setValue(inputValue);
    };

    return { value, name, onChange };
}
