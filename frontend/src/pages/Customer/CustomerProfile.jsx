import React, { useState } from 'react';
import './CustomerProfile.css';
import Cookies from 'js-cookie';
import UnauthorizedPage from '../UnauthorizedPage';
const CustomerProfile = () => {

    const ROLE = Cookies.get('role');

  if(ROLE != "CUSTOMER" ){
    return (
      <div>
        <UnauthorizedPage />
      </div>
    );
  }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto] = useState(null); // Fotografı tutmak için state
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return re.test(String(password));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]; // Seçilen dosyayı al
        setPhoto(file); // Dosyayı state'e kaydet
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else if (!validatePassword(password)) {
            setPasswordError('Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number');
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else {
            // Here you can perform actions like sending data to server, updating localStorage, etc.
            // For simplicity, let's just log the data to console
            console.log({ name, email, password, photo });
            setShowSuccess(true); // Show success popup
            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhoto(null);
            setEmailError('');
            setPasswordError('');
            // setTimeout to hide the success popup after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form onSubmit={submitHandler} className="profile-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="photo-container">
                    <label htmlFor="photo">Photo</label>
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                    {photo && (
                        <div className="photo-preview">
                            <img src={URL.createObjectURL(photo)} alt="Preview" />
                        </div>
                    )}
                </div>
                <button type="submit">Update</button>
            </form>
            {showSuccess && (
                <div className="popup">
                    <p>Update successful!</p>
                </div>
            )}
        </div>
    );
};

export default CustomerProfile;
