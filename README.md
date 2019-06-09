# MadridCentralApp

Aplicación web cuyo principal objetivo es probar algunas tecnologías que permiten crear aplicaciones descentralizadas. 
En concreto, se usará la plataforma Ethereum y las herramientas Truffle y Drizzle. Para el desarrollo de la aplicación 
web se utilizará React.

Como caso de estudio para probar estas tecnologías se utilizará la zona de bajas emisiones de Madrid (Madrid Central). 
El Ayuntamiento permite a cada residente de esta zona hacer un máximo de 20 invitaciones diarias, pero es poco probable
que se haga uso de todas ellas. Esta aplicación propone una alternativa para dar salida a las invitaciones que no se usen, 
pudiendose obtener un beneficio económico por ellas. Además, será muy fácil conseguir una de estas invitaciones si no eres
un residente de esta zona.

## Descarga y despliegue de la app

Para descargar y probar la aplicación, el primer paso es clonar el repositorio:

```
git clone https://github.com/rodrimart97/MadridCentralApp
```

Una vez clonado, es necesario acceder al directorio:

```
cd MadridCentralApp
```

En su interior, es necesario ejecutar el siguiente comando para instalar los paquetes necesarios para el proyecto:

```
npm install
```

Una vez instalado, el siguiente paso es compilar los contratos usando Truffle:

```
npx truffle compile –all
```

Para poder desplegar los contratos en la red es necesario abrir la aplicación de Ganache y ejecutar el siguiente comando:

```
truffle migrate –reset
```

Una vez ejecutado, será necesario entrar en el directorio de la aplicación web:

```
cd madrid-central/src
```

En su interior, es necesario realizar de nuevo la instalación de los paquetes necesarios:

```
npm install
```

Como último paso, solo queda ejecutar la aplicación para poder usarla:

```
npm start
```

Llegados a este punto, ya será posible acceder a la aplicación desde el navegador, donde Metamask pedirá autorización
para conectarse con tus cuentas de Ganache. Una vez aceptado, se podrá elegir la cuenta que se desee e interactuar con 
todas las funciones de la aplicación.




