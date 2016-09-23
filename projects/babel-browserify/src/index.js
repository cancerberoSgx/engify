import f from './model/Model1'
f()


import LayoutView from './templates/layout.tpl'

var layout = new LayoutView()
console.log(layout.render())