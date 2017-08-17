import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant';

import { GetJsonService } from '../get-json.service';
import { SlugPipe } from '../slug';

@Component({
    selector: 'app-restaurant-list',
    templateUrl: './restaurant-list.component.html',
    styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
    isLoading;
    errorMessage;
    restaurants: Restaurant[] = [];
    zoom: number = 16;
    scrollwheel: boolean = false;
    iconUrl: string = "../assets/img/map-icon.png";

    mapStyle: object = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            },
            {
                "lightness": "50"
            },
            {
                "weight": "2.62"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f6f6f6"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            },
            {
                "saturation": "5"
            },
            {
                "lightness": "38"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#43E895"
            },
            {
                "weight": "1.5"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "2"
            },
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-85"
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            },
            {
                "weight": "1"
            },
            {
                "hue": "#43E895"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#ffd000"
            },
            {
                "saturation": "94"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#34b379"
            },
            {
                "weight": "0.5"
            },
            {
                "lightness": "35"
            },
            {
                "saturation": "-26"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-77"
            },
            {
                "lightness": "-17"
            },
            {
                "visibility": "on"
            },
            {
                "hue": "#43E895"
            }
        ]
    }
];


    constructor(
        private GetJsonService: GetJsonService) { }

    ngOnInit() {
    this.GetJsonService
        .getAll()
        .subscribe(r => this.restaurants = r);
    }

    scroll(el) {
        el.scrollIntoView();
    }
}
