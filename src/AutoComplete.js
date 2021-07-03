import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import Input from './components/Input';

const AutoComplete = (props) => {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        console.log(selectedMovie)
    }, [selectedMovie]) 

    const handleMovieSelection = (e) => {
        let movieSelected;
        let movieId = e.target.getAttribute('data-movieId');
        if(movieId) {
            movieSelected = movies.filter((movie) => movie.imdbID === movieId);
        }
        setSelectedMovie(movieSelected[0]);
        setMovies([]);
    }

    const getMovies = (searchText) => {
        let url = `https://www.omdbapi.com/?s=${searchText}&apikey=50314ef2`
        fetch(url).then((data) => data.json()).then((data) => {
            if(data.Response === 'True') {
                let filteredSearchData = data.Search.splice(0,5);
                setMovies(filteredSearchData);
            }
            else {
                alert(data.Error)
            }
        }).catch((e) => {
            console.log(e)
        })
    }

    const debouncedGetMovies = useCallback(debounce((param) => {getMovies(param)}, 300), [])

    const handleMovieSearch = (e) => {
        let inputValue = e.target.value;
        setSearch(inputValue);
        if (inputValue.length > 3) {
            debouncedGetMovies(inputValue);
        }
    }

    return (
        <>
            <div className="autocomplete-wrapper">
                <Input value={search} label="Enter movie name" placeholder="Type to search" id="autoComplete" handleChange={handleMovieSearch} />
                {movies &&
                    <ul className="search-results-list">
                        {movies.map((item) => {
                            return (
                                <li data-movieId={item.imdbID} key={item.imdbID} className="search-result__item" onClick={handleMovieSelection}>{item.Title}</li>
                            )
                        })}
                    </ul>
                }
            </div>
            {selectedMovie && 
                <div className="movie-card-wrapper">
                    <div className="movie-card">
                        <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                        <div className="movie-detail">
                            <p className="movie-title">Movie Name : <span>{selectedMovie.Title}</span></p>
                            <span>Released Year: {selectedMovie.Year}</span>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default AutoComplete