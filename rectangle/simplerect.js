var rect = {
    perimeter: function(x, y) {
        return 2*(x+y);
    },

    area: function(x, y) {
        return x*y;
    }
};

function solveRect(l, b) {
    console.log("Solving rect with l = " + l + " and b = " + b);

    if(l < 0 || b < 0) {
        console.log("l and b should be greater than zero");
    } else {
        console.log("Perimeter of the rectangle is: " + rect.perimeter(l, b));
        console.log("Area of the rectangle is: " + rect.area(l, b));
    }
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-2, 4);
