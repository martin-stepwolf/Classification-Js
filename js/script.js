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

        for (var a = 1; a < data2.length; a++) {
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
