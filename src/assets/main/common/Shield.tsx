import shield from './icons/shield.png'
type TControlProps = {
  size?: string | number;
  fill?: string;
};

function Shield({ size, fill, ...props }: TControlProps) {
  return <img width={size} height={'auto'} src={shield} alt={"heart"}/>
}

export { Shield };
