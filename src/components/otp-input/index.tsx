/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

interface IProps {
  onChange: (val: string) => void;
}

const OtpInput: React.FC<IProps> = ({ onChange }) => {
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));
  const inputRefs = React.useRef<any>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (isNaN(+event.target.value)) return;
    const newOtp: string[] = [...otp];
    newOtp[idx] = event.target.value;
    setOtp(newOtp);

    if (event.target.nextSibling && event.target.value) {
      // @ts-ignore
      event.target.nextSibling.focus();
    }
    onChange(newOtp.join(''));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.keyCode === 8 && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="mb-3">
      <div className="relative mb-2 inline-block">
        <label className="block text-xs font-bold">Otp</label>

        <p className="absolute -right-2 -top-1 inline-block font-black text-danger">
          *
        </p>
      </div>
      <div className="flex w-full items-center gap-2">
        {otp?.map((item, idx) => (
          <input
            type="text"
            key={idx}
            maxLength={1}
            value={item}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputRefs.current[idx] = el)}
            onChange={(event) => handleChange(event, idx)}
            className="mr-3 block h-10 w-10 rounded border border-border pb-2 pt-2 text-center text-lg focus-within:border-secondary"
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(OtpInput);
