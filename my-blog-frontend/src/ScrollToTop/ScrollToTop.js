import React, { useEffect, useState } from 'react';
import { useWindowScroll } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (pageYOffset > 500) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [pageYOffset]);

  const ScrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) {
    return false;
  }

  return (
    <div className='scroll-to-top cursor-pointer text-center'>
      <FontAwesomeIcon
        id='scroll-to-top-icon'
        icon={faChevronUp}
        onClick={ScrollToTop}
      />
    </div>
  );
};

export default ScrollToTop;
