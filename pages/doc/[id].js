import TextEditor from '../../components/TextEditor';
import {useRouter} from 'next/dist/client/router'
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { db } from '../../firebase.js';
import { useDocumentOnce} from 'react-firebase-hooks/firestore';
import {getSession, signOut, useSession} from "next-auth/client";
import Login from '../../components/Login';

function Doc() {
    const [session] = useSession();
    const router = useRouter();
    if(!session) return <Login/>;
    const {id} = router.query;
    const [snapshot, loadingSnapshot]= useDocumentOnce(
        db.collection('userDocs')
        .doc(session.user.email).collection
        ('docs').doc(id)
    );
    
    
 
    return (
        <div>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span onClick={()=>router.push('/')}>
                    <Icon name='description' size='5xl' color='blue' className='cursor-pointer'/>
                </span>

                <div className='flex flex-col flex-grow px-2'>
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className='flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600'>
                        <p className='option'>File</p>
                        <p className='option'>Edit</p>
                        <p className='option'>View</p>
                        <p className='option'>Insert</p>
                        <p className='option'>Format</p>
                        <p className='option'>Tools</p>
                        <p className='option'>Add-ons</p>
                        <p className='option'>Help</p>
                    </div>
                </div>

                <Button
                color='lightBlue'
                buttonType='filled'
                className='hidden md:inline-flex h-10'
                rounded={false}
                block={false}
                iconOnly={false}
                ripple='light'
                >
                    <Icon name='people' size='md' />Share
                </Button>

                <img src={session.user.image} alt='' className='cursor-pointer rounded-full h-10 w-10 ml-2'/>
            </header>

            <TextEditor/>
        </div>
    )
}

export default Doc

export async function getServerSideProps(context) {
    const session =await getSession(context);

    return {
        props: {
            session,
        }
    }
}
