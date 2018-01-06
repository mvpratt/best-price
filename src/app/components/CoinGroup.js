import React from "react";

export class CoinGroup extends React.Component {
    render(){
      return(
       <div>
       <form>
         <label className="example-send-yourself-copy">
           <input type="checkbox" name="showEthereum"></input>
           <span className="label-body">Ethereum</span>
         </label>
         <label className="example-send-yourself-copy">
           <input type="checkbox" name="showLitecoin"></input>
           <span className="label-body">Litecoin</span>
         </label>
         <label className="example-send-yourself-copy">
           <input type="checkbox" name="showDash"></input>
           <span className="label-body">Dash</span>
         </label> 
        </form> 
        </div>
      );
    }
}
