import React from 'react';
import PropTypes from 'prop-types';
import { AreaChart, XAxis, YAxis, Area, CartesianGrid, Tooltip } from 'recharts';

const moment = require('moment');

function formatXAxis(tickItem) {
  let myMoment = moment.unix(tickItem);
  return moment(myMoment).format('MMM Do');
}

function formatTooltip(item) {
   return (Math.trunc(item * 10000) / 10000) + ' btc';
}

export class PriceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.handlePriceSelect = this.handlePriceSelect.bind(this);    
    this.state = {
      priceHistoryCoinBTC: [],
      isLoading: true,
      show: true,
      xaxisMin: 'dataMin',    
    };
  }

  handlePriceSelect(event) {
    const myDateRange = parseInt(event.target.value);    
    if (myDateRange !== 0) {
      const maxDateRange = 90;
      const maxSamples = this.state.priceHistoryCoinBTC.length;
      const myNumSamples = Math.trunc(maxSamples * (myDateRange/maxDateRange));   
      const minTimestamp = this.state.priceHistoryCoinBTC[maxSamples - myNumSamples].tstamp;
      this.setState({ 
        xaxisMin: minTimestamp,
        show: true,
      });
    }
    else {
      this.setState({ show: false });
    }
  }

  massageData(coinVsUSD, btcVsUSD) {
    let coinVsBTC = [];
    let length = 0;

    if (coinVsUSD.length < btcVsUSD.length) {
      length = coinVsUSD.length;
    }
    else {
      length = btcVsUSD.length
    }

    for (var i = 0; i < length - 1; i += 1) {
      coinVsBTC.push({
        quote: (coinVsUSD[i].quote / btcVsUSD[i].quote),
        tstamp: moment(coinVsUSD[i].tstamp).unix(),
      });
    }
    return coinVsBTC;
  }

  componentDidMount() {
    return fetch(`http://localhost:8080/price_history/${this.props.coin}`)
      .then(response => response.json())
      .then((responseJson) => {
        return this.massageData(responseJson, this.props.priceHistoryBTCUSD);
      })
      .then((data) => {
        this.setState({ 
          priceHistoryCoinBTC: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      }
    );
  }

  renderAreaChart() {
    if(this.state.show) {    
      return (
       <div className="bg-area-chart">
        <div className="border-area-chart">
          <AreaChart
            width={730}
            height={250}
            data={this.state.priceHistoryCoinBTC}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
          <XAxis 
            dataKey="tstamp" 
            type="number" 
            minTickGap={150} 
            tickFormatter={formatXAxis} 
            domain={[this.state.xaxisMin, 'dataMax']}
            allowDataOverflow={true}
          />
          <YAxis 
            dataKey="quote" 
            type="number" 
            unit="btc" 
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={formatTooltip} />                    
          <Area 
            type="monotone" 
            dataKey="quote" 
            stroke={this.props.color} 
            fillOpacity={1} 
            fill={this.props.color} 
          />        
          </AreaChart>
        </div>
       </div>
      );
    }
    else {
      return (
        <div>
          <p>Select date range to show price history...</p>
        </div>
      );  
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading price history...</p>
        </div>
      );
    }
    else {
    return (
      <div> 
        <div>
          <label>Price Trends:</label>        
          <select onChange={this.handlePriceSelect} defaultValue="90">          
             <option value="7">7 days</option>
             <option value="30">30 days</option>                 
             <option value="90">90 days</option>
             <option value="0">Hide</option>
          </select>
          </div>
          {this.renderAreaChart()}
        </div>
      );
    }
  }
}

PriceHistory.propTypes = {
  coin: PropTypes.string,
  color: PropTypes.string,
  //priceHistoryBTCUSD: PropTypes.object,
};

