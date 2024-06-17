import React,{useId} from 'react'
import { Avatar } from '../../components'
import Input from '../../components/Input/Input'
import { Icons } from '../../assets/Icons/Icon'


function CreatePostWidget({
    setIsNewPostWidget,
    profileImage
}: {
        setIsNewPostWidget: React.Dispatch<React.SetStateAction<boolean>>,
        profileImage: string | undefined;
}) {
    const postTypeLists = [
        {
            title: "Image",
            Icon: {
                src: Icons.FcAddImage,
            },
        },
        {
            title: "Clip",
            Icon: {
                src: Icons.LuFileVideo,
                color: "red",
            },
        },
        {
            title: "Attachment",
            Icon: {
                src: Icons.TiAttachment,
                color: "green",
            },
        },
        {
            title: "Audio",
            Icon: {
                src: Icons.PiFileAudio,
                color: "yellow"
            },
        },
    ]
    const id = useId();
    return (
        <div className='my-4 shadow-md p-4 dark:bg-darkCardBgColor rounded-md'>
            <div className='flex items-center gap-2'>
                <Avatar image={profileImage} width='35px' height='32px' isRounded />
                <Input placeholder='write your comments' />
            </div>
            <div className='mt-5'>
                <div onClick={() => (setIsNewPostWidget(true))} className='hover:cursor-pointer flex items-center justify-between'>
                    {
                        postTypeLists.map(item => (
                            <div key={id}  className='flex items-center gap-1'>
                                <item.Icon.src color={item.Icon.color} size={`1.5rem`} />
                                <p>{ item.title}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreatePostWidget