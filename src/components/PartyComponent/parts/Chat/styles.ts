import zIndex from '@mui/material/styles/zIndex'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        layout: {
            overflow: 'auto',
            height: "80%"
        },
        messageBox: {
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: "15px"
        },
        message: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: "5px",
            overflow: 'auto',
        },
        messageText: {
            padding: "10px 10px 15px 10px",
        },
        dateText: {
            fontStyle: 'italic',
            fontSize: "14px",
            color: "#7D7D7D",
            float: 'right'
        },
        messageInfo: {
            display: 'flex',
        },
        input: {
            position: 'absolute',
            bottom: 0
        },
        messageItem: {
            maxWidth: "50%"
        },
        dateViewer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px'
        },
        monthText: {
            color: "#f8f8f8",
            fontWeight: "bold",
            position: 'relative',
            minHeight: "40px",
            "&:after": {
                content: '""',
                borderBottom: "2px solid #f8f8f8",
                position: 'absolute',
                width: "700px",
                left: "42px",
                bottom: 0,

              },
        }
    },
  })
}

const dinamicStyles = {
    chatByUser: (userId, authUser) => {
       return {
        flexDirection: userId === authUser.id ? 'row-reverse' : "row"
       }
    },
    avatarByUser: (userId, authUser) => {
        return {
         justifyContent: userId === authUser.id ? 'right' : "start"
        }
     }
}

export { styleComponent, dinamicStyles }
