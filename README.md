# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

Recuerden que deben de reconstruir los módulos de node con el comando

<br>
Para reiniciar el conteo colocar "hoy":0 y reiniciar el servidor 
```
npm install
```

### Emitir sockets

Los sockets emiten con tres arguementos

```javascrypt
client.emmit(nombre, data, callback)
```

### Objeto window

El objeto window contiene información del de los parametros del search tambien
<br>
El escritorio es un parametro pasado por el url.

```javascript
var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("escritorio"));
if (searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");
```

### Falta

Controlar que no existan escritorios repetidos
