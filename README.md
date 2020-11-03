<h1>MiniFramework com Slim e RainTPL</h1>

<h2>Requisitos</h2>

<ul>
  <li>Php >= 7.0</li>
  <li>Slim >= 2.0</li>
  <li>RainTPL >= 3.0</li>
  <li>Autoload psr-4</li>
</ul>

<h2>Configuração Local</h2>

<p>Nesse exemplo estou utilizando o Xampp para rodar o projeto localmente.</p>
<p>Colocar a linha de código abaixo dentro da pasta <strong>xampp\apache\conf\extra\httpd-vhosts</strong></p>

```
<VirtualHost *:80>
    ServerAdmin email@seuemail.com.br
    DocumentRoot "C:/xampp/htdocs/seuprojeto"
    ServerName www.projetolocal.com.br
    ErrorLog "logs/dummy-host2.example.com-error.log"
    CustomLog "logs/dummy-host2.example.com-access.log" common
    <Directory "C:/xampp/htdocs/seuprojeto">
        Require all granted

        RewriteEngine On

        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^ index.php [QSA,L]
    </Directory>
</VirtualHost>
```

<p>Depois de ter adicionado o código acima, basta ir no diretório <strong>C:\Windows\System32\drivers\etc\hosts</strong> e adicionar o código abaixo.</p>
<p>O windows não irá deixar editar o arquivo hosts dentro dessa pasta. Basta copiar o arquivo para uma outra pasta fora do C:\Windows e adicionar o código e depois substituir o arquivo original do diretório citado acima.</p>
<p>Lembrando que a mesma URL usada abaixo tem que ser a mesma URL do código acima onde diz "ServerName".</p>

```
127.0.0.1		www.projetolocal.com.br
```

<h2>Estrutura de pasta</h2>

```	
App
  Classe
  Config
  Controller
  Model
  Views
    site
      header.html
      footer.html
      inicio.html
    admin
  Views-cache

res
  site
    imagem
    css
    js
    fontes
  admin
    Template AdminLTE

Route
  site
  admin

vendor

composer.json
composer.lock
index.php
readme.md
```

<p>Dentro da pasta Classe tem alguns exemplos de como fazer o get e set das classes de forma automatizada.</p>
<p>Exemplo: pode enviar um post dentro da função setData e depois vizualizar com o get. exemplo abaixo meramente ilustrativo.</p>

```
//Supondo que o post seja assim
$_POST[nome] = "joao";

//Basta instanciar a classe
$pessoa = new Pessoa;

//Passar o post
$pessoa->setData($_POST);

//Recuperar o a informação
$pessoa->getnome();

//Se tiver mais de um campo no post exemplo [nome] e [idade] os gets irão ser getnome e getidade
```

<h2>Exemplo de Route</h2>

<p>Iniciando um projeto simples.</p>
<p>get("/") -> é o caminho da url que deve ser chamada para que essa rota seja acessada.</p>
<p>setTpl("inicio") -> inicio é a página que esta dentro da pasta /App/views/site</p>
<p>Quando deixa o "new Page()" vazio ele pega o header e o footer da pasta /App/views/site e usa a página inicio entre elas.</p>
<p>Para mais informação consulte a <a href="https://www.slimframework.com/docs/v2/">documentação do slim</a></p>

```
<?php

use \App\Config\Page;

$app->get("/", function(){

	$page = new Page();

	$page->setTpl("inicio");
});

?>
```

<p>Separamos o header e footer em arquivos separados para não precisar colocar eles em todas as páginas criadas, assim apenas programando o corpo da pagina que o framework já adiciona o header e o footer sozinho</p>
<p>Para não usar o header e footer padrão do seu template em uma página, basta setar como false.</p>

```
$app->get("/", function(){

	$page = new Page([
		"header" => false,
		"footer" => false
	]);

	$page->setTpl("inicio");
});
```

<p>Passando parâmetros nas paginas.</p>
<p>Vamos dizer que você quer exibir uma lista na página inicio.</p>
<p>Nesse exemplo estamos puxando o getLista de dentro do Controller Teste, supondo que a variavel lista esteja com um array armazenado nela, basta então passa-la como um segundo parametro de setTpl como mostra o exemplo abaixo.</p>

```
<?php

use \App\Config\Page;
use \App\Controller\Teste;

$app->get("/", function(){
	
  $lista = Teste::getLista();

	$page = new Page();

	$page->setTpl("assinar-plano", [
		"lista" => $lista
	]);
});

?>
```

<h2>Usando variaveis dentro das Views</h2>

<p>No exemplo acima mandamos uma lista para página inicio, agora vamos recuperar essa variavel dentro da página Inicio e exibila.</p>
<p>Para exibir as variaveis dentro do html usamos {}.</p>
<p>Para mais informação acesse a <a href="https://github.com/feulf/raintpl/wiki/Documentation-for-web-designers">documentação do rainTpl aqui.</a></p>

```
//Supondo que a lista estivesse assim

[0]
  [nome] = "Joao"
[1]
  [nome] = "Maria"

<!DOCTYPE html>
<html>
<head>
	<title>Exibindo lista</title>
</head>
<body>
	<ul>
		{loop="$lista"}
		<li>{$value.nome}</li>
		{/loop}
	</ul>
</body>
</html>
```

<h2>Subindo projeto em uma hospedagem</h2>

<p>Basta adicionar o .htaccess no inicio do diretório.</p>
<p>Rodando localmente não precisa adicionar o .htaccess.</p>

```
### REDIRECIONAMENTO SSL ###
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

<h2>Dentro do meu repositório tem varios projetos criados com esse framework</h2>
<ul>
  <li>
    <a href="https://github.com/igorrogi1603/Processo-seletivo-emergencial-saude-2020">Processo Saude</a>
  </li>
  <li>
    <a href="https://github.com/igorrogi1603/form-cadastro-educacao">Cadastro Educação</a>
  </li>
</ul>

<h2>Template usado no admin</h2>

<p>Template se chama <a href="https://adminlte.io/themes/AdminLTE/documentation/index.html#introduction">AdminLTE</a></p>
