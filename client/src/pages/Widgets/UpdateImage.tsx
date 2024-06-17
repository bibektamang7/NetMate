import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Input } from "../../components"
import { useUpdateCoverImageMutation, useUpdateProfileImageMutation } from '../../config/Api';
import { User, setUser } from '../../state/authSlice';


function CoverImage({ user, isProfile = true }: { user: User | null, isProfile: boolean }) {
    const [image, setImage] = useState<File | null>(null);
    const dispatch = useDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const [updateCoverImage, { isLoading }] = useUpdateCoverImageMutation();
    const [updateProfileImage] = useUpdateProfileImageMutation();
    const handleCoverImage = () => {
        if (ref.current) {
            ref.current.click();
        }
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpdateImageChange = async () => {
        if (!image) return;
        const formData = new FormData();
        formData.append(!isProfile ? "coverImage" : "profileImage", image);
        await (!isProfile ? updateCoverImage(formData) : updateProfileImage(formData))
            .unwrap()
            .then((response) => {
                dispatch(setUser({ data: response.data }));
                setImage(null);
            })
            .catch((error) => {
                console.log(error);

            })
    }

    return (
        <>
            {image &&
                <div className='absolute z-20 w-full left-0 bg-slate-500 text-right px-20 py-1'>
                    <button onClick={() => setImage(null)} className='py-1 mr-4 rounded-md'>Cancel</button>
                    <button onClick={handleUpdateImageChange} className='py-1 px-2 rounded-md bg-blue-500'>Save Changes</button>
                </div>
            }
            <div className={`relative ${isProfile ? "w-[150px] mx-auto h-[150px]" : ""} h-[200px]`}>
                {image ?
                    <div className='w-full h-full'>
                        <img
                            src={URL.createObjectURL(image)}
                            className={`w-full h-full object-cover ${isProfile && "rounded-full"}`}
                            alt={isProfile ? "profileImage" : "coverImage"}
                        />
                    </div>
                    : <img
                        src={!isProfile ? user?.coverImage : user?.profilePicture}
                        className={`w-full h-full object-cover ${isProfile && "rounded-full"}`}
                        alt="coverImage"
                    />
                }
                {
                    !image && <div onClick={handleCoverImage} className={`hover:cursor-pointer text-center ${isProfile ? "" : "absolute top-0 right-0"}`}>
                        <p className='bg-white text-black px-4 py-1 rounded-md'>{!isProfile ? "Edit cover Photo" : "Edit Profile"}</p>
                        <Input
                            ref={ref}
                            required
                            name={!isProfile ? "coverImage" : "profileImage"}
                            onChange={handleImageChange}
                            hidden
                            type="file"
                            accept="image/*"
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default CoverImage