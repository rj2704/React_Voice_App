import React, { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import className from 'classnames';
import useStyles from './styles.js';
const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        window.scroll(0, 0);
    
        setElRefs((refs) => Array(25).fill().map((_, j) => refs[j] || createRef()));
      }, []);
    
      useEffect(() => {
        if (i === activeArticle && elRefs[activeArticle]) {
          scrollToRef(elRefs[activeArticle]);
        }
      }, [i, activeArticle, elRefs]);
    
    return (
        <Card ref={elRefs[i]} className={className(classes.card, activeArticle === i ? classes.activeCard : null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=6&m=1182477852&s=612x612&w=0&h=X-UipiiX5xcMw9dBhzKZWG7UcWjEOARl2s_oTVV8rtE='} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard;
