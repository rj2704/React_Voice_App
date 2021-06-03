import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './styles';
import wordsToNumbers from 'words-to-numbers';

const alanKey = 'dbfff378b773b1a5de8c33bcc158d6252e956eca572e1d8b807a3e2338fdd0dc/stage';
function App() {
  const classes = useStyles();
  const [activeArticle, setActiveArticle] = useState(-1);
  const [newsArticle, setNewsArticle] = useState([]);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines'){
          setNewsArticle(articles);
          setActiveArticle(-1);
        } else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  },[])

  return (
    <div>
    <div className={classes.logoContainer}>
    {newsArticle.length ? (
      <div className={classes.infoContainer}>
        <div className={classes.card}><Typography variant="h6" component="h5"><strong>Try saying:</strong> <br /><small>Open article number [xyz]</small></Typography></div>
        <div className={classes.card}><Typography variant="h6" component="h2"><strong>Try saying:</strong> <br /><small>Go back</small></Typography></div>
      </div>
    ) : null}
    <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="logo" />
    
  </div>
      <NewsCards articles={newsArticle} activeArticle={activeArticle}/>
    </div>
    
  );
}

export default App;

