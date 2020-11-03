<?php

use \App\Classe\Usuario;
use \App\Config\PageAdmin;

$app->get("/admin", function(){

	Usuario::verifyLogin();

	$page = new PageAdmin();

	$page->setTpl("inicio");
});

?>