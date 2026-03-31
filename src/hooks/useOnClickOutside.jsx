import { useEffect, useRef } from 'react';

export const useOnClickOutside = (ref, handler) => {
    const saveHandler = useRef(handler);

    useEffect(() => {
        saveHandler.current = handler;
    }, [handler]);
    
    useEffect(() => {
        function listener(event) {
            if (!ref.current || ref.current.contains(event.target)) return;
            saveHandler.current(event);
        }

        // touchstart is mousedown equivalent for mobile devices
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref]);
};