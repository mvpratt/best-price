
import React from 'react';
import { render } from 'react-dom';
import { QuoteGroup } from './components/QuoteGroup';
import { PriceHistory } from './components/PriceHistory';

import './css/skeleton.css';
import './css/normalize.css';
import './css/custom.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.state = {
            priceHistoryBTCUSD: [],
            isLoading: true,
            showEthereum: true,
            showLitecoin: true,
            showDash: true,
        };
    }

    handleCheckbox(event) {
        this.setState({ 
            showEthereum: event.target.name === 'eth'? event.target.checked : this.state.showEthereum,
            showLitecoin: event.target.name === 'ltc'? event.target.checked : this.state.showLitecoin,
            showDash: event.target.name === 'dash'? event.target.checked : this.state.showDash,      
        });
    }

    componentDidMount() {
        //return fetch('http://localhost:8080/price_history/BTC')
        return fetch('/price_history/BTC')
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({ 
                    priceHistoryBTCUSD: responseJson, 
                    isLoading: false,
                });  
            })
            .catch((error) => {
                console.error('Error: index.componentDidMount(): Failed to fetch price history (BTC).  ' + error);
            });
    }  

    renderCoinGroup(coinName, coinTicker, color, show) {
        if (show)
            return (
              <div>
                <h3>{coinName}</h3>
                <QuoteGroup coin={coinTicker} />
                <div className="row">
                  <div className="ten columns">
                    <PriceHistory 
                      coin={coinTicker} 
                      color={color} 
                      priceHistoryBTCUSD={this.state.priceHistoryBTCUSD} 
                    />
                  </div>  
                </div>
                <br></br>
                </div>
            );
        else return (<p></p>);
    }

    renderCoinSelect() {
        return(          
            <form>
              <div className="two columns">
                <label >
                  <input 
                    type="checkbox" 
                    name="eth" 
                    onChange={this.handleCheckbox}
                    checked={this.state.showEthereum}>
                  </input>
                  <span className="label-body">Ethereum</span>
                  </label> 
                </div>
                <div className="two columns">
                  <label >
                    <input 
                      type="checkbox" 
                      name="ltc" 
                      onChange={this.handleCheckbox}
                      checked={this.state.showLitecoin}>
                    </input>
                    <span className="label-body">Litecoin</span>
                  </label> 
                </div>         
                <div className="two columns">
                  <label >
                    <input 
                      type="checkbox" 
                      name="dash" 
                      onChange={this.handleCheckbox}
                      checked={this.state.showDash}>
                    </input>
                    <span className="label-body">Dash</span>
                  </label> 
                </div>
            </form>           
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
              <div>
                <p>Fetching price data ...</p>
              </div>
            );
        }
        return (      
            <div>
                <header id="header" className="twelve columns">
                  <div className="container">
                    <div className="row">
                      <h2>Find the Best Cryptoasset Prices</h2>
                    </div>
                  </div>
                </header> 
                <div className="container">
                  <div className="row">                
                    {this.renderCoinSelect()}
                  </div>
                </div>                
                <div className="container">
                  <br></br> 
                  {this.renderCoinGroup('Ethereum', 'ETH', '#8884d8', this.state.showEthereum)}
                  {this.renderCoinGroup('Litecoin', 'LTC', '#82ca9d', this.state.showLitecoin)}          
                  {this.renderCoinGroup('Dash', 'DASH', '#f4b942', this.state.showDash)}
                </div>
            </div>
        );
    }
}

//if (module.hot) {
//    module.hot.accept('./components/QuoteGroup.js', () => {
//        console.log('Accepting the updated QuoteGroup module!');
//        QuoteGroup.render();
//    });
//}

render(<App/>, window.document.getElementById('app'));
