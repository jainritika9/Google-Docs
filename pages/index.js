import Head from 'next/head'
import Header from '../components/Header.js';
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from 'next/image';
import {getSession, useSession} from 'next-auth/client';
import Login from '../components/Login.js';
import DocumentRow from '../components/DocumentRow.js';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import {useState} from 'react'
import {useRouter} from 'next/dist/client/router'
import firebase from 'firebase'
import { db } from '../firebase.js';
import {
  useCollectionOnce,
} from 'react-firebase-hooks/firestore';

export default function Home() {
  const [session] =useSession();
  

  if(!session) return <Login/>;
  const [showModal,setShowModal]= useState(false);
  const [input, setInput]=useState('');
  const [snapshot] = useCollectionOnce(db.collection('userDocs').doc(session.user.email).collection('docs').orderBy("timestamp",'desc'));
  const router= useRouter();
  const {id} = router.query;
  const createDocument = () =>{
      if(!input) return;

      db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setInput(input);
      setShowModal(false);
      router.push(`/doc/${id}`)
  };
  const modal= (
    <Modal 
    size='sm'
    active={showModal}
    toggler={()=>setShowModal(false)}
    >
     <ModalBody>
       <input 
       value={input} 
       onChange={(e)=>setInput(e.target.value)} 
       type='text'
       className='outline-none w-full text-gray-700'
       placeholder='Enter name of the document..'
       onKeyDown={(e)=>e.key=== "Enter" && createDocument()}/>
    </ModalBody> 
    <ModalFooter>
      <Button color='blue ' buttonType='link' onClick={(e)=>setShowModal(false)} ripple='dark'>Cancel</Button>
      <Button color='blue' onClick={()=>createDocument()} ripple='light'>Create</Button>
    </ModalFooter>
    </Modal>
  )
  return (
    <div >
      <Head>
        <title>Google-Docs</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header/>
      {modal}

      <section className='bg-[#F8F9FA] pb-10 px-10 '>
        <div className='max-w-3xl mx-auto'>
          <div className='flex item-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
            <Button
             color='gray'
             buttonType='outline'
             iconOnly={true}
             ripple='dark'
             className='border-0'
            >
              <Icon name='more_vert' size='3xl'/>
            </Button>
          </div>
          <div>
            <div onClick={()=>setShowModal(true)} className='relative h-40 w-32 border-2 cursor-pointer hover:border-blue-200 shadow-md '>
              <Image src='https://links.papareact.com/pju' layout='fill' />
            </div>
            
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl py-8 mx-auto text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <Icon name='folder' size='3xl' color='gray'/> 
          </div>
        

        {snapshot?.docs.map(doc=>(
          <DocumentRow 
            key={doc.id}
            id={doc.id}
            fileName ={doc.data().fileName}
            date={doc.data().timestamp}/>
        ))}
        </div>
      </section>
    </div>
  );
}


export async function getServerSideProps(context){
  const session = await getSession(context);
  
  return {
    props: {
      session,
    }
  };
}