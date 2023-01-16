import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e8c7dd46c2978e83ddba972067a5b1b0';
    const _apiOffset = 300;

    const getAllCharacters = async (offset = _apiOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _apiOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            descr: comic.description ? comic.description : 'There is no info for this comic',
            pages: comic.pageCount ? `${comic.pageCount} pages` : 'No information about the number of pages',
            price: comic.prices[0].price ? comic.prices[0].price + '$': 'NOT AVAILABLE',
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            lang: comic.textObjects.language || 'en-us'
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            descr: char.description ? `${char.description.slice(0, 210)}...` : 'There is no info for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`, 
            homepage: char.urls[0].url,
            wiki: char.urls[1].url, 
            comics: char.comics.items
        }
    }

    return {loading, request, error, clearError, getAllCharacters, getCharacter, getCharacterByName, getAllComics, getComic};
}

export default useMarvelService;