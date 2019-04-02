function Lectura(){
  $.ajax({
        url: 'Datos recabados - Hoja 1.csv',
        dataType: 'text',
      }).done(successFunction);
      function successFunction(data){
        data = data.toUpperCase();
        data = data.replace(/['"]+/g, '');
        console.log(data);
        
        
        var allRows = data.split(/\r?\n|\r/);
        console.log(allRows.length);
        var table = '<table border=1px>';
        for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
          if (singleRow === 0) {
            table += '<thead>';
            table += '<tr>';
          } else {
            table += '<tr>';
          }

          var rowCells = allRows[singleRow].split(',');
          let sum = rowCells.reduce((previous, current) => current += previous);
          let avg = sum / rowCells.length;
          for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            if (singleRow === 0) {
              table += '<th>';
              table += rowCells[rowCell];
              table += '</th>';
            } else {
              table += '<td>';
              table += rowCells[rowCell];
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