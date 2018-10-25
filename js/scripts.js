//Business Logic
var meats = [];
var veggies = [];
var specials = [];


function Orders (name, size, base, meats, veggies, specials, cost) {
  this.name = name;
  this.size = size;
  this.base = base;
  this.meats = meats;
  this.veggies = veggies;
  this.specials = specials;
  this.cost = cost;
}

Orders.prototype.totalCost = function () {
  if (this.size === "small") {
    cost = 5;
  } else if (this.size === "medium") {
    cost = 8;
  } else if (this.size === "large") {
    cost = 12;
  }
  cost += meats.length*1.5;
  cost += veggies.length*1;
  cost += specials.length*2;
  return cost;
}
//UI Logic
$(document).ready( function() {
  $("#pizza-order").submit( function(event) {
    event.preventDefault();
    //clears the arrays
    meats = [];
    veggies = [];
    specials = [];

    var name = $("#name").val();
    var size = $(".size").val();
    var base = $("input[name='cheese']:checked").val();
    $("input[name='meat']:checked").each( function() {
      meats.push($(this).val());
    });
    $("input[name='veggie']:checked").each( function() {
      veggies.push($(this).val());
    });
    $("input[name='special']:checked").each( function() {
      specials.push($(this).val());
    });

    var newOrder = new Orders (name, size, base, meats, veggies, specials);
    newOrder.cost = newOrder.totalCost();

    console.log(newOrder);
  });
});
