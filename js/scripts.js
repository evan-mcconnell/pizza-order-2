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
    cost = 6;
  } else if (this.size === "medium") {
    cost = 10;
  } else if (this.size === "large") {
    cost = 15;
  }
  cost += meats.length*1.5;
  cost += veggies.length*1;
  cost += specials.length*2;
  return cost;
}

Orders.prototype.totalToppings = function () {
  var allToppings = meats.concat(veggies, specials);
  return allToppings;
  console.log(allToppings);
}

//UI Logic
$(document).ready( function() {
  $("#pizza-order").submit( function(event) {
    event.preventDefault();
    //clears the arrays
    meats = [];
    veggies = [];
    specials = [];
    $(".toppings").empty();

    var name = $("#name").val();
    var size = $(".size").val();
    var base = $("input[name='cheese']:checked").val();
    name && size && base ? true : alert("Make sure you've chosen a base and entered a name for the order!")
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
    var totalTopping = newOrder.totalToppings();

    $(".order-name").text(newOrder.name);
    $(".order-size").text(newOrder.size);
    $(".total-toppings").text((totalTopping).length);
    totalTopping.forEach( function(topping) {
      $(".toppings").append("<li>" + topping + "</li>");
    });
    $(".order-cost").text(newOrder.cost);

    $(".placed-orders").show();
  });
});
