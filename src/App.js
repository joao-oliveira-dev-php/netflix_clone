import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css'

// IMPORT DE COMPONENTS EXTERNOS
import MoviewRow from './components/MovieRow/MovieRow';
import FeatureMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState();
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(choseInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListerner = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListerner);  
    return() => {
      window.removeEventListener('scroll', scrollListerner);
    }

  }, []);

  return(
    
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && 
      <FeatureMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MoviewRow key={key} title={item.title} items={item.items}/>
        ))}      
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> por <a href="https://joaoweb.com.br" target="_blank">João Oliveira</a><br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>
        
        {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Loading"/>
        </div>
        }
      
    </div>
  );
}