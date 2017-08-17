/*global $ Waypoint google*/ //globalizing jQuery

var globalmap;
var globalmarkers = [];

function makeSlug(value) {
    "use strict";
    return value.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}


$(function () {
    "use strict";

    /*****************
     *
     * GLOBAL JQUERY
     *
     *****************/
    //Setup Sticky header
    var waypoints = $('header').waypoint(function () {
        $('header').toggleClass("sticky");
    }, {
        offset: '-15px'
    });

    if ($(document).scrollTop() > 15) {
        $('header').addClass("sticky");
    }

    //parse feed with json
    var restaurants = $.ajax({
        type: "GET",
        url: "http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/restaurants.json",
        dataType: "json" //set to JSON
    });

    //resolve ajax promise
    restaurants.done(function (json) {
        $.each(json.restaurants, function (key, restaurant) {

            restaurant.key = key;
            //appending item
            var tmpl = $.templates("#list-item-template"); // Get compiled template
            var html = tmpl.render(restaurant); // Render template using data - as HTML string

            $("ul.restaurant-list").append(html).promise().done(function () {
                var r_location = {lat: restaurant.location.lat, lng: restaurant.location.lng};
                var map = new google.maps.Map(document.getElementById("map-" + makeSlug(restaurant.name)), {
                    zoom: 16,
                    center: r_location,
                    styles: [{featureType: "administrative", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "landscape.man_made", elementType: "all", stylers: [{hue: "#43E895"}, {lightness: "50"}, {weight: "2.62"}, {saturation: "-100"}]}, {featureType: "landscape.natural", elementType: "all", stylers: [{color: "#f6f6f6"}]}, {featureType: "poi", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.attraction", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.business", elementType: "all", stylers: [{hue: "#43E895"}, {saturation: "-100"}]}, {featureType: "poi.government", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.park", elementType: "all", stylers: [{hue: "#43E895"}, {saturation: "5"}, {lightness: "38"}, {visibility: "on"}]}, {featureType: "road.highway", elementType: "all", stylers: [{hue: "#43E895"}, {weight: "1.5"}]}, {featureType: "road.arterial", elementType: "all", stylers: [{visibility: "on"}, {weight: "2"}, {hue: "#43E895"}]}, {featureType: "road.arterial", elementType: "labels", stylers: [{hue: "#43E895"}]}, {featureType: "road.arterial", elementType: "labels.text", stylers: [{hue: "#43E895"}]}, {featureType: "road.local", elementType: "all", stylers: [{saturation: "-85"}, {lightness: 100}, {visibility: "on"}, {weight: "1"}, {hue: "#43E895"}]}, {featureType: "road.local", elementType: "labels", stylers: [{hue: "#ffd000"}, {saturation: "94"}]}, {featureType: "road.local", elementType: "labels.text", stylers: [{color: "#34b379"}, {weight: "0.5"}, {lightness: "35"}, {saturation: "-26"}, {visibility: "simplified"}]}, {featureType: "water", elementType: "all", stylers: [{saturation: "-77"}, {lightness: "-17"}, {visibility: "on"}, {hue: "#43E895"}]}]
                });
                var marker = new google.maps.Marker({
                    position: r_location,
                    map: map,
                    icon: "public/img/map-icon.png"
                });
            });
        });

        //if we're on the map page
        if ($("#map").length > 0) {
            globalmap = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: {lat: json.restaurants[0].location.lat, lng: json.restaurants[0].location.lng},
                styles: [{featureType: "administrative", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "landscape.man_made", elementType: "all", stylers: [{hue: "#43E895"}, {lightness: "50"}, {weight: "2.62"}, {saturation: "-100"}]}, {featureType: "landscape.natural", elementType: "all", stylers: [{color: "#f6f6f6"}]}, {featureType: "poi", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.attraction", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.business", elementType: "all", stylers: [{hue: "#43E895"}, {saturation: "-100"}]}, {featureType: "poi.government", elementType: "all", stylers: [{hue: "#43E895"}]}, {featureType: "poi.park", elementType: "all", stylers: [{hue: "#43E895"}, {saturation: "5"}, {lightness: "38"}, {visibility: "on"}]}, {featureType: "road.highway", elementType: "all", stylers: [{hue: "#43E895"}, {weight: "1.5"}]}, {featureType: "road.arterial", elementType: "all", stylers: [{visibility: "on"}, {weight: "2"}, {hue: "#43E895"}]}, {featureType: "road.arterial", elementType: "labels", stylers: [{hue: "#43E895"}]}, {featureType: "road.arterial", elementType: "labels.text", stylers: [{hue: "#43E895"}]}, {featureType: "road.local", elementType: "all", stylers: [{saturation: "-85"}, {lightness: 100}, {visibility: "on"}, {weight: "1"}, {hue: "#43E895"}]}, {featureType: "road.local", elementType: "labels", stylers: [{hue: "#ffd000"}, {saturation: "94"}]}, {featureType: "road.local", elementType: "labels.text", stylers: [{color: "#34b379"}, {weight: "0.5"}, {lightness: "35"}, {saturation: "-26"}, {visibility: "simplified"}]}, {featureType: "water", elementType: "all", stylers: [{saturation: "-77"}, {lightness: "-17"}, {visibility: "on"}, {hue: "#43E895"}]}]
            });

            var bounds = new google.maps.LatLngBounds();
            $.each(json.restaurants, function (key, restaurant) {
                var place = new google.maps.LatLng(restaurant.location.lat, restaurant.location.lng);
                var marker = new google.maps.Marker({
                    position: place,
                    map: globalmap,
                    icon: "public/img/map-icon.png"
                });
                var contentString = '<div class="map-info">' +
                        '<img class="restaurant-image" src=' + restaurant.backgroundImageURL + ' alt="' + restaurant.name + '" />' +
                        '<h1>' + restaurant.name + '</h1>' +
                        '<h2>' + restaurant.location.formattedAddress[0] +
                        '<br>' + restaurant.location.formattedAddress[1] +
                        '</h2>' +
                        '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                bounds.extend(place);

                marker.addListener('click', function () {
                    infowindow.open(globalmap, marker);
                    //$("#" + makeSlug(restaurant.name)).toggleClass("open");
                });
                globalmarkers.push(marker);
            });
            globalmap.fitBounds(bounds);
        }
    });

    //deal with failure
    restaurants.fail(function () {
        $("header").after("<div class='access_error'>Unable to retrieve data. Please try again later.</div>");
    });

    /*****************
     *
     * ACTIONS
     *
     *****************/

    $(document).on("click", ".list-item .item-hero", function (e) {
        e.preventDefault();

        if ($("#map").length > 0) {
            var r_location = new google.maps.LatLng($(this).parents(".list-item").data("lat"), $(this).parents(".list-item").data("lng"));
            globalmap.setCenter(r_location);
            globalmap.setZoom(16);

            google.maps.event.trigger(globalmarkers[$(this).parents(".list-item").data("key")], 'click');

        } else {
            $(this).parents(".list-item").toggleClass("open");
            $('html, body').animate({scrollTop: parseInt($(this).offset().top) - 50}, 1000);
        }
    });

    $(document).on("click", ".list-item .close-btn", function (e) {
        e.preventDefault();
        $(this).parents(".list-item").toggleClass("open");
    });


     /*****************
     *
     * HELPER FUNCTIONS
     *
     *****************/

    $.views.converters("slug", function (val) {
        return makeSlug(val);
    });
});

