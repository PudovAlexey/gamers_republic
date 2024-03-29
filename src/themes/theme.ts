import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  status: {
    danger: orange[500],
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          position: 'inherit',
          background: '#1F2326',
          overflow: 'hidden',
          color: '#fff',
        },
        root: {
          // height: "100%",
          position: 'relative',
          height: '100vh',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: '#F8F8F8',
          color: '#1F2326',
        },
        input: {
          height: '5px',
        },
      },
    },
    MuiInputLabel: {},
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#d93644',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#d93644',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "5px",
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: '#d93644',
          margin: '10px 0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 'fit-content !important',
          justifyContent: 'space-between',
          paddingRight: '5px',
          paddingLeft: '5px',
          background: '#d93644',
          color: '#1F2326',
          marginBottom: '15px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '2px 2px',
          minWidth: 'fit-content',
          color: '#F8F8F8'
        },
        contained: {
          background: "#d93644"
        },
        outlined: {
          background: "#d93644"
        }
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          '&:before': {
            content: '""',
            position: 'absolute',
            background: '#d93644',
            width: '15%',
            height: '50%',
            bottom: '0',
            right: '50px',
          },
          position: 'relative',
          color: '#1F2326',
          background: '#F8F8F8',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: '25px',
          display: 'flex',
          color: '#1F2326',
          justifyContent: 'space-between',
          minWidth: '500px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          background: '#F8F8F8',
          borderRadius: '25% 0 0 0',
          border: '2px solid #000000',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'inherit',
          background: '#1F2326',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {},
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat',
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '17px',
          textAlign: 'center',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'transparent',
          transition: 'none !important',
          border: 'none',
          position: 'relative',
          fontFamily: 'Druk Wide',
          fontStyle: "normal",
          fontWeight: 500,
          zIndex: 2,
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '1100%',
            height: '138%',
            top: '20px; right: -500%',
            background: '#1F2326',
            color: "",
            transformOrigin: '45.5% 0',
            transform: 'rotate(-41deg)',
            border: '2px solid #1F2326',
            zIndex: 1,
              "&:after": {
                content: '""',
                  position: 'absolute',
                  borderTop: '2px solid #1F2326',
                  borderRight: '2px solid #1F2326',
                  width: '86%',
                  height: '100%',
                  right: '0%',
              },
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            bottom: '0px',

            width: '100%',
            borderLeft: '2px solid #1F2326',
            borderBottom: '2px solid #1F2326',
            borderRight: '2px solid #1F2326',
            height: '91%',
            zIndex: 2,
          },
          '& > *': {
            zIndex: 10,
            position: 'relative',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          baclground: "#1F2326",
          // position: "initial"
          zIndex: 11
        },
        subheader: {
          fontSize: "16px",
          letterSpacing: "0.1em",
          fontFamily: 'Druk Wide',
          fontStyle: "normal",
          fontWeight: 500,
          textOverflow: "eclipsis",
          // "-webkit-text-stroke": "1px #fff",
          color: "#d93644",
          whiteSpace: "nowrap",
     
          textTransform: "uppercase",
       
        },
        avatar: {
          position: "relative",
          left: "8px"
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white"
        }
      }
    },
  },
});
