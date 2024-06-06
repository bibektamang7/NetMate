import React from 'react'

function Container({children}: {children: React.ReactNode}) {
    return <div className='dark:bg-darkBgColor dark:text-darkFontColor w-full max-w-7xl min-h-screen mx-auto'>{children}</div>;
}

export default Container