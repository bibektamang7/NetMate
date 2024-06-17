import React, { FormEvent, useRef, useState, useId } from 'react';
import { Select, Input } from "../../components";
import Avatar from '../Avatar/Avatar';
import { IoCloudUpload } from 'react-icons/io5';
import defaultProfileImage from '../../assets/profileImg.png';
import { User } from '../../state/authSlice';
import { useCreatePostMutation } from '../../config/Api';



function CreatePost({
    setIsNewPostWidget,
    user
}: {
    setIsNewPostWidget: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null
}) {
    const id = useId();
    const [image, setImage] = useState<File | null>(null);
    const [visibility, setVisibility] = useState('public')
    const ref = useRef<HTMLInputElement>(null);
    const [createPost] = useCreatePostMutation();

    const handleImage = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handlePost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);

        const formData = new FormData(e.target as HTMLFormElement);
        await createPost(formData)
            .unwrap()
            .then(() => {
                alert("Post created successfully!");
                setIsNewPostWidget(false);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to create post");
            })

    };
    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center'>
            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md' onClick={() => setIsNewPostWidget(false)}></div>
            <form onSubmit={handlePost} className='relative w-[40%] dark:bg-darkCardBgColor bg-white rounded-md shadow-md p-4'>
                <div className='flex border-b-2 pb-2 mb-4'>
                    <h1 className='text-center flex-1 font-bold text-xl'>Create Post</h1>
                    <p
                        onClick={() => (setIsNewPostWidget(false))}
                        className='hover:cursor-pointer'
                    >X</p>
                </div>
                <div className='flex items-center gap-3 mb-4'>
                    <Avatar image={user?.profileImage} width='40px' height='40px' isRounded />
                    <div>
                        <h5>{ user?.fullName}</h5>
                        <Select
                            defaultValue="public"
                            name='visibility'
                            value={visibility}
                            className='-py-0'
                            onChange={(e) => setVisibility(e.target.value)}
                            options={["public", "private", "friends"]} />
                    </div>
                </div>
                <div>
                    <Input
                        name='content'
                        defaultValue=""
                        placeholder="what's on your mind?"
                        className='border-none'
                    />
                </div>
                <div className='mt-3'>
                    <div onClick={handleImage} className="w-full flex items-center justify-center h-[320px] hover:cursor-pointer border-2 rounded-lg border-black/20">
                        <div className='w-full h-full flex items-center justify-center flex-col'>
                            {image ? (
                                <img
                                    className='w-[400px] mx-auto h-full rounded-lg object-cover object-center'
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded product"
                                />
                            ) : (
                                <>
                                    <IoCloudUpload size="100px" color='#6366F8' className='mx-auto' />
                                    <p className='text-center font-medium tracking-tighter mt-1'>No file chosen, yet!</p>
                                </>
                            )}
                            <Input
                                id={id}
                                required
                                name="postImage"
                                onChange={handleImageChange}
                                hidden
                                type="file"
                                accept="image/*"
                                ref={ref}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type='submit'
                    className='text-white bg-blue-700 py-2 px-4 mt-4 w-full rounded-lg'
                >Upload</button>
            </form>
        </div>
    );
}

export default CreatePost;
