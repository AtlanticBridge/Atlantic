import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

// --- FORT AWESOME ---
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { timer } from 'rxjs';

@Component({
  selector: 'app-eth-faucet',
  templateUrl: './eth-faucet.component.html',
  styleUrls: ['./eth-faucet.component.scss'],
  animations: [
    trigger('slideInOut', [
      state("open", style({
        width: "340px"
      })),
      state("close", style({
        width: "40px"
      })),
      transition("open => close", animate("400ms")),
      transition("close => open", animate("600ms"))
    ])
  ]
})
export class EthFaucetComponent implements OnInit {

  faTimesCircle = faTimesCircle;
  show: boolean = false;
  closed: boolean = true;
  slider: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  get stateSlider() {
    return this.slider ? "open" : "close"
  }

  touchSlider() {
    this.slider = !this.slider;
    if(this.closed) {
      var t = timer(600);
    } else {
      var t = timer(0.1);
    }

    t.subscribe(() => {
      this.closed = !this.closed;
    });
  }

  touchFaucet() {
    // alert('You closed the Faucet')
    this.show = !this.show;
    if(this.closed) {
      var t = timer(1000);
    } else {
      var t = timer(600);
    }

    t.subscribe(() => {
      this.closed = !this.closed;
    });
  }

}
