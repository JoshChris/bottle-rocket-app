<?php

require_once(__DIR__.'/vendor/autoload.php');

use \NoahBuscher\Macaw\Macaw;


//create Routes
Macaw::get('/', function() {
	// Create new Plates instance
	$templates = new League\Plates\Engine("public/templates/");

	//render list template
	echo $templates->render('list.plates');
});

//create Routes
Macaw::get('/list', function() {
	// Create new Plates instance
	$templates = new League\Plates\Engine("public/templates/");

	//render list template
	echo $templates->render('list.plates');
});

Macaw::get('/map', function() {
	// Create new Plates instance
	$templates = new League\Plates\Engine("public/templates/");
	//render map template
	echo $templates->render('map.plates');
});

//dispatch router
Macaw::dispatch();