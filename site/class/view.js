(function (App) {
    'use strict'
    App.View = new class View {
     
        sparkLine (bidData) {
            let sparkLineDots = [];
            bidData.forEach (function (obj) {
                let midPrice = (obj.bestBid + obj.bestAsk)/2;
                sparkLineDots.push(midPrice)
            });

            const exampleSparkline = new Sparkline(document.getElementById('spark-line'), {width: 500});
            exampleSparkline.draw(sparkLineDots);
        }

        updateView (bidData) { 
            var tableHtml = '',
                self = this;

            if(bidData.length) {
                var table = document.getElementById('bid-data'),
                    node = table.firstChild;
                if (table.childNodes.length) {
                    table.innerHTML = ""; 
                }
                for (let i = 0; i < bidData.length; i++) {
                      var tr = document.createElement('tr');
                      tr.appendChild(self.createTd(bidData[i].name.toUpperCase()));
                      tr.appendChild(self.createTd(parseFloat(bidData[i].bestBid.toFixed(2))));
                      tr.appendChild(self.createTd(parseFloat(bidData[i].bestAsk.toFixed(2))));
                      tr.appendChild(self.createTd(parseFloat(bidData[i].lastChangeBid.toFixed(2))));
                      tr.appendChild(self.createTd(parseFloat(bidData[i].lastChangeAsk.toFixed(2))));
                      document.getElementById('bid-data').appendChild(tr);
                }
            }
            self.sparkLine(bidData);
        }
        
        createTd (text) {
              var td = document.createElement('td');
              td.textContent = text;
              return td;
        } 
    }
})(App)