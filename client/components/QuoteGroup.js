import React from 'react';
import PropTypes from 'prop-types';
import { QuoteRow } from './QuoteRow';

export class QuoteGroup extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.usdFormatter = this.usdFormatter.bind(this);
        this.btcFormatter = this.btcFormatter.bind(this);    
        this.state = {
            quotes: [],
            isLoading: true,
            intervalId: {},
            intervalRate: 1000,
            btcQuotes: [],
            priceDelta: 42,
            amtBTC: 0,
        };
    }

    handleChange(event) {
        this.setState({ amtBTC: event.target.value });
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    timer() {
        this.getQuotes(this.props.coin)
            .then((data) => {
                return this.setBestPrice(data);
            })    
            .then((data) => {
                this.setState({ quotes: data });
            })    
            .then(() => {
                return this.getQuotes('BTC');
            })
            .then((data) => {
                this.setState({ btcQuotes: data });
            })
            .catch((error) => {
                console.error(error);
            });      
    }

    getQuotes(coin) {
        //return fetch('http://localhost:8080/quote/' + coin)
        return fetch('/quote/' + coin)
            .then(response => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error('Error: QuoteGroup.getQuotes(): Failed to fetch price quotes from REST API' + error);
            });   
    }

    btcFormatter(data) {
        return Math.trunc(data * 1000000) / 1000000;
    }

    usdFormatter(data) {
        return Math.trunc(data * 100) / 100;
    }

    setBestPrice(_quotes) {
    // intial conditions - first object in the array
        let bestPrice = _quotes[0].quote; 
        let worstPrice = _quotes[0].quote;

        // find worst price
        for (let i = 1; i <= _quotes.length-1; i += 1) {
            if (_quotes[i].quote > worstPrice) {
                worstPrice = _quotes[i].quote;
            }
        }

        // find best price
        for (let i = 1; i <= _quotes.length-1; i += 1) {
            if (_quotes[i].quote < bestPrice) {
                bestPrice = _quotes[i].quote;
            }
        }

        // update isBestPrice -- ok to have more than one source that offers the best price
        for (let i = 0; i <= _quotes.length-1; i += 1) {
            if (_quotes[i].quote === bestPrice) {
                _quotes[i].isBestPrice = true;
            }
            else {
                _quotes[i].isBestPrice = false;
            }
        }

        this.setState({ 
            priceDelta: worstPrice - bestPrice,        
        });

        return _quotes;
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), this.state.intervalRate);
        this.getQuotes(this.props.coin)
            .then((data) => {
                return this.setBestPrice(data);
            })
            .then((data) => {
                this.setState({ quotes: data });
            })       
            .then(() => {
                return this.getQuotes('BTC');
            })
            .then((data) => {
                this.setState({ btcQuotes: data });
            })          
            .then(() => {
                this.setState({ isLoading: false });
            })      
            .catch((error) => {
                console.error(error);
            });
    }

    renderQuoteRow(i) {
        const source = this.state.quotes[i].source;
        const quote = this.state.quotes[i].quote;
        const isBestPrice = this.state.quotes[i].isBestPrice;
        const amtBTC = this.state.amtBTC;
        const priceDelta = this.state.priceDelta;
        const btcQuote = this.state.btcQuotes[i].quote;

        return (
            <QuoteRow 
                source={source} 
                quote={quote} 
                highlight={isBestPrice} 
                amt={this.btcFormatter(amtBTC / quote)}
                estimSavings={this.btcFormatter( (amtBTC / quote) * priceDelta ) }
                savingsUSD={'$' + this.usdFormatter( (amtBTC / quote) * priceDelta * btcQuote) }
            />
        );
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
            <div className="row">
              <div className="seven columns">
                <h6>Latest Quotes:</h6>
                <table>
                  <thead>
                    <tr>
                      <th><strong>Exchange</strong></th>
                      <th>Price (BTC)</th>              
                      <th>QTY ({this.props.coin})</th>
                      <th>Savings (BTC)</th>
                      <th>Savings (USD)</th>            
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderQuoteRow(0)}
                    {this.renderQuoteRow(1)}
                    {this.renderQuoteRow(2)}          
                  </tbody>
                </table>
              </div>
              <div className="three columns">
                <label>Amount to Exchange (BTC)</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.text}
                  label="i_amount"
                  type="number" 
                /> 
              </div>                      
            </div>
        );
    }
}

QuoteGroup.propTypes = {
    coin: PropTypes.string,
};
