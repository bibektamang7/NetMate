import React from 'react'

function Avatar(
    {
        image, isRounded = true,
        width, height }: {
            image: string,
            width: string,
            isRounded?: boolean,
            height: string,
        }
) {
  return (
      <div className={`${isRounded ? "rounded-full" : "rounded-lg"}`}>
      <img
        src={image}
        style={{width,height}}
        className={`object-contain`} alt="" />
    </div>
  )
}

export default Avatar