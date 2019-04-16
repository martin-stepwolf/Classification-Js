var data2 = [];
function Game_start(){
  $.ajax({
        url: 'datos/Datos recabados - Hoja 1.csv',
        dataType: 'text',
      }).done(successFunction);
      function successFunction(data){
        data = data.toUpperCase();
        data = data.replace(/['"]+/g, '');

        var allRows = data.split(/\r?\n|\r/);// dividir las filas
        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
          var a = []; //almacenar los datos de una fila
          var rowCells = allRows[singleRow].split(','); //dividir las columnas
          for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            a.push(rowCells[rowCell])
          }
          data2.push(a);
        }

        for (var a = 1; a < data2.length; a++) {
          //Limpiar todos los espacios vacios al inicio y al final
          for(var e=0;e>20;e++)
          data2[a][e] = data2[a][e].replace(/^\s*|\s*$/g,"");

          //Limpiar Hz
          data2[a][2] = data2[a][2].replace(/['HZ]+/g, '');
          data2[a][2] = data2[a][2].replace(/[' ]+/g, '');
        
          //Limpiar PPI, DPI, PPP
          data2[a][3] = data2[a][3].replace(/['DPI]+/g, '');
          data2[a][3] = data2[a][3].replace(/['PPI]+/g, '');
          data2[a][3] = data2[a][3].replace(/['PPP]+/g, '');
          data2[a][3] = data2[a][3].replace(/[' ]+/g, '');
        
          //Limpiar Resolucion
          data2[a][4] = data2[a][4].replace(/['X]+/g, '*');
          data2[a][4] = data2[a][4].replace(/[' ]+/g, '');
        
          //Limpiar Internal storage
          data2[a][6] = data2[a][6].replace(/[' ]+/g, '');
          if(data2[a][6].indexOf("MB")!=-1){
            data2[a][6] = data2[a][6].replace(/['MB]+/g, '');
            data2[a][6] = (data2[a][6])/1024;
            data2[a][6] = Math.round(data2[a][6]*10)/10;
          }
          else
          data2[a][6] = data2[a][6].replace(/['GB]+/g, '');
        
          //Limpiar Ram memory
          data2[a][7] = data2[a][7].replace(/[' ]+/g, '');
          if(data2[a][7].indexOf("MB")!=-1){
            data2[a][7] = data2[a][7].replace(/['MB]+/g, '');
            data2[a][7] = (data2[a][7])/1024;
            data2[a][7] = Math.round(data2[a][7]*10)/10;
          }
          else
          data2[a][7] = data2[a][7].replace(/['GB]+/g, '');
        
          //Limpiar CPU speed
          data2[a][10] = data2[a][10].replace(/['MHZ]+/g, '');
          data2[a][10] = data2[a][10].replace(/[' ]+/g, '');
        
          //Limpiar main camera y front camera
          data2[a][11] = data2[a][11].replace(/['MP]+/g, '');
          data2[a][11] = data2[a][11].replace(/['MPX]+/g, '');
          data2[a][11] = data2[a][11].replace(/[' ]+/g, '');

          data2[a][13] = data2[a][13].replace(/['MP]+/g, '');
          data2[a][13] = data2[a][13].replace(/['MPX]+/g, '');
          data2[a][13] = data2[a][13].replace(/[' ]+/g, '');
        
          //Limpiar Battery capacity y voltaje
          data2[a][18] = data2[a][18].replace(/['MAH]+/g, '');
          data2[a][18] = data2[a][18].replace(/[' ]+/g, '');

          data2[a][19] = data2[a][19].replace(/['V]+/g, '');
          data2[a][19] = data2[a][19].replace(/[' ]+/g, '');
          
          // Ver que espacios estan vacios
          for (var b = 0; b < 20; b++) {
            if(data2[a][b]==""){
              data2[a][b] = Mean_Calculate(Array_compose(b));
             // console.log("x="+a+" y="+b+" remplazado por "+Mean_Calculate(Array_compose(b)));// impresion de los campos vacios y su remplazo
            }
          }
        }
        $('.main').html("<center><h3>Calculo de tu celular</h3></center><b id='pregunta'>Caracteristica</b><input class='form-control' type='text' id='respuesta'> <label id='medida'>GB</label> <button class='btn btn-success' onclick='Responder();'>Responder</button><hr>"); 
        Show_table();
        Game(pregunta_responder);
      }
    }
  
  function Mean_Calculate(array){
    var mean_posicion = Math.round(array.length/2);
    array.sort();
    var Mean = array[mean_posicion]; 
    return Mean;
  }
  
  function Array_compose(indice_y){
          var array_y = [];
          for (var d = 0; d < data2.length; d++) {
          array_y.push(data2[d][indice_y]);
          }
          return array_y;
      } 
  function Show_table(){
    var table = '<table border=1px>';
    for (var singleRow = 0; singleRow < data2.length; singleRow++) {
      if (singleRow === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }
  
      for (var rowCell = 0; rowCell < data2[singleRow].length; rowCell++) {
        if (singleRow === 0) {
          table += '<th>';
          table += data2[singleRow][rowCell];
          table += '</th>';
        } else {
          table += '<td>';
          table += data2[singleRow][rowCell];
          table += '</td>';
        }
      }
      if (singleRow === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    } 
    table += '</tbody>';
    table += '</table>';
    $('.table').html(table);  
  }

  function Game(q){// variable q es la pregunta a realizar
    if(data2.length >=3 && pregunta_responder <19){
      $('#pregunta').text(Array_compose(preguntas_orden[q])[0]);
      $('#medida').text(Calculo_medida(preguntas_orden[q]));    
      Show_table(); // Actualiza la tabla
  }
  else
  if(data2.length ==1)
  $('.main').html("<center><h3>Ningun dispositivo encontrado</h3><p>Lo siento, no existe tu dispositivo asi en la base de datos.</p></center><hr>"); 
  else
  $('.main').html("<center><h3>Dispositivo encontrado</h3><b id='pregunta'><p>Tu dispositivo es un "+data2[1][0]+".</p></center><hr>"); 
  }

  var preguntas_orden = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  preguntas_orden = preguntas_orden.sort(function() {return Math.random() - 0.5});  
  var pregunta_responder = 0;
  function Calculo_medida(x){
    var medidas = ['','Pulgadas','Hz','PPI','','','GB','GB','','','MHz','Mp','','Mp','','','','','mAh','V' ]
    return medidas[x];
  }

  function Eliminacion_dato(x){// x es el indice a eliminar
    data2.splice(x, 1);
  }

function Responder(){
    var res= $('#respuesta').val();
    var v = preguntas_orden[pregunta_responder];// pregunta a responder
    for(var data=(data2.length-1); data>= 1; data--){
      if(data2[data][v] != res){
        Eliminacion_dato(data);
      }
    }
    $('#respuesta').val('');// reinicio de valores
     pregunta_responder++; //cambio a la siguiente pregunta
     Show_table();// actualizacion de tabla
     Game(pregunta_responder);// actualizacion panel preguntas
   }