'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronUp  } from "react-icons/fa";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState<boolean>(true);
    useEffect(() => {
        const toggleVisible = () =>{
            setVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', toggleVisible);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return <>
        <button
        onClick={scrollToTop}
        className={`fixed right-8 bottom-6 text-3xl z-99 bg-azure-400 w-12 h-12 rounded-full text-white flex items-center justify-center duration-300 ${visible ? 'translate-y-0' : 'translate-y-20'}`}>
            <FaChevronUp  />
        </button>
    </>;
}

export default ScrollToTopButton;