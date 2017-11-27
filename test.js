var p1 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve([1,2,3]);
    }, 3000);
});

var p2 = new Promise(function (resolve) {
    setTimeout(function () {
        resolve({a:1,b:2});
    }, 1000);
});

Promise.all([p1, p2]).then(function (result) {
    console.log(result); // ["Hello", "World"]
});