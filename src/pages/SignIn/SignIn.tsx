import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute center">
      <img src="/logo.png" className="w-60 h-60 my-8 object-cover" alt="씀 로고 이미지" />
      <button
        className="w-full flex items-center justify-center gap-2 font-semibold border rounded-md shadow-md py-1"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="w-10 h-10" />
        <span>Google Login</span>
      </button>
    </div>
  );
};

export default SignIn;
