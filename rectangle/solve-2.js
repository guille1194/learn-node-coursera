var rect = require("./rectangle-2");

function solveRect(l, b) {
    console.log("Solving rect with l = " + l + " and b = " + b);

    rect(l, b, function(err, rectangle) {
        if(err) {
            console.log(err);
        } else {
            console.log("Perimeter of the rectangle is: " + rectangle.perimeter());
            console.log("Area of the rectangle is: " + rectangle.area());
        }
    })
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(-2, 4);
