import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard'


const api_url='http://www.omdbapi.com?apikey=c3678e8f';

const movie1=
    {
        "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
        "Year": "2016",
        "imdbID": "tt18689424",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
    }


const App=()=>{

    const[movies, setMovies]=useState([])
    const[searchTerm,setSearchTerm]=useState('')

    const search_movies=async(title)=>{ //function to fetch movies
        const response=await fetch(`${api_url}&s=${title}`);
        const data=await response.json();
        setMovies(data.Search);

    }
    useEffect(()=>{
        search_movies('Superman');
    },[]);
    return (
        <div className="app">
            <h1>
                Cinephile's Heaven
            </h1>
            <div className="search">
                <input placeholder="Search your movie:" 
                value={searchTerm} //this is static, we cannot change in search bar so we use onClick
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                onClick={()=>search_movies(searchTerm)}
                />
            </div>

            {
                movies?.length>0
                ?(
                    <div className="container">
                        {/* <MovieCard movie1={movies[0]} /> */}
                        {movies.map((Eachmovie)=>( //for each iteration of the movies array, we get a singular 'movie'
                            <MovieCard movie={Eachmovie}/> // we want to render a moviecard for each iteration of the map
                        ))}
                    </div>
                ) : (
                   <div className='empty'>
                    <h2>No movies found</h2>

                   </div>  
                )
            }
            

        </div>
    );
}

export default App;