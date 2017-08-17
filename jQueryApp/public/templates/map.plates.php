<?php $this->layout('includes/main.plates', ['title' => 'Bottle Rocket | Restaurant Map']) ?>

<div class="wrapper">
    <header>
        <h1>Lunch Tyme</h1>
        <nav>
            <a class="list" href="./list">List</a>
        </nav>
    </header>
    <div class="map-view">
        <div id="map">
            
        </div>
        <ul class="restaurant-list">
            <script id="list-item-template" type="text/x-jsrender">
                <li id="{{slug:name}}" class="list-item" data-key="{{:key}}" data-lat="{{:location.lat}}" data-lng="{{:location.lng}}">
                    <div class="item-hero isToggle">
                        <div class="image">
                            <img src="{{:backgroundImageURL}}" alt="{{:name}}" />
                        </div>
                        <div class="title-and-cat">
                            <div class="wrapper">
                                <h2>{{:name}}</h2>
                                <h3>{{:category}}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="item-details">
                        <div class="detail-image"><img src="{{:backgroundImageURL}}" alt="{{:name}}" /></div>
                        <div class="map" id="map-{{slug:name}}">
                            
                        </div>
                        <div class="title-and-cat">
                            <div class="wrapper">
                            <h2>{{:name}}</h2>
                            <h3>{{:category}}</h3>
                            <button (click)="active = !active" class="close-btn">Close</button>
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
