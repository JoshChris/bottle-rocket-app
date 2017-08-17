<?php $this->layout('includes/main.plates', ['title' => 'Bottle Rocket | Restaurant List']) ?>

<div class="wrapper">
    <header>
        <h1>Lunch Tyme</h1>
        <nav>
            <a class="map" href="./map">Map</a>
        </nav>
    </header>
    <div class="list-view">
        <ul class="restaurant-list">
            <script id="list-item-template" type="text/x-jsrender">
                <li class="list-item">
                    <div class="item-hero isToggle" id="">
                        <img src="{{:backgroundImageURL}}" alt="{{:name}}" />
                        <div class="title-and-cat">
                            <h2>{{:name}}</h2>
                            <h3>{{:category}}</h3>
                        </div>
                    </div>
                    <div class="item-details">
                        <div class="detail-header">
                            <button class="close-btn">Close</button>
                        </div>
                        <div class="detail-image"><img src="{{:backgroundImageURL}}" alt="{{:name}}" /></div>
                        <div class="map" id="map-{{slug:name}}">
                            
                        </div>
                        <div class="title-and-cat">
                            <div class="wrapper">
                            <h2>{{:name}}</h2>
                            <h3>{{:category}}</h3>
                            </div>
                        </div>
                        <div class="detail-wrapper">
                            <p class="address">
                                <span>{{:location.formattedAddress[0]}}</span><br/>
                                <span>{{:location.formattedAddress[1]}}</span>
                            </p>
                            {{if contact && contact.formattedPhone}}
                                <p class="phone">{{:contact.formattedPhone}}</p>
                            {{/if}}
                            {{if contact && contact.twitter}}
                                <p class="twitter"><a target="_blank" href="http://www.twitter.com/{{:contact.twitter}}">@{{:contact.twitter}}</a></p>
                            {{/if}}
                        </div>
                    </div>
                </li>
            </script>
        </ul>
    </div>
</div>
