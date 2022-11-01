import { SvgIcon } from '@mui/material';

type TControlProps = {
  size?: string | number
  fill?: string 
}

function AuthorLogo({ size, fill, ...props }: TControlProps) {
  return (
    <SvgIcon
      sx={{
        width: 'auto',
        height: size || '40px',
      }}
      {...props}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 79 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M74.8115 35.5942L67.7143 34.4348V33.5072L74.5788 33.2754L74.4624 31.5362H65.7364L65.271 35.942L72.4845 37.2174V38.029L64.9219 38.3768L64.6892 40H75.2769L74.8115 35.5942ZM6.86451 34.8986L6.74816 36.5217L9.3078 36.6377V38.2609L3.83947 38.1449L4.07217 33.3913L11.5184 33.2754L11.4021 31.5362H1.74522L0.930784 40H11.8675L11.6348 34.7826L6.86451 34.8986ZM53.2872 38.029V36.5217L58.4065 36.4058V34.7826L53.1708 34.6667V33.1594L60.0353 33.0435V31.3044H50.7275L50.4948 40H60.268L60.1517 38.2609L53.2872 38.029ZM45.8409 40L44.9102 31.4203H42.4669L38.8601 35.4783L35.2533 31.4203H32.81L31.9956 40H34.9043L35.137 34.4348L38.8601 38.2609L42.5832 34.4348L42.8159 40H45.8409ZM33.5081 0H27.6907L27.2253 26.5507H34.2062L33.5081 0ZM57.243 0H39.0928L38.3947 26.5507H58.5228L57.243 0ZM51.6583 20.7536L45.2592 20.9855L44.9102 5.33333L51.6583 5.56522V20.7536ZM79 5.7971L78.3019 0H60.3844L60.6171 5.10145L66.3181 5.33333L66.8998 26.5507H73.997L71.9028 5.56522L79 5.7971ZM16.2887 26.5507H23.9676L18.9647 14.6087L22.9205 12.4058L20.2445 0H0.69809L0 5.7971L4.42121 5.68116L2.32695 26.6667H9.19146L9.42415 19.942L14.3108 17.2754L16.2887 26.5507ZM9.7732 5.33333L15.3579 5.21739L16.056 10.5507L9.5405 13.5652L9.7732 5.33333ZM24.8984 40H27.8071L25.4801 31.4203H18.4993L16.1723 40H19.081L19.5464 37.7971L24.3166 37.913L24.8984 40ZM20.0118 36.1739L20.5935 33.3913L23.3859 33.2754L23.9676 36.058L20.0118 36.1739Z"
          fill={fill || 'white'}
        />
      </svg>
    </SvgIcon>
  );
}

export default AuthorLogo;
