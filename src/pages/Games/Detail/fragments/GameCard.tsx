import React, {useState, useContext} from "react";
import {
  Card,
  styled,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { pink } from '@mui/material/colors';

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "../../../../components/AuthContext/AuthContext";
import api from "../../../../api/api";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function GameCard({title, description, avatar, icon, hashTags, gameId}) {
  let [AuthUser] = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState((AuthUser?.likeGamesIds || []).some(likeId => likeId === gameId))

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function onLikeClick(gameId) {
    api.toggleUserLike(AuthUser, gameId).
    then(gamesIds => {
      if (Array.isArray(gamesIds)) {
        let isLike = gamesIds.some(id => id === gameId)
        setLike(isLike)
      }
    })
  }

  function onShareGameLink() {
    
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="game" src={avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={hashTags}
      />
      <CardMedia
        component="img"
        height="100"
        width="200"
        image={icon?.icon}
        alt={icon?.alt}
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => onLikeClick(gameId)} aria-label="add to favorites">
          <FavoriteIcon sx={{ color: like ? pink[500] : "" }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default GameCard;
