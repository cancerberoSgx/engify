_ = require 'prelude-ls'

aaa = [1 to 5] |> _.map (^2) |> _.filter _.even |> _.fold (+), 0 #=> 20 

table1 =
  * id: 1
    name: 'george'
  * id: 2
    name: 'mike'
  * id: 3
    name: 'donald'


console.log(JSON.stringify(table1))
console.log(aaa)