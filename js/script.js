function Lectura(){
  $.ajax({
        url: 'Datos recabados - Hoja 1.csv',
        dataType: 'text',
      }).done(successFunction);
      function successFunction(data){
        data = data.toUpperCase();
        data = data.replace(/['"]+/g, '');

        var data2 = [];
        var allRows = data.split(/\r?\n|\r/);// dividir las filas
        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
          var a = []; //almacenar los datos de una fila
          var rowCells = allRows[singleRow].split(','); //dividir las columnas
          for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            a.push(rowCells[rowCell])
          }
          data2.push(a);
        }
      
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
        $('body').append(table);  
    }
  }
