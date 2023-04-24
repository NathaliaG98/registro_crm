$(document).ready(function(){


$.ajax({
    url: "http://localhost:5000/mostrar_clientes",
    type: 'get',
  
    success: function(resp) {
      // Si la solicitud es exitosa, mostramos una alerta con la respuesta del servidor
      alert("Cliente registrado con exito");
      mostrar_clientes(resp)
    },
   /* error: function() {
      // Si hay un error en la solicitud, mostramos una alerta de error
      alert('Ha ocurrido un error');
    }*/
  });

  function mostrar_clientes (resp) {
    for (let i = 0; i< resp.length; i ++){
        $("#tabla_cliente").append( "<tr><td>" + resp[i].nombre + "</td> </tr> <tr><td>" + resp[i].apellido + "</td> </tr> <tr><td>" + resp[i].email + "</td> </tr> <tr><td>" + resp[i].telefono + "</td> </tr>")
    }
  }
})