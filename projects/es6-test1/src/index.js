import f from './model/Model1'
f()


import LayoutView from './view/LayoutView'

var layout = new LayoutView()
console.log(layout.render())
var {value, output} = layout.sayHi()
console.log(output)
