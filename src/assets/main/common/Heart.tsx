import { SvgIcon } from '@mui/material';
import heart from './icons/heart.png'
type TControlProps = {
  size?: string | number;
  fill?: string;
};

function Heart({ size, fill, ...props }: TControlProps) {
  return <img width={size} height={'auto'} src={heart} alt={"heart"}/>
}

export { Heart };
