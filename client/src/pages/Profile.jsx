import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';  
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateUserStart, updateUserfailure,updateUserSuccess, DeleteUserfailure, DeleteUserStart, DeleteUserSuccess, signOutUserfailure, signOutUserStart, signOutUserSuccess } from '../../Redux/user/userSlice';

export default function Profile() { 

  const dispatch= useDispatch() 
  const navigate =useNavigate()
  const fileRef = useRef(null);
  const { currentuser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        ); 

      }
    );
  };  

  const handleSubmit=async(e)=>{ 
    e.preventDefault() 
    console.log("formdata", formData)
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentuser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
    
        },
        body:JSON.stringify(formData)
      }) 

      const data = await res.json() 
      if(data.success===false){
        dispatch(updateUserfailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
    }
    catch(error){
      dispatch(updateUserfailure(error.message))
    }


  } 

  const handleDelete=async()=>{
    try {
      dispatch(DeleteUserStart())
      const res = await fetch(`/api/user/delete/${currentuser._id}`,
        {method:'DELETE'}
      ) 
      const data = await res.json() 
      if(data.success===false){
        dispatch(DeleteUserfailure(data.message)) 
        return
      } 
      dispatch(DeleteUserSuccess(data))
      navigate('/sign-in')
    }
    catch(error){
      dispatch(DeleteUserfailure(error.message))
    }
  }

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  } 

  const singOut=async()=>{
    try{
      dispatch(signOutUserStart())
      const res= await fetch('/api/auth/signout',) 
      const data = await res.json() 

      if(data.success===false){
        dispatch(DeleteUserfailure(data.message)) 
        return
      }
      dispatch(DeleteUserSuccess(data)) 
      navigate('/sign-in')

    } 
    catch(error){
      dispatch(DeleteUserfailure(error))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentuser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          id='username' 
          defaultValue={currentuser.username}
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentuser.email}
          className='border p-3 rounded-lg' 
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='password'
          id='password'
          // defaultValue={currentuser.password}
          className='border p-3 rounded-lg' 
          
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading ...':'Update'}
        </button> 
        <Link to='/create-listing' className='bg-green-700 text-white
         rounded-lg p-3 text-center uppercase hover:opacity-95'> Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDelete}>Delete account</span>
        <span className='text-red-700 cursor-pointer' onClick={singOut}>Sign out</span>
      </div> 
      {/* <p className='text-red-700 cursor-pointer'>{error ? error:''}</p> */}
    </div>
  );
}