import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import currencies from '../../data/currencies.json'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  currencyData: { base: String, rates: {} } = currencies;
  currencyRatesList: {} = this.currencyData.rates;  //store the currency-rates keyvalue pairs
  currencyRatesValues: Array<number> = [];          //store the rounded rates
  increase: boolean = true;                        //use to determine rate background color
  counterTotal: number = 60;

  constructor() { }

  ngOnInit(): void {
    this.roundRate();
    this.scheduleMutations();
  }

  roundRate() {
    let values: number[];
    values = Object.values(this.currencyRatesList);
    for (let i = 0; i < values.length; i++) {
      let val: number;
      val = values[i];
      this.currencyRatesValues.push(Math.floor(val * 10000) / 10000);
    }
  }

  scheduleMutations() {
    setTimeout(() => {
      this.mutateRate();
    }, 5000);
  }

  mutateRate() {
    this.increase = Math.floor((this.counterTotal - 1) / 12) % 2 == 0;
    console.log(Math.floor((this.counterTotal - 1) / 12) + ", " + Math.floor((this.counterTotal - 1) / 12) % 2);
    this.counterTotal--;
    for (let i = 0; i < this.currencyRatesValues.length; i++) {
      this.currencyRatesValues[i] = this.increase ? this.increaseRate(this.currencyRatesValues[i]) :
        this.decreaseRate(this.currencyRatesValues[i]);
    }
    if (this.counterTotal > 0) {
      setTimeout(() => {
        this.mutateRate();
      }, 5000);
      // }
    }
  }

  increaseRate(rate: number): number {
    return rate + 0.0001;
  }

  decreaseRate(rate: number): number {
    return rate - 0.0001;
  }

  getColor() {
    if (this.increase == true) {
      return '#1e8132';
    }
    else {
      return '#eb3440';
    }
  }

  outputString(num: number): String {
    var numToOutput = num;
    if (numToOutput < 1.0001) {   //display numbers less than 1.0001 as 1.0001 until they actually become more then 1.0001
      numToOutput = 1.0001;
    }
    return numToOutput.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  }

}
