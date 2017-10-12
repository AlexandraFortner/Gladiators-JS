const $ = require('jquery');
const other = require('../../lib/other');

function hello() {
    $('body').append('<h1> Good Bye!</h1>');
    other.foo();
}

function newFunc() {
    return 2;
}
function add(a, b) {
    return a + b;
}

$(hello);

exports.hello = hello;
exports.add = add;
