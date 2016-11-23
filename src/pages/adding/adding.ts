import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Transaction } from '../../database';
import { GeolocationService } from '../../services/geolocation.service';
/*
  Generated class for the Adding page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-adding',
  templateUrl: 'adding.html'
})
export class AddingPage {

  model : Transaction;
  shuldGeolocate : boolean = false;
  shuldSend : boolean = true;


  constructor(public navCtrl: NavController, public geolocatior : GeolocationService) {
    this.model = new Transaction(null,"");
  }

  ionViewDidLoad() {

  }

  getLocation(){
    if(this.shuldGeolocate){
      this.shuldSend = false;
      this.geolocatior.get().then((result) => {
        this.model.setCoords(result.coords);
        console.log(this.model);
        this.shuldSend = true;
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      this.model.cleanCoords();
      console.log(this.model);
    }

  }
  save(){
    if(this.shuldSend){
      this.model.save().then((result) => {
        this.model = new Transaction(null,"");
        this.navCtrl.pop();
      });
    }

  }

}
