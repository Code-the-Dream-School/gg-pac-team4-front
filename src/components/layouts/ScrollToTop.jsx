import { useEffect, useState } from 'react';

import ArrowUp from '../../assets/icons/icons-arrow-up.png';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollYInVh = window.scrollY / window.innerHeight * 100;
    if (scrollYInVh > 15) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-20 right-9 bg-darkGreen rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-lightGreen"
          onClick={scrollToTop}
          aria-label='Scroll to top'
        >
          <img src={ArrowUp} alt="Arrow Up" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;