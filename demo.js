require('./Array.js');

// var people = [ 
//     {name: 'pedro', age: 19 },
//     {name: 'juan', age: 15 },
//     {name: 'pablo', age: 16 },
//     {name: 'pancho', age: 20 },
//     {name: 'topo', age: 18 }
//     ];

var people = [ 
    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
    ],
    logPerson = function(x, i){
  console.log((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');  
};

var children = [
    {name: 'ana', sex: 'f'},
    {name: 'fosto', sex: 'm'},
    {name: 'jane', sex: 'f'},
    {name: 'yadi', sex: 'f'},
    {name: 'lili', sex: 'f'},
    {name: 'bany', sex: 'm'},
    {name: 'rod', sex: null},
    {name: 'auro', sex: 'f'},
    {name: 'martin', sex: 'm'}
];

// EACH

// people.each(function(x, i){
//     console.log((i + 1) + '.- ' + x.name + ' is ' + x.age + ' years old');
// })

// WHERE

// console.log('hire the following guys')
// people.where(function(dev){
//     var skills = dev.skills.where(function(skill) { return skill == 'PHP'; });

//     return skills.length == 0;
// })
// .each(logPerson)

// ANY

// people.where(function(dev){
//     return !dev.skills.any(function(skill) { return skill == 'PHP' });
// })
// .each(logPerson)

// people.where(function(dev){
//     return !dev.skills.any('PHP');
// })
// .each(logPerson)

// SELECT

// people
//     .where(function(dev){
//         return !dev.skills.any('PHP');
//     })
//     .select(function(dev) {
//         return dev.name;
//     })
//     .each(function(x){
//         console.log(x);
//     })

// TAKE

// children
//     .take(3, function(x){ return x.sex == 'f';})
//     .each(function(x){ console.log(x.name); });

// SKIP

// children
//     .skip(3)
//     .each(function(x){ console.log(x.name); });

// FIRST

// console.log(children.first().name);
// console.log(children.first(function(x){ return x.sex == 'm';}).name);

// LAST

// console.log(children.last().name);
// console.log(children.last(function(x){ return x.sex == 'f';}).name);

// COUNT

// console.log(children.count() + ' children');
// console.log(children.count(function(x){ return x.sex === 'f';}) + ' are female');

// INDEX

// console.log(children.index(function(x){ return x.name == 'fosto';}));
// console.log([1, 3, 5, 7, 9, 11].index(7));

// PLUCK

// children
//     .pluck('name')
//     .each(function(x) { console.log(x); });

// SUM

// console.log([1, 3, 5, 7, 9, 11].sum());
// console.log([1, 3, 5, 7, 9, 11].sum(function(x) { return x * 2; }));
// console.log(people.sum(function(x){ return x.age; }));

// MAX

// console.log([1, 3, 5, 7, 9, 11, 2, 4, 6].max());
// console.log(children.max(function(a, b){ return a.name.length - b.name.length }).name);
// console.log(people.max(function(a, b){ return a.age - b.age; }).name);

// MIN

// console.log([1, 3, 5, 7, 9, 11, 2, 4, 6].min());
// console.log(children.min(function(a, b){ return a.name.length - b.name.length }).name);
// console.log(people.min(function(a, b){ return a.age - b.age; }).name);

// FLATTEN

// console.log([1,2,3,[4,5,[6, ['a','b','c',[7]], 8], 9, 10, 11, 12, 13, 14], 15, 16].flatten());
// console.log([1,2,3,[4,5,[6, 7, 8], 9, 10, 11, 12, 13, 14], 15, 16].flatten());
// console.log([1, [2, 3], 4].flatten());