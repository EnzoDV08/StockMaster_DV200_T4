import React, { useState } from 'react';
import { auth, db, signInWithGoogle } from '../firebase'; // Ensure you have these in your firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
import RegisterIll from '../assets/LogoName.png'; // Your assets
import LoginIll from '../assets/Logo.png';
import GoogleLogo from '../assets/googleicon.png';
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignInSignUp.css'; // Your custom CSS

const RegisterPage = () => {
  const [nameAndSurname, setNameAndSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('weak');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [animationState, setAnimationState] = useState('');
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 'weak';
    if (password.length > 6) {
      if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'average';
      }
      if (password.length > 8 && /[\W]/.test(password)) {
        strength = 'strong';
      }
    }
    setPasswordStrength(strength);
  };

  const validateField = async (fieldName, value) => {
    let error = '';
    let isValid = false;
    
    switch (fieldName) {
      case 'nameAndSurname':
        if (!value) error = 'Name and surname are required.';
        else isValid = true;
        break;
      case 'email':
        if (!value) error = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email is invalid.';
        else {
          const isUsed = await checkEmailExists(value);
          if (isUsed) error = 'This email is already in use.';
          else isValid = true;
        }
        break;
      case 'password':
        if (!value) error = 'Password is required.';
        else isValid = true;
        break;
      case 'confirmPassword':
        if (value !== password) error = 'Passwords do not match.';
        else isValid = true;
        break;
      default:
        break;
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));

    return isValid;
  };

  const checkEmailExists = async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: 'This email is already in use.',
        }));
        return true;
      } else {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
        return false;
      }
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message on submit attempt

    const isNameValid = await validateField('nameAndSurname', nameAndSurname);
    const isEmailValid = await validateField('email', email);
    const isPasswordValid = await validateField('password', password);
    const isConfirmPasswordValid = await validateField('confirmPassword', confirmPassword);

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !agreeTerms) {
      setError('Please ensure all fields are correctly filled and you have agreed to the terms.');
      return; // Stop form submission if there are validation errors
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the display name for the user
      await updateProfile(user, {
        displayName: nameAndSurname,
      });

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        nameAndSurname,
        createdAt: new Date(),
      });

      navigate('/'); // Navigate after successful registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          email: 'This email is already in use.',
        }));
      } else {
        setError('Error during registration: ' + error.message);
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Error during sign in: ' + error.message);
    }
  };

  const toggleForm = () => {
    setAnimationState('slide-out');
    setTimeout(() => {
      setIsRegistering(!isRegistering);
      setAnimationState('slide-in');
    }, 500); // Delay matches CSS animation
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Error signing in with Google. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form
          onSubmit={isRegistering ? handleRegister : handleSignIn}
          className={`register-form ${animationState}`}
        >
          <h2>{isRegistering ? 'Sign Up Account' : 'Sign In Account'}</h2>
          <p>{isRegistering ? 'Enter your personal data to create your account.' : 'Enter your credentials to sign in.'}</p>

          <div className="social-sign-up">
            <button type="button" onClick={handleGoogleSignIn} className="social-button google-signup">
              <img src={GoogleLogo} alt="Google" className="social-logo" /> Continue with Google
            </button>
            <button type="button" className="social-button apple-signup">
              <img src={AppleLogo} alt="Apple" className="social-logo" /> Continue with Apple
            </button>
          </div>

          <div className="separator">Or</div>

          {error && <p className="general-error-message">{error}</p>}

          {isRegistering && (
            <input
              type="text"
              name="nameAndSurname"
              placeholder="Name and Surname"
              value={nameAndSurname}
              onChange={(e) => setNameAndSurname(e.target.value)}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-wrapper">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {isRegistering && (
            <div className="password-strength-container">
              <div className={`password-strength ${passwordStrength}`}></div>
            </div>
          )}
          {isRegistering && (
            <div className="password-wrapper">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
          {isRegistering && (
            <div className="terms-container">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <label>I agree to the terms</label>
            </div>
          )}
          <button type="submit">{isRegistering ? 'Sign Up' : 'Sign In'}</button>

          <p className="toggle-form">
            {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <span onClick={toggleForm}>{isRegistering ? 'Sign In' : 'Sign Up'}</span>
          </p>
        </form>
        <div className="illustration-container">
          <img src={isRegistering ? RegisterIll : LoginIll} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;