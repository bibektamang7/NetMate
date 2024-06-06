import React, { useId, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: string;
    className?: string;
    placeholder?: string;
    name?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    type = "text",
    className = "",
    placeholder = "",
    name = "",
    ...props
}) => {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`${className} dark:bg-darkCardBgColor px-3 py-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                type={type}
                placeholder={placeholder}
                name={name}
                {...props}
            />
        </div>
    );
}

export default Input;
