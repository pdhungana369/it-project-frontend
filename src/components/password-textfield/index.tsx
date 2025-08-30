import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import TextField from '../text-field';

interface IProps {
  name: string;
  label?: string;
  placeHolder?: string;
}

const PasswordTextField: React.FC<IProps> = ({ name, label, placeHolder }) => {
  const [passwordVisibleSwitch, setPasswordVisibleSwitch] =
    React.useState(false);
  return (
    <div className="relative">
      <TextField
        label={label ? label : 'Password'}
        name={name}
        placeholder={placeHolder || 'Enter a password'}
        type={`${!passwordVisibleSwitch ? 'password' : 'text'}`}
      />
      {!passwordVisibleSwitch ? (
        <AiOutlineEye
          className="absolute right-4 top-11 cursor-pointer"
          color="#002a32"
          onClick={() => setPasswordVisibleSwitch(!passwordVisibleSwitch)}
        />
      ) : (
        <AiOutlineEyeInvisible
          className="absolute right-4 top-11 cursor-pointer"
          color="#002a32"
          onClick={() => setPasswordVisibleSwitch(!passwordVisibleSwitch)}
        />
      )}
    </div>
  );
};

export default React.memo(PasswordTextField);
