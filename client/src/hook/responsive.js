import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
    const desktop = useMediaQuery({ minWidth: 1570 });
    const laptop = useMediaQuery({ minWidth: 1391, maxWidth: 1569 });
    const tablet = useMediaQuery({ minWidth: 986, maxWidth: 1390 });
    const mobile = useMediaQuery({ minWidth: 720, maxWidth: 985 });
    const smallMobile = useMediaQuery({ maxWidth: 720 })

    return { desktop, laptop, tablet, mobile, smallMobile };
};