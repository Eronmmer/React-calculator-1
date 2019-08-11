import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <div className={this.props.gridClass}>
        <div
          className="calcButton"
          onClick={() => this.props.action(this.props.symbol)}
        >
          {this.props.symbol === "*" ? "X" : this.props.symbol}
        </div>
      </div>
    );
  }
}
