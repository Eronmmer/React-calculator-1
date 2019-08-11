import React, { Component } from "react";
import Button from "./components/Button";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      current: [],
      evaluate: [],
      mode: {
        type: "calculator",
        format: "standard"
      }
    };
  }

  compute = symbol => {
    if (symbol === "C") {
      this.setState({
        current: [],
        display: "0",
        evaluate: []
      });
    } else if (symbol === "Del") {
      this.setState({
        display: this.state.display.slice(0, this.state.display.length - 1)
      });
      setTimeout(() => {
        if (this.state.display === "") {
          this.setState({ display: "0" });
        }
        this.setState({ evaluate: [this.state.display] });
      }, 5);
    } else if (
      symbol === "/" ||
      symbol === "*" ||
      symbol === "-" ||
      symbol === "+"
    ) {
      const display = this.state.display;
      this.setState({ current: [...this.state.current, display, symbol] });
      setTimeout(() => {
        this.setState({
          display: "0"
        });
      }, 5);
    } else if (symbol === ".") {
      if (!this.state.display.includes(".")) {
        this.setState({
          evaluate: [...this.state.evaluate, "."],
          display: this.state.display + "."
        });
      }
    } else if (symbol === "=") {
      if (!isNaN(this.state.evaluate[this.state.evaluate.length - 1])) {
        const toEvaluate = eval(this.state.evaluate.join(""));
        this.setState({ display: String(toEvaluate), current: [] });
      }
    } else {
      this.setState({
        display:
          this.state.display === "0" ? symbol : this.state.display + symbol
      });
      setTimeout(() => {
        this.setState({
          evaluate: [...this.state.current, this.state.display]
        });
      }, 3);
    }

    // the setTimeout's in this scope of code is done because of the synchronous nature of how setState works in functions or this is just a lazy hack 🤷
  };

  render() {
    const buttons = [
      { symbol: "C", cols: 2, action: this.compute },
      { symbol: "Del", cols: 1, action: this.compute },
      { symbol: "/", cols: 1, action: this.compute },
      { symbol: "7", cols: 1, action: this.compute },
      { symbol: "8", cols: 1, action: this.compute },
      { symbol: "9", cols: 1, action: this.compute },
      { symbol: "*", cols: 1, action: this.compute },
      { symbol: "4", cols: 1, action: this.compute },
      { symbol: "5", cols: 1, action: this.compute },
      { symbol: "6", cols: 1, action: this.compute },
      { symbol: "-", cols: 1, action: this.compute },
      { symbol: "1", cols: 1, action: this.compute },
      { symbol: "2", cols: 1, action: this.compute },
      { symbol: "3", cols: 1, action: this.compute },
      { symbol: "+", cols: 1, action: this.compute },
      { symbol: "0", cols: 2, action: this.compute },
      { symbol: ".", cols: 1, action: this.compute },
      { symbol: "=", cols: 1, action: this.compute }
    ];
    return (
      <div className="container">
        <div className="result">{this.state.display}</div>
        {buttons.map((btn, index) => {
          return (
            <Button
              key={index}
              symbol={btn.symbol}
              cols={btn.cols}
              action={btn.action}
              gridClass={`col-${btn.cols}`}
            />
          );
        })}
      </div>
    );
  }
}
