import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchChar from "../searchChar/SearchChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

export const MainPage = () => {
    const [charId, setCharId] = useState(null);

    const onCharSelected = (id) => {
        setCharId(id);
    }

    return (
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={charId}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <SearchChar/>
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}