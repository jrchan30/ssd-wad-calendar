import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType = 'button',
  textStyles = '',
  isDisabled = false,
  rightIcon,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType}
      className={`btn ${containerStyles}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span className={`flex ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-4 h-4">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
