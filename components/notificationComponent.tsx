import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

interface NotificationProps {
    message: string;
    onClose: () => void;
  }
  
  const Notification = ( {message, onClose} : NotificationProps) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [onClose])
  
    return (
      <div className='fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 flex it '>
        <CheckCircle2 className='text-green-500 mr-2'/>
        <span>{message}</span>
      </div>
    )
  }

  export default Notification;