import React from "react";

export class QuoteRow extends React.Component {
    render(){

          if (this.props.highlight){
            return(                
             <tr className="bg-best-price">
              <td>>{this.props.source} </td>
              <td>{this.props.quote}</td>
              <td>{this.props.amt}</td>
              <td>{this.props.estimSavings}</td>
              <td>{this.props.savingsUSD}</td>
             </tr>
             );
          }
          else {
            return(
             <tr>
              <td>{this.props.source}</td>
              <td>{this.props.quote}</td>             
              <td>{this.props.amt}</td>
              <td>{'N/A'}</td>    
              <td>{'N/A'}</td>                         
             </tr>
             );
          }
    }
}
