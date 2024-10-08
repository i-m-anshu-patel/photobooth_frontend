import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [signUpMode, setSignUpMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("email: ", email);
    console.log("password: ", password);
  }

  const toggleSignUpMode = () => {
    if (signUpMode) {
      setSignUpMode(false)
    }
    else {
      setSignUpMode(true)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen '>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-8'>
        <h3 className='text-2xl font-bold mb-6 text-center'>{signUpMode ? 'Sign Up' : 'Login'}</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {signUpMode && (
            <div className='mb-6'>
              <label htmlFor='username' className='block text-gray-700 text-sm font-bold mb-2'>
                Username
              </label>
              <input
                type='username'
                id='username'
                className='w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        <div className='mt-4 text-center'>
          <button className='underline hover:bg-black hover:text-white p-2 rounded-lg' onClick={toggleSignUpMode}>{signUpMode ? "Already have an Account?" : "Don't have an account?"}</button>
        </div>
      </div>

    </div>
  );
};

export default Login;
