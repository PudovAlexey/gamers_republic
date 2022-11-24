import zIndex from '@mui/material/styles/zIndex'
import reactCSS from 'reactcss'
const styleComponent = function (theme) {
  return reactCSS({
    default: {
        layout: {
            overflow: 'auto',
            height: "67%"
        },
        messageBox: {
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            gap: "15px",
            overflowX: 'hidden',
            padding: "5px 5px 5px 5px"
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
        messageAvatar: {
            flexDirection: 'row-reverse',
            alignItems: 'end',
            color: '#f8f8f8',
            justifyContent: 'space-around',
            width: '60%',
          },
        messageInfo: {
            display: 'flex',
            mb: "10px"
        },
        input: {
            position: 'absolute',
            bottom: 0,
            width: "97.4%",
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
        },
        replyBox: {
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            background: '#FF4656',
            margin: "0 auto",
            width: "98%",
            position: 'relative',
            top: '5px',
            borderRadius: "4px 4px 0px 0px",
            overflow: 'hidden',
            padding: "4px 7px"
        },
        replyUserName: {
            fontWeight: 'bold',
        },
        replyMessage: {
            fontStyle: 'italic',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            overflow: 'hidden',
            
        },
        replyMessageInfo: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        replyCloseButton: {
            position: 'absolute',
            top: "3px",
            right: "3px"
        },
        chatTools: {
            display: 'flex',
            gap: "9px"
        },
        chatInput: {
            borderRadius: "0px 0px 4px 4px"
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
