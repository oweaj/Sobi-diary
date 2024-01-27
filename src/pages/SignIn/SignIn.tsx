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
      <img src="/logo.png" className="my-8" alt="씀 로고 이미지" />
      <button
        className="flex items-center justify-center w-full gap-2 py-1 font-semibold border rounded-md shadow-md"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="w-10 h-10" />
        <span>Google Login</span>
      </button>
    </div>
  );
};

export default SignIn;
