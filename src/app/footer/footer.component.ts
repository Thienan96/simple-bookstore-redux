import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  center: google.maps.LatLngLiteral;
  markers: any[] = []
  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.markers.push({
        position: {
          lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
          lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
        },
        label: {
          color: 'lightgray',
          text: 'Shop here' + (this.markers.length + 1),
        },
        options: { animation: google.maps.Animation.BOUNCE },
      },
      {
        position: {
          lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
          lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
        },
        label: {
          color: 'lightgray',
          text: 'Shop here ' + (this.markers.length + 1),
        },
        options: { animation: google.maps.Animation.BOUNCE },
      },
      {
        position: {
          lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
          lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
        },
        label: {
          color: 'lightgray',
          text: 'Marker label ' + (this.markers.length + 1),
        },
        title: 'Shop here ' + (this.markers.length + 1),
        options: { animation: google.maps.Animation.BOUNCE },
      })
    })
  }

}
