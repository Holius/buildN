import React, {Component} from 'react';
import SearchModal from './SearchModal';
import axios from 'axios';

import {BrowserRouter as Router, Link} from 'react-router-dom';

const baseURL = 'http://NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/';


class Search extends Component {
    constructor(props) {
        super(props);
        this.mainRef = React.createRef();
        this.state = { 
            array: [],
            current: [],
            currentHighlighted: '',
            popular: [],
            query: '',
            show: false,
            listingId: '',
        }
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    };

    componentDidMount () {
      window.addEventListener("itemChanged", event => {
        this.setState({ listingId: Number(event.detail.listingId) }, () =>
          console.log('hi')
        );
      });
      this.getSearchItems();     
  }

    getSearchItems () {
      axios.get('/api/searchItems'
      , { 
        baseURL
      })
      .then( results => {
         this.setState({ array: results.data})
      }).then ( results => {
        this.setState( {popular: this.getTopTenQueries(this.state.array)} )
      })
      .catch( error => {
          console.error(error);
      });
    }

    onSubmit (event) {
      const compare = this.state.query;
      let id = 0;
      const array = this.state.array;
      for (let i = 0; i < this.state.array.length; i++) {
        if (compare.toLowerCase() === array[i].title.toLowerCase()) {
          id = array[i].listing_id;
          break;
        }
      }
     
      if (id !== 0) {
        this.setState({show: false})
        this.onListingId(event, id) 
      } else {
        this.setState({query: '', show: false});
      }
    } 

    onHoverSubmit (event, id, title) {
      this.setState({query: title, show: false}, () => {
        this.onListingId(event, id);
      })
    }

    onListingId(e, listingId) {
      const event = new CustomEvent("itemChanged", {
        detail: {
          listingId
        }
      });
      window.dispatchEvent(event);
    }

    getTopTenQueries (array) {
      let top = array.sort( (a,b) => {
        if (a.views < b.views) {
          return -1;
        }
        if (a.views > b.views) {
          return 1;
        }
        return 0;
      })
      let result = [];
      for (let i = top.length - 10; i < top.length; i++) {
        result.push(top[i])
      }
      return result
    }

    onSearchChange () {
        Promise.resolve(this.setState({query: event.target.value.toLowerCase()}))
        .then( x => {
          if (this.state.query.length) {
            let temp = [];
            for (let i = 0; i < this.state.array.length; i++) {
              let title = this.state.array[i].title;
              if (title.toLowerCase().startsWith(this.state.query)) {
                temp.push(this.state.array[i]);
              }
            }
            this.setState({ current: temp })
        }})
    
      };

      toggleShow () {
        event.preventDefault();
        this.setState({show: !this.state.show})
      };


    handleClick(e) {
        e.preventDefault();
        if (this.state.show === false) {
          document.addEventListener('click', this.handleOutsideClick, false);
          this.setState({show: true})
        }
         else if (this.state.show === true && this.myRef.current.contains(e.target) === false) {
          document.removeEventListener('click', this.handleOutsideClick, false);
        }
      }
      
      handleOutsideClick(e) {
        if (this.myRef.current.contains(e.target)) {
          return;
        }
        this.setState({show: false})
      }
      
      render() {
          return (
            <Router>
                <header 
                  ref={this.myRef}
                  className={'SearchBarFull'}
                  > 
                  
                  <div className={'searchBarButton'}>
                    <h2 className={'websiteLogo'}>Hogwartsey</h2>
                    <div className={'searchBoth'}>
                    <input 
                      className={'searchBar'}
                      type='text' 
                      value={this.state.query}
                      placeholder='Search for items or shops'
                      onChange={this.onSearchChange.bind(this)}
                      onClick={this.handleClick.bind(this)}
                    />
                    <Link to={`/${this.state.query}`}>
                      <input
                        type='image'
                        className={'searchButton'}
                        src={`${baseURL}mg.png`}
                        onClick={this.onSubmit.bind(this, event)}
                      >
                        </input>
                    </Link>
                   </div> 
                    <h4 className={'signIn'}>Sign in</h4>
                    <input
                      type='image'
                      src={`${baseURL}broom.png`}

                      className={'cart'}
                    />
                </div>
            <SearchModal
                show={this.state.show}
                query={this.state.query}
                current={this.state.current}
                popular={this.state.popular}
                onHoverSubmit={this.onHoverSubmit.bind(this)}
              />
          </header>
          </Router>
          );
      }

    }

export default Search;
