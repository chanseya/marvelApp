import './singleComicPage.scss';

import { Link } from 'react-router-dom';

export const SingleComicPage = ({data}) => {
    
    const {title, descr, thumbnail, price, pages, lang} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}