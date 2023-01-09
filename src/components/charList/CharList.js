import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharListLoaded) //из MarvelServices вщзвращается _transformCharacter 
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {

        this.setState({
            charList,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderCards(charList) {
        const cards = charList.map(item => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit' : 'fill'};
            }
            return (
                <li className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        
        return (
            <ul className="char__grid">
                {cards}
            </ul>
        )
    };

    render() {
        const {charList, loading, error} = this.state;
        const items = this.renderCards(charList);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items: null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;