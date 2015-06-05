$(document).ready(function() {

  var Board = {
    _id: "",
    connections: [],
    bubbles: [],
  };

  function Bubble (x,y, randId){
    this.bubbleId=randId;
    this.heading = "";
  	this.content ="this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentth this is the content this is the content this is the content this is the contentththis is the content this is the content this is the content this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the content";
    this._id = "";
    this.size = {
  	  left: x,
  	  top: y
    };
    this.location = {
  	  left: x,
  	  top: y
    };
  };

  $(function(){
  	$("#board").on("click", function(e){
      var randId = guid();
  		renderBubble(new Bubble(e.pageY, e.pageX, randId));
  	});
  });

  $('#board').on("click", '.bubble', function(e) {
    e.stopImmediatePropagation();
  });

  function renderBubble(bubble) {
  	$('#board').append(
  		"<div class='bubble' id=" + bubble.bubbleId + ">" +
  		"<div class='header'> <a class='delete' contenteditable='false'>X </a><a class='link'>+</a> </div>" +
  		"<div class='content' contentEditable='true'></div>"+
      "<div class='footer'>" +
      "<a class='scrollUp' href='#'> &#9650 </a>" +
      "<a class='scrollDown' href='#'> &#9660 </a>" +
      "</div></div>")

  	$(".bubble:last ").offset({top: bubble.location.left, left: bubble.location.top});
  	$('.bubble:last').draggable({
      handle: ".header"
    });
    $('.bubble:last').resizable();
    $('.bubble:last .content').append(bubble.content);


    $(function(){
      $('.delete')
      //.button()
      .click(function(event){
        event.stopImmediatePropagation();
        $(this).parent().parent().remove();
      });
    });

    $(".scrollUp").bind("click", function(event) {
      event.preventDefault();
      var currentBubbleId = ($(this).parent().parent().attr('id'));
      var scrollHeight = $("#" + currentBubbleId).find(".content").scrollTop();
      $("#" + currentBubbleId).find(".content").scrollTop(scrollHeight - 25);
    })

    $(".scrollDown").bind("click", function(event) {
      event.preventDefault();
      var currentBubbleId = ($(this).parent().parent().attr('id'));
      var scrollHeight = $("#" + currentBubbleId).find(".content").scrollTop();
      $("#" + currentBubbleId).find(".content").scrollTop(scrollHeight + 25);
    });
  };
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
