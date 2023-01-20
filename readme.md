# Manual de usuario - Bot camiseta AFA 2023


## Requisitos previos

1. Instalar [Node.js] (https://nodejs.org/en/)


## Pasos ejecución

1. Abrir terminal en ubicación del file.
2. Instalar dependencias con el comando `npm i`.
3. Correr el bot con el comando `npm start`.


## Configuración del bot

- Para configurar el tiempo de comprobación, se debe modificar el valor de la constante `CHECK_INTERVAL` en `index.js`.
Por ejemplo, para realizar un chequeo cada 30 segundos, se debería colocar:
```js
const CHECK_INTERVAL = 30000;
```

- En caso de querer configurar los talles a chequear, se puede modificar el array `WATCH_VARIANTS` en `index.js`.
Por ejemplo, para que sólo detecte los talles `M` y `L`, se debería colocar:
```js
const WATCH_VARIANTS = ['M', 'L'];
```

- Si bien el bot está configurado para chequear la camiseta de las 3 estrellas (`IB3592`), se puede modificar el SKU del producto deseado modificando la variable `SKU ` en `index.js`. Solamente se debe tener en cuenta que los talles de Adidas varían de acuerdo a la categorización del producto (los talles de niños están expresados en edades y los talles unisex se expresan de otra forma también) por lo que además de modificar la variable mencionada, se deberá ajustar el array `WATCH_VARIANTS`.
Por ejemplo, para chequear la camiseta de 3 estrellas de niño, se debería colocar:
```js
const SKU = 'IB3592'; //https://www.adidas.com.ar/camiseta-titular-argentina-3-estrellas-2022/IB3592.html
const WATCH_VARIANTS = ['7-8 AÑOS', '9-10 años', '11-12 años', '13-14 años', '15-16 años'];
```


## ¿Cómo funciona?

Cada cierto tiempo (definido en `CHECK_INTERVAL`, por defecto 1 minuto) consulta la API de Adidas para ver si hay disponibilidad de la camiseta. En este momento aparece un mensaje "Checked at (FECHA Y HORA)".

Si no hay disponibilidad, no muestra nada.

En caso que exista disponibilidad de los talles de interés (definidos en `WATCH_VARIANTS`), comenzará a emitir una alerta de Windows para cada talle que haya matcheado.


## Feature | Configurar envío de mail

Adicionalmente, se puede configurar un envío de mail utilizando smtp.gmail.com con NodeMailer. Para ello se deberá crear un archivo .env con las credenciales de gmail. Ejemplo:
```
EMAIL_USERNAME = tuemail@gmail.com

EMAIL_PASSWORD = tuAppKey
```

La clave debe ser generada desde tu cuenta de gmail, el siguiente tutorial explica como generarla: https://nodemailer.com/usage/using-gmail/.

Por defecto, las líneas de código en index.js que sirven para ejecutar el envío de mail están comentadas, solamente descomentando dichas líneas, configurando destinatario y seteando talle específico se activaría el envío.