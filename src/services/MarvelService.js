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

    return {loading, request, error, clearError, getAllCharacters, getCharacter};
}

export default useMarvelService;