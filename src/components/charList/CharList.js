import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(300);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = newCharList.length < 9 ? true : false;

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const selectedChars = useRef([]);

    const setFocusChar = (id) => {
        selectedChars.current.forEach((item, i) => {
            item.classList.remove('char__item_selected');
        });
        
        selectedChars.current[id].classList.add('char__item_selected');
        selectedChars.current[id].focus();
    }

    const createCharList = (arr) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    ref={el => selectedChars.current[i] = el}
                    className="char__item"
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id)
                        setFocusChar(i)
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const items = createCharList(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;
    return (
        <div className="char__list">
            {spinner}
            {errorMessage} 
            {content}
            <button 
            className="button button__main button__long"
            style={{'display' : charEnded ? "none" : "block"}}
            disabled={newItemLoading}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;