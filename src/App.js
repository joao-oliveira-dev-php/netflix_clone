import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css'

// IMPORT DE COMPONENTS EXTERNOS
import MoviewRow from './components/MovieRow';
import FeatureMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState();

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

  return(
    
    <div className="page">

      {featuredData && 
      <FeatureMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MoviewRow key={key} title={item.title} items={item.items}/>
        ))}      
      </section>
    </div>
  );
}