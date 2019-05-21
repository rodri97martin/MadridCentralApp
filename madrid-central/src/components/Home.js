import React from 'react';
import { Card } from 'react-bootstrap';

const Home = () => {
	return (
		<div>
			<br></br>
			<Card>
				<h2>Madrid Central</h2>
				<p>
					Gracias a esta aplicación podrás pedir invitaciones para entrar en Madrid Central de una manera muy sencilla.
					Además, si vives en el centro de Madrid, podrás poner a disposición del público tus invitaciones y obtener un 
					beneficio a cambio.
				</p>
				<p>
					<strong>Si eres un residente</strong> de Madrid Central, solo será necesario registrarse y elegir el precio y el número de 
					invitaciones ofrecidas. Cuando tu invitación sea utilizada por un invitado, recibirás el saldo correspondiente 
					en tu cuenta.
				</p>
				<p>
					<strong>Si quieres una invitación</strong> para Madrid Central un día en concreto, solo será necesario entrar en la 
					página web ese mismo día y pedir la invitación. Para ello tiene que haber saldo disponible en tu
					cuenta.
				</p>
				
				<p>
					Más información sobre Madrid Central: <a href="https://www.madrid.es/portales/munimadrid/es/Inicio/Movilidad-y-transportes/Madrid-Central-Zona-de-Bajas-Emisiones/Informacion-general/Madrid-Central-Informacion-General/?vgnextfmt=default&vgnextoid=a67cda4581f64610VgnVCM2000001f4a900aRCRD&vgnextchannel=088e96d2742f6610VgnVCM1000001d4a900aRCRD">Ayuntamiento de Madrid</a>
				</p>
			</Card>
		</div>
	);
}

export default Home;