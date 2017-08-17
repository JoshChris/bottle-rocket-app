import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Restaurant } from './restaurant';

@Injectable()
export class GetJsonService{
    constructor(private http : Http){
    }

    getAll(): Observable<Restaurant[]>{
        let restaurants$ = this.http
            .get(`https://raw.githubusercontent.com/JoshChris/bottle-rocket-app/master/restaurants.json?cachebuster=8asdf87qwa4f`, { headers: this.getHeaders()})
            .map(mapRestaurants)
            .catch(handleError);
            return restaurants$;
    }

    private getHeaders(){
        // I included these headers because otherwise FireFox
        // will request text/html
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}


function mapRestaurants(response:Response): Restaurant[]{
    // The response of the API has a results
    // property with the actual results
    return response.json().restaurants.map(toRestaurant)
}

function toRestaurant(r:any): Restaurant{
    let restaurant = <Restaurant>({
        active: false,
        name: r.name,
        backgroundImageURL: r.backgroundImageURL,
        category: r.category,
        contact: r.contact,
        location: r.location,
        lat: r.location.lat,
        lng: r.location.lng
    });
    return restaurant;
}

// this could also be a private method of the component class
function handleError (error: any) {
    // log error
    // could be something more sofisticated
    let errorMsg = error.message || `Could not retrieve list of restaurants. Please try again later`
    console.error(errorMsg);

    // throw an application level error
    return Observable.throw(errorMsg);
}
