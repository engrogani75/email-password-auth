import { getAuth,  sendPasswordResetEmail,  signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firbase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Sing = () => {

    const [userError, setUserError] = useState("");
    const [userSuccsess, setUserSuccess] = useState("");
    const emailRef = useRef('')

    const auth = getAuth(app);

    
  const loginHandle= (e) => {

    setUserError("");
    setUserSuccess('');

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        if (res.user.emailVerified) {
            setUserSuccess('your singup seccefully') 
        }else{
            alert('Pls varified your email')
        }
        
      })
      .catch((error) => {
        if (password.length < 6) {
            setUserError('pls give at least 6 character') 
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setUserError('pls give at least one upercase') 
            return;
        }
        else{ const errorCode = error.code;
            const errorMessage = error.message;
            setUserError('You give the wrong passwoard or wrong email');
        }
       
      });
  };

 const forgetPassHandle = () =>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const currentEmail = emailRef.current.value;
    if (!currentEmail) {
        console.log(currentEmail);
        return
    }else if(!emailPattern.test(currentEmail)){
        console.log("Valid email address");
        return
    }

    sendPasswordResetEmail(auth, currentEmail)
    .then(() =>{
        alert('please check your email')
    })
    .catch(error =>{
        console.log(error)
    })
    
 }
    return (
       
            <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={loginHandle}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    ref={emailRef}
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a onClick={forgetPassHandle} href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Sign In</button>
                </div>
              </form>

              {
        userError && <h1 className="text-xl text-red-800">{userError}</h1>
      }

      {
        userSuccsess && <h1 className="text-xl text-green-800">{userSuccsess}</h1>
      }

      <p>new user! Pls fist  <Link to={'/singup'}>Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
       
    );
};

export default Sing;