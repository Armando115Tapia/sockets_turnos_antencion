// Comando para establecer la conexion activo-activo con el servidor
var socket = io();

// Varaiables para jquery
var label = $("small");

var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has("escritorio"));
if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");

console.log(escritorio);
$("h1").text(`Escritorio: ${escritorio}`);

$("button").on("click", function() {
  // console.log("click");
  socket.emit("atenderTicket", { escritorio: escritorio }, function(resp) {
    if (resp === "No hay tickets") {
      label.text(resp);
      alert(resp);
      return;
    }
    console.log(resp);
    label.text(resp.numero);
  });
});
