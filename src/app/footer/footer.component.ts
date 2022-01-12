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
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //   }
    //   this.markers.push({
    //     position: {
    //       lat: 10.673513248593828,
    //       lng: 106.58188900991618,
    //     },
    //     label: {
    //       color: 'lightgray',
    //       text: 'Shop here' + (this.markers.length + 1),
    //     },
    //     options: { animation: google.maps.Animation.BOUNCE },
    //   },
    //   )
    // })
    this.center = {
      lat: 10.673513248593828,
      lng: 106.58188900991618,
    }
    this.markers.push({
      position: {
        lat: 10.673513248593828,
        lng: 106.58188900991618,
      },
      label: {
        color: 'lightgray',
        text: 'Shop here' + (this.markers.length + 1),
      },
      options: { animation: google.maps.Animation.BOUNCE },
    },
    )
  }

}