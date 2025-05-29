import { useEffect } from 'react';
import './Toast.css'
import { generateItemKey } from '../../utils/commonUtils';

export default function Toast({ toastQueue, setToastQueue }) {
    useEffect(() => {

        function sliceToast() {
            setToastQueue(prev => prev.slice(1))
        }

        const timer = setInterval(sliceToast, 4000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={'toast-container'}>
            {toastQueue.map(toastMessage => {
                const { message } = toastMessage

                return (
                    <div className={'toast-message'} key={generateItemKey()} >
                        {message}
                    </div>
                )
            })}
        </div>
    );
};