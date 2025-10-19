import { Font } from '@react-pdf/renderer';
import MontserratMedium from '@assets/fonts/Montserrat-Medium.ttf?url';
import MontserratSemiBold from '@assets/fonts/Montserrat-SemiBold.ttf?url';

const MontserratRegular = MontserratMedium;
const MontserratBold = MontserratSemiBold;

// Font registration once when loading the module
export const registerPdfFonts = (): void => {
  Font.register({
    family: 'Montserrat',
    fonts: [
      { src: MontserratRegular, fontWeight: 400, fontStyle: 'normal' },
      { src: MontserratMedium, fontWeight: 500, fontStyle: 'normal' },
      { src: MontserratSemiBold, fontWeight: 600, fontStyle: 'normal' },
      { src: MontserratBold, fontWeight: 700, fontStyle: 'normal' },
    ],
  });
};
