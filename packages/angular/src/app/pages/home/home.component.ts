import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  showInitializeMessage: boolean = true;
  showBuildParameters: boolean = false;
  showCallFunction: boolean = false;
  showSuccessCard: boolean = false;

  ngOnInit(): void {
  }

  toggleBuildParameters() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showInitializeMessage = !this.showInitializeMessage;
  }

  toggleCallFunction() {
    this.showBuildParameters = !this.showBuildParameters;
    this.showCallFunction = !this.showCallFunction;
  }

  toggleSuccessCard() {;
    this.showCallFunction = !this.showCallFunction;
    this.showSuccessCard = !this.showSuccessCard;
  }

  backToStart() {
    this.showInitializeMessage = true;
    this.showBuildParameters = false;
    this.showCallFunction = false;
    this.showSuccessCard = false;
  }
}
