import { RefObject, useEffect } from 'react';

/**
 * Hook that triggers a function when a click is detected outside the referenced element.
 * @param ref - React ref object pointing to the element to monitor.
 * @param handler - Function to be called when a click outside the referenced element is detected.
 */
function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void): void {
    useEffect(() => {
        // Listener to handle outside clicks
        const listener = (event: MouseEvent | TouchEvent): void => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        // Setting up the event listeners
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            // Clean up the event listeners
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]); // Re-run only if ref or handler changes
}

export default useOnClickOutside;
