import React, { useState, useContext } from 'react';
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
  IconButtonProps,
} from '@mui/material';
import { pink } from '@mui/material/colors';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from '../../../../components/AuthContext/AuthContext';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import api from '../../../../api/api/api';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../../../routes';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function GameCard({
  title,
  description,
  avatar,
  icon,
  hashTags,
  gameId,
  game,
  path,
}) {
  let [AuthUser] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(
    (AuthUser?.likeGamesIds || []).some((likeId) => likeId === gameId)
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function onLikeClick(gameId) {
    api.toggleUserLike(AuthUser, gameId).then((gamesIds) => {
      if (Array.isArray(gamesIds)) {
        let isLike = gamesIds.some((id) => id === gameId);
        setLike(isLike);
      }
    });
  }

  function onCopyLink() {}
  const navGame = ERoutes.Games + path

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography
        sx={{
          position: 'absolute',
          borderTop: '2px solid #1F2326',
          borderRight: '2px solid #1F2326',
          width: '86%',
          height: '100%',
          right: '0%',
        }}
      ></Typography>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="game" src={avatar}>
            {game[0].toUpperCase()}
          </Avatar>
        }
        title={title}
        subheader={game}
      />
      <CardMedia
        sx={{
          borderLeft: '2px solid #1F2326',
          borderRight: '2px solid #1F2326',
        }}
        component="img"
        height="100"
        width="200"
        image={icon?.icon}
        alt={icon?.alt}
      />
      <CardActions disableSpacing>
        <IconButton
          onClick={() => onLikeClick(gameId)}
          aria-label="add to favorites"
        >
          <FavoriteIcon sx={{ color: like ? pink[500] : '' }} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="play">
          <Link to={navGame}>
            <VideogameAssetIcon />
          </Link>
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
