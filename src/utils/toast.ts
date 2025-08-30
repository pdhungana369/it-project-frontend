import toast from 'react-hot-toast';

const toastAlert = (
  variant: 'success' | 'error',
  message: string,
  position?: string
) => {
  if (variant === 'success') {
    return toast.success(message, {
      position: position ? 'bottom-left' : 'top-center',
    });
  } else if (variant === 'error') {
    return toast.error(message, {
      position: position ? 'bottom-left' : 'top-center',
    });
  } else {
    return null;
  }
};
export default toastAlert;
