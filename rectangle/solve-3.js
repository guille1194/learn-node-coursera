var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]')
    .demand(['l', 'b'])
    .argv;

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

solveRect(argv.l, argv.b);
