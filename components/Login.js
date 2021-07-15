import Button from "@material-tailwind/react/Button";
import { signIn } from "next-auth/client"
import Image from 'next/image';
function Login() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Image
            src='https://links.papareact.com/1ui'
            height='300'
            width='550'
            objectFit='contain'
            />
            <Button
            color='blue'
            buttonType='filled'
            onClick={() => signIn()}
            ripple="light"
            className=' mt-10 w-44 text-md'>
            Login   
            </Button>
        </div>

    )
}

export default Login
