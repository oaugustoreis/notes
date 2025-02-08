"use client"; // 
import { useEffect, useState } from 'react';
import Profile from './components/Profile';
import { useRouter } from 'next/navigation';
import Homepage from './home/page';
import NavBar from './components/NavBar';
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateNote from "./components/CreateNote";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('profile');
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
        setUser(user.uid);
      } else {
        router.push('/login');
      }
    });
  }, [])


  const renderComponent = () => {
    switch (activeComponent) {
      case 'profile':
        return <Profile user={user} setData={setData} data={data} />;
      case 'home':
        return <Homepage />;
    }
  };


  return (
    <div className='flex flex-col items-center justify-around h-screen'>
      {renderComponent()}
      <div className='fixed bottom-1 w-80 right-5/6'>
        <CreateNote user={user} setData={setData} />
        <NavBar setActiveComponent={setActiveComponent} />
      </div>
    </div>
  );
}