<?php

namespace App\Model;

use \App\Config\Conexao;
use \App\Classe\Usuario;
use \App\Classe\Validacao;
	

class MUsuario {

	const SESSION = "User";

	//Logar no sistema
	public static function login($login, $password)
	{
		$sql = new Conexao;

		$pessoa = $sql->select("
			SELECT * FROM tb_usuario a
			INNER JOIN tb_pessoa b ON a.idPessoa = b.idPessoa
			WHERE user = :user
		", array(
			":user"=>$login
		));	

		if (count($pessoa) === 0)
		{
			return false;
		}

		if (isset($pessoa) && $pessoa != null && $pessoa != "" && count($pessoa) != 0) {
			$data = $pessoa[0];
		}

		if (password_verify($password, $data["senha"]) === true)
		{
			$usuario = new Usuario();

			$usuario->setData($data);

			$_SESSION[Usuario::SESSION] = $usuario->getValues();

			return $usuario;

		} else {
			return false;
		}
	}

}

?>