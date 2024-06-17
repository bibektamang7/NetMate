import React from 'react'
import { setMode } from '../../state/themeSlice'
import { useDispatch } from 'react-redux'
import { Icons } from '../../assets/Icons/Icon';
function ThemeBtn() {
    const dispatch = useDispatch();
  return (
    <div
      className='hover:cursor-pointer border-2 border-slate-200 rounded-full'
      onClick={() => (dispatch(setMode()))}
    >
      <Icons.MdDarkMode/>
    </div>
  )
}

export default ThemeBtn