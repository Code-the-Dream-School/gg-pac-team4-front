import { useState } from 'react';

const PasswordInput = ({ value, onChange, name, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
      />
      <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        {showPassword ? '🤓' : '😎'}
      </button>
      {error && <p className="text-red text-sm font-spartan">{error}</p>}
    </div>
  );
};

export default PasswordInput;
