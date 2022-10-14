import Checkbox from '@mui/material/Checkbox';
import withStyles from '@mui/material/styles';
import { createTheme, styled } from '@mui/material/styles';
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '50px',
        },
      },
    },
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
          color: '#FF4656',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#FF4656',
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
          background: '#FF4656',
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
          background: '#FF4656',
          color: '#1F2326',
          marginBottom: '15px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          position: 'inherit',
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
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          '&:before': {
            content: '""',
            position: 'absolute',
            background: '#FF4656',
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
          zIndex: 2,
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '1100%',
            height: '138%',
            top: '20px; right: -500%',
            background: '#1F2326',
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
          baclground: "#1F2326"
        }
      }
    },
  },
});
