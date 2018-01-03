
import React from 'react';
import { render } from 'react-dom';
import { QuoteGroup } from './components/QuoteGroup';
import { PriceHistory } from './components/PriceHistory';
import './skeleton.css';
import './normalize.css';
import './custom.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      priceHistoryBTCUSD: [],
      isLoading: true,
      inputAmtBTC: 0,
    };
  }

  handleChange(e) {
    this.setState({ inputAmtBTC: e.target.value });
  }

  componentDidMount() {
    return fetch('http://localhost:8080/price_history/BTC')
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({ 
          priceHistoryBTCUSD: responseJson, 
          isLoading: false,
        });  
      })
      .catch((error) => {
        console.error(error);
      });
  }  

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading latest quotes...</p>
        </div>
      );
    }
      return (      
      <div>
        <header id="header" className="twelve columns">
          <div className="container">
            <div className="row">
              <h2>Price Comparison Tool</h2>
            </div>
          </div>
        </header> 

        <div className="container">
         <div className="ten columns">
          <label>Amount (BTC)</label>

          <input
            onChange={this.handleChange}
            value={this.state.text}
            label="i_amount"
            type="number" 
          />
          <label>Select Timeframe</label>
        <select>          
          <option value="1">1 day</option>
          <option value="2">7 days</option>
          <option value="3">30 days</option>
          <option value="4">90 days</option>
        </select>

          <div className="row">
            <h3>Ethereum</h3>
            <PriceHistory coin="ETH" color="#8884d8" priceHistoryBTCUSD={this.state.priceHistoryBTCUSD} />
          </div>
          <div className="row">
            <QuoteGroup coin="ETH" amtBTC={this.state.inputAmtBTC}/>
          </div>
          <div className="row">
            <h3>Litecoin </h3>
            <PriceHistory coin="LTC" color="#82ca9d" priceHistoryBTCUSD={this.state.priceHistoryBTCUSD}/>
          </div>
          <div className="row">
            <QuoteGroup coin="LTC" amtBTC={this.state.inputAmtBTC}/>
          </div>
          <div className="row">
            <h3>Dash </h3>
            <PriceHistory coin="DASH" color="#f4b942" priceHistoryBTCUSD={this.state.priceHistoryBTCUSD}/>
          </div>
          <div className="row">
            <QuoteGroup coin="DASH" amtBTC={this.state.inputAmtBTC}/>
          </div>
         </div> 
        </div>
      </div>
    );
  }
}

if (module.hot) {
  module.hot.accept('./components/QuoteGroup.js', () => {
    console.log('Accepting the updated QuoteGroup module!');
    QuoteGroup.render();
  });
}

render(<App />, window.document.getElementById('app'));
