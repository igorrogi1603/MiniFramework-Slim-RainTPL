<?php

use \App\Classe\Validacao;
use \App\Config\Page;

$app->get("/", function(){

	$page = new Page();

	$page->setTpl("inicio");
});

?>