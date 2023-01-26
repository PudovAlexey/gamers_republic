import { SvgIcon } from '@mui/material';
import stamp from './icons/stamp.png'
type TControlProps = {
  size?: string | number;
  fill?: string;
};

function Stamp({ size, fill, ...props }: TControlProps) {
  return <img width={size} height={'auto'} src={stamp} alt={"heart"}/>
}

export { Stamp };
