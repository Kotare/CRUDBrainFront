function Board() {} 

Board.prototype.save = function () {
  ApiFacade.putBoard(this, function (payload) {
    // TODO: use response here in some fashion? Error handling?
    console.log("Payload returning from save(): ", payload);
  });
}

Board.prototype.load = function () {
  ApiFacade.retrieveBoard(this.loadCallback.bind(this));
}

Board.prototype.loadCallback = function (payload) {
  if (payload) {
    console.log("Payload returning from load(): ", payload);

    // Add methods to models
    $.extend(this, payload);

    if (this.bubbles) {
      for (var i = 0; i < this.bubbles.length; i++) {
        var bubble = new Bubble();
        $.extend(this.bubbles[i], bubble);
      }
    }
    if (this.connections) {
      for (var i = 0; i < this.connections.length; i++) {
        var connection = new Connection();
        $.extend(this.connections[i], connection);
      }
    }

    this.render();
    eventHandlers();
  } else {
    // TODO: handle error. Retry?
    console.log("Empty payload in board.load()");
  }
}

Board.prototype.render = function () {
  if (this.bubbles) {
    for (var i = 0; i < this.bubbles.length; i++) {
      this.bubbles[i].render();
    }
  }
  if (this.connections) {
    for (var i = 0; i < this.connections.length; i++) {
      renderConnections(this.connections[i].startBubbleId, this.connections[i].endBubbleId, mySVG);
    }
  }
}

