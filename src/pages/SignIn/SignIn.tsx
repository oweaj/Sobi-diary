import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/main');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="absolute center w-full">
      <img src="/logo.png" className="object-cover" alt="한달소비 로고 이미지" />
      <button
        className="flex items-center justify-center gap-2 mx-auto font-semibold border rounded-md shadow-md py-1 px-6"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="w-10 h-10" />
        <span>Google Login</span>
      </button>
    </div>
  );
};

export default SignIn;
