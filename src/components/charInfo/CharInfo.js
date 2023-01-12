import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if(!charId)
            return;

        getCharacter(charId)
            .then(setChar)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const skeleton = loading || error || char ? null : <Skeleton/>;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {spinner}
            {errorMessage}
            {skeleton}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;                                                                               
    
    let comicsContent = null;
    if(comics.length === 0) {
        comicsContent = 'This char have not comics(';
    } else {
        comicsContent = comics.slice(0, 10).map((item, i) => {
            return (
                <li key={i} className="char__comics-item">
                    <Link to={`/comics/${+item.resourceURI.slice(-5)}`}>{item.name}</Link>
                </li>
            )
        });
    }

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="name" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsContent}
            </ul>
        </>
    )
}

export default CharInfo;