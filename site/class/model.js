
(function (App) {
    'use strict'
    
    App.bidData = [];
    App.DataModel = new class DataModel {
        
        subscribe (client) {
            var bidData = App.bidData,
                self = this;
            client.subscribe("/fx/prices", function(message) {
                if (message.body) {
                    if(bidData.length < 15) { // Lot more data is received, so restricting it to show limited results.
                        bidData.push(JSON.parse(message.body));
                        bidData.sort(self.sortColumn); // sorting data on lastChangeBid
                        if (bidData.length > 14) {
                            bidData.shift();  // remove old data
                        }
                        App.View.updateView(bidData);
                    }
                } else {
                  console.log('Error received.');
                }
            });
        }
    
        sortColumn (a, b) {
          if (a.lastChangeBid < b.lastChangeBid)
            return -1;
          if (a.lastChangeBid > b.lastChangeBid)
            return 1;
          return 0;
        }   
    }
})(App); 