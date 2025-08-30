import { Button } from '@components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
  path?: string;
  isClick?: boolean;
  buttonTxt?: string;
}

const TitleButton: React.FC<IProps> = ({ buttonTxt, title, path, isClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isClick) return;
    navigate(path ?? '');
  };
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-black text-primary">{title} </h2>
      {isClick && (
        <Button
          variant="primary"
          text={buttonTxt ?? ''}
          className="px-5 py-2"
          type="button"
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default React.memo(TitleButton);
