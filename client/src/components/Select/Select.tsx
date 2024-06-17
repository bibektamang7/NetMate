import React, { useId, ForwardedRef, SelectHTMLAttributes } from 'react';

// Define the props interface
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: string[];
    label?: string;
    className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
    options = [],
    label,
    className = '',
    ...props
}, ref: ForwardedRef<HTMLSelectElement>) => {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1 pl-1' htmlFor={id}>
                    {label}
                </label>
            )}
            <select
                {...props}
                ref={ref}
                className={`${className} px-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200`}
                id={id}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
