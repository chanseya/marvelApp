import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [offset, setOffset] = useState(300);
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        getAllComics(offset, true)
            .then(onRequest)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
        let ended = newComics.length < 8 ? true : false;
        setOffset(offset + 8);
        setComics([...comics, ...newComics]);
        setNewItemLoading(false);
        setComicsEnded(ended);
    }

    const createComicsList = (arr) => {
        const items = arr.map((comic, i) => {
            return (
                <li 
                    className="comics__item"
                    key={i}>
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const content = createComicsList(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
            className="button button__main button__long"
            onClick={() => onRequest(offset, false)}
            disabled={newItemLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;