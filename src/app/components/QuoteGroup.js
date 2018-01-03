import React from 'react';
import PropTypes from 'prop-types';
import { QuoteRow } from './QuoteRow';

export class QuoteGroup extends React.Component {
  constructor(props) {
    super(props);
    this.usdFormatter = this.usdFormatter.bind(this);
    this.btcFormatter = this.btcFormatter.bind(this);    
    this.state = {
      quotes: [],
      isLoading: true,
      intervalId: {},
      intervalRate: 1000,
    };
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer() {
    this.getQuotes();
  }

  getQuotes() {
    return fetch(`http://localhost:8080/quote/${this.props.coin}`)
      .then(response => response.json())
      .then((responseJson) => {
        return this.setBestPrice(responseJson);
      })
      .then((data) => {
        return this.truncateQuotes(data);
      })
      .then((data) => {
        this.setState({ quotes: data });
      })    
  }

  truncateQuotes(_quotes) {
    for (var i = 1; i <= _quotes.length-1; i += 1) {
        _quotes[i].quote = Math.trunc(_quotes[i].quote * 10000) / 10000;
    }
    return _quotes;    
  }

  btcFormatter(data) {
    return Math.trunc(data * 10000) / 10000;
  }

  usdFormatter(data) {
    return Math.trunc(data * 100) / 100;
  }

  setBestPrice(_quotes) {
    // intial conditions - first object in the array
    let bestPrice = _quotes[0].quote; 

    // find best price
    for (var i = 1; i <= _quotes.length-1; i += 1) {
      if (_quotes[i].quote < bestPrice) {
        bestPrice = _quotes[i].quote;
       }
    }

    // update isBestPrice -- ok to have more than one source that offers the best price
    for (var i = 0; i <= _quotes.length-1; i += 1) {
      if (_quotes[i].quote === bestPrice) {
        _quotes[i].isBestPrice = true;
      }
      else {
        _quotes[i].isBestPrice = false;
      }
    }    
    return _quotes;
  }

  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), this.state.intervalRate);
    this.getQuotes()
      .then(() => {
        this.setState({ isLoading: false });
      })      
      .catch((error) => {
        console.error(error);
      });
  }

  renderQuoteRow(i) {
    return <QuoteRow 
              source={this.state.quotes[i].source} 
              quote={this.state.quotes[i].quote} 
              highlight={this.state.quotes[i].isBestPrice} 
              amt={this.btcFormatter(this.props.amtBTC / this.state.quotes[i].quote)}
              estimSavings={this.btcFormatter( this.props.amtBTC / this.state.quotes[i].quote * .0001 ) }
           />;
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
        <br></br>
        <h6>Latest Quotes:</h6>
        <table>
          <thead>
            <tr>
              <th>Exchange</th>
              <th>Price (BTC)</th>
              <th>QTY Purchased (CoinX)</th>
              <th>Savings (BTC)</th>
            </tr>
          </thead>
          <tbody>
            {this.renderQuoteRow(0)}
            {this.renderQuoteRow(1)}
            {this.renderQuoteRow(2)}          
          </tbody>
        </table>
      </div>
    );
  }
}

QuoteGroup.propTypes = {
  coin: PropTypes.string,
};
