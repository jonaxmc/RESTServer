# Servidor RESTful con NodeJS

## Descripción:
Aplicación desarollada en NodeJS utilizando servidor RESTFUL y conectada a MongoDB, en ella se puede realizar pequeñas peticiones HTTP con métodos como GET, POST, PUT y DELETE. 
Para el desarrollo de ésta página fueron utilizados ciertos elementos que se listan a continuación:
- ***Express:*** Es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares.
- ***Mongoose:*** Es una biblioteca de JavaScript que permite definir esquemas con datos fuertemente tipados.
- ***Body-parser:*** Analiza los cuerpos de solicitud entrantes en un middleware antes de sus manejadores.
- ***mongoose-beautiful-unique-validation:*** Complemento para Mongoose que convierte los errores duplicados en errores de validación regulares de Mongoose.
- ***Bcrypt:*** Es una función de hashing de passwords, sirve para encriptar contraseñas.
- ***Underscore:*** Es una biblioteca de JavaScript que ofrece más de 100 funciones útiles para manipular datos.

### La estructura de la página está de la siguiente manera:
```
RESTServer
├── server
|   ├── config
|   ├── models
|   ├── routes
|   ├── server.js
├── node_modules
├── .gitignore
├── README.MD
├── package.json
```

## Ejecución:

Recuerda instalar los paquetes

```
npm install
```
Para correr la aplicación ejecutar el siguiente comando:
```
node server/server.js
```
