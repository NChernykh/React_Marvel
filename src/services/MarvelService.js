class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=50f1c7d41cc4db560bf703618462608a';
    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
    
        return await res.json();
    }   
    
    getAllCharacters = () => {
        return this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;