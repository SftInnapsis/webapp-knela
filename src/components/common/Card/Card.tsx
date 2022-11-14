import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import {CardHeader,Grid,Chip} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

type CardProps = {
  info?:any
 }

export const CardComponent : React.FC<CardProps> = (
    props: CardProps
 ) : JSX.Element => {
  const {data, detail}=props.info;
 console.log(data)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Grid container direction='row' justifyContent={'space-between'}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {data.nameDoctor.charAt(0)}
          </Avatar>//iniciales del docotor
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.nameDoctor}//nombre del doctor
        subheader={data.creation_date}//fecha de publicacion
        // component={<div>aass</div>}
      />
        <CardActions disableSpacing>
          <Chip label={data.nameStatusPatient} color="error" variant="outlined" />
      </CardActions>
      </Grid>
        
      {
        detail.map((row, i)=>{
          console.log(row)
          return(
            <div key={i}>
              {row.idsend_type==3 &&  
              <CardMedia
              component="img"
              height="194"
              image={`http://localhost:8000/${row.send}`}//imagen si ubiera
              alt="img"
            />}
          { row.idsend_type==1 &&  <CardContent>
            <Grid container xs={12} sx={{ height: 100 }} >
              <Typography variant="body2" color="text.secondary">
               {row.send}
              </Typography>
              </Grid>
            </CardContent>}
            </div>
          )
        })
      }
  
     
    </Card>
  );
}