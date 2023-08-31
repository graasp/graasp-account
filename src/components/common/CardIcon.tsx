// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as DefaultCardIcon } from 'payment-icons/min/flat/default.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as MasterCardIcon } from 'payment-icons/min/flat/mastercard.svg';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as VisaIcon } from 'payment-icons/min/flat/visa.svg';

const styles = {
  height: 35,
  width: 'auto',
  marginRight: 10,
};

const CardIcon = ({ brand }:{brand?:string}):JSX.Element=> {
  switch (brand) {
    case 'visa':
      return <VisaIcon sx={styles} />;
    case 'mastercard':
      return <MasterCardIcon sx={styles} />;
    default:
      return <DefaultCardIcon sx={styles} />;
  }
};


export default CardIcon;
