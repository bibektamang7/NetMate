import React from 'react'

function Avatar(
  {
    image,
    isRounded = true,
    width,
    height
  }: {
    image: string | undefined,
    width: string,
    isRounded?: boolean,
    height: string,
  }
) {

  return (
    <div style={{ width, height }} className={``}>
      <img
        src={image}
        className={`w-full h-full object-cover ${isRounded ? "rounded-full" : "rounded-lg"}`} alt="" />
    </div>
  )
}

export default Avatar