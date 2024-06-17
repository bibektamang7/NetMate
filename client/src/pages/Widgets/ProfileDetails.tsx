import React, { SetStateAction } from 'react'
import ProfileImage from "./UpdateImage"
import { User,setUser } from '../../state/authSlice'
import { Input } from '../../components'
import { useUpdateProfileMutation } from '../../config/Api'
import { useDispatch } from 'react-redux'


function ProfileDetails({ user, setIsEdit }: { user: User | null, setIsEdit: React.Dispatch<SetStateAction<boolean>> }) {
    const dispatch = useDispatch();
    const [updateProfile] = useUpdateProfileMutation();
    const handleUpdateProfile = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            username: formData.get("username"),
            bio: formData.get("bio"),
            fullName: formData.get("fullName")
        }
        
        await updateProfile(JSON.stringify(data))
            .unwrap()
            .then((response) => {
                dispatch(setUser({ data: response.data }));
                setIsEdit(false);
             })
            .catch((error) => { 
                console.log(error);
                
            })
    }

    return (
        <div className='z-30 w-full flex h-full fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md'>
            <div className='w-[60%] transform m-auto dark:bg-darkCardBgColor p-10'>
                <div className='flex items-center mb-12'>
                    <h3 className='flex-1 text-center font-bold text-xl'>Edit profile</h3>
                    <button onClick={() => setIsEdit(false)}>X</button>
                </div>
                <div>
                    <div className='relative'>
                        <ProfileImage user={user} isProfile />
                    </div>
                    <form onSubmit={handleUpdateProfile} className='flex flex-col gap-10 mt-10'>
                        <div className='border-b-2 pb-2'>
                            <Input
                                label='Bio'
                                name='bio'
                                defaultValue={user?.bio || "Describe yourself"}
                                className='border-none dark:bg-darkCardBgColor'
                            />
                        </div>
                        <div className='flex items-center justify-between border-b-2 pb-2'>
                            <div className='flex flex-col'>
                                <Input
                                    label='Username'
                                    defaultValue={user?.username}
                                    className='border-none'
                                    name='username'
                                />
                            </div>
                        </div>
                        <div className='flex items-center justify-between border-b-2 pb-2'>
                            <div className='flex flex-col'>
                                <Input
                                    label='Fullname'
                                    defaultValue={`${user?.firstName} ${user?.lastName} `}
                                    name='fullName'
                                    className='border-none'
                                />
                            </div>
                        </div>
                        <div className='flex justify-end items-center gap-5'>
                            <button onClick={() => setIsEdit(false)}>Cancel</button>
                            <button type='submit' className='hover:bg-blue-600/80 bg-blue-600 px-4 py-1 rounded-md'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails