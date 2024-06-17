import React, { useId, InputHTMLAttributes, ForwardedRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: string;
    className?: string;
    placeholder?: string;
    name?: string;
    register?: UseFormRegister<any>;
    required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label,
    type = "text",
    className = "",
    placeholder = "",
    name = "",
    register,
    required = true,
    ...props
}, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    const registeredProps = register && name ? register(name, { required }) : {};

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
                name={name}
                ref={ref}
                className={`${className} dark:bg-darkCardBgColor dark:text-white px-3 py-1 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
                type={type}
                placeholder={placeholder}
                {...registeredProps}
                {...props}
            />
        </div>
    );
});

export default Input;
