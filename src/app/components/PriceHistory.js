import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid, linearGradient, Tooltip } from 'recharts';

const moment = require('moment');

function formatXAxis(tickItem) {
  return moment(tickItem).format('MMM Do');
}

function formatTooltip(item) {
   return (Math.trunc(item * 10000) / 10000) + ' btc';
}

export class PriceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceHistoryCoinBTC: [],
      isLoading: true,
    };
  }

  convertToBTC(coinVsUSD, btcVsUSD) {
    let coinVsBTC = [];
    let length = 0;

    if (coinVsUSD < btcVsUSD) {
      length = coinVsUSD.length;
    }
    else {
      length = btcVsUSD.length
    }

    for (var i = 0; i < length - 1; i += 1) {
      coinVsBTC.push({
        source: coinVsUSD[i].source,
        quote: (coinVsUSD[i].quote / btcVsUSD[i].quote),
        tstamp: coinVsUSD[i].tstamp,
        coin: coinVsUSD[i].coin,
      });
    }
    return coinVsBTC;
  }

  componentDidMount() {
    return fetch(`http://localhost:8080/price_history/${this.props.coin}`)
      .then(response => response.json())
      .then((responseJson) => {
        return this.convertToBTC(responseJson, this.props.priceHistoryBTCUSD);
      })
      .then((data) => {
        this.setState({ 
          priceHistoryCoinBTC: data,
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
          <p>Loading price history...</p>
        </div>
      );
    }
    return (
      <div>      
       <div>
        <label>Price Trends:</label>
        <select>          
         <option value="1">1 day</option>
         <option value="2">7 days</option>
         <option value="3">30 days</option>
         <option value="4">90 days</option>
         <option value="5">N/A</option>
        </select>
       </div>
       <div className="bg-area-chart">
        <div className="border-area-chart">
         <AreaChart
          width={730}
          height={250}
          data={this.state.priceHistoryCoinBTC}
          margin={{
            top: 20, right: 20, left: 20, bottom: 20,
          }}
        >
          <XAxis dataKey="tstamp" type="category" minTickGap={150} tickFormatter={formatXAxis} />
          <YAxis dataKey="quote" type="number" unit="btc" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={formatTooltip}/>
          <Area type="monotone" dataKey="quote" stroke={this.props.color} fillOpacity={1} fill={this.props.color} />
        </AreaChart>
       </div>
       </div>
      </div>
    );
  }
}

PriceHistory.propTypes = {
  coin: PropTypes.string,
  color: PropTypes.string,
  //priceHistoryBTCUSD: PropTypes.object,
};

