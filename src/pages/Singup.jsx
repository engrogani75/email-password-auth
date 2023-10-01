import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firbase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Singup = () => {
  const [userError, setUserError] = useState("");
  const [userSuccsess, setUserSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const auth = getAuth(app);

  const fromHandleSubmit = (e) => {
    setUserError("");
    setUserSuccess('');

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accefted = e.target.terms.checked;
    console.log(accefted);

   
    createUserWithEmailAndPassword(auth, email, password)
    
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setUserSuccess('your singup seccefully')
      })

      .catch((error) => {
        if (password.length < 6) {
            setUserError('pls give at least 6 character') 
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setUserError('pls give at least one upercase') 
            return;
        }else if(!accefted){
            setUserError('Pls cheked our terms and condition')  
        }
        else{ const errorCode = error.code;
            const errorMessage = error.message;
            setUserError(errorCode, errorMessage);
        }
       
      });
  };
  return (
    <>
    <div className="flex justify-center flex-col items-center">
      <h1 className="mb-6 text-2xl">Pls Sign Up!</h1>
      <form className="flex flex-col w-1/2" onSubmit={fromHandleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="px-4 py-2 mb-6"
        />
        <input
          type={showPassword? "text": "password"}
          name="password"
          placeholder="Password"
          className="px-4 py-2 mb-6"
          required
        />
        <span onClick={()=>setShowPassword(!showPassword)} className="relative bottom-12 left-[400px] cursor-pointer">
          {
            showPassword? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
          }
        </span>

       <div>
       <input type="checkbox" name="terms" id="terms"></input>

        <lavel className="ml-4">Terams and Conditions</lavel>

       </div>
        <button className="bg-pink-700 rounded p-4">Sign Up</button>
      </form>
      {
        userError && <h1 className="text-xl text-red-800">{userError}</h1>
      }

      {
        userSuccsess && <h1 className="text-xl text-green-800">{userSuccsess}</h1>
      }
    </div></>
  );
};

export default Singup;
