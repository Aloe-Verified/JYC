import {useState, useEffect} from 'react';

export const useScrollTop = (threshold = 10) => {
    const [hasScrolled, setHasScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > threshold) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);
    return hasScrolled;
}