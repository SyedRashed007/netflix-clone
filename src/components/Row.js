import React, { useEffect, useState } from 'react'
import axios from '../axios'
import './Row.css'
import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer'

const base_Url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
        autoplay: 1,
        },
    };

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    },[fetchUrl])
    

    const handleClick = async (movie) => {
        if(trailerUrl){
            setTrailerUrl("")
        } else {
            let trailerurl = await axios.get(`/movie/${movie.id}/videos?api_key=6feaeafc629abb7afe9e7a04fe1a8e6e`)
            // console.log(trailerurl)
            setTrailerUrl(trailerurl.data.results[0]?.key)
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id} 
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                        src={`${base_Url}${isLargeRow ?  movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                        onClick={()=>handleClick(movie)} 
                    />
                ) )}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row
