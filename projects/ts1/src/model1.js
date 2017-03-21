var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hellooo, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log(greeter(user));
// interface Request 
// {
// 	getParameter(param:string):string;
// }
// interface Response 
// {
// 	write(s:string):void;
// }
// declare var global
// global.service = function(request:Request, response: Response)
// {
// 	response.write(greeter(user))
// } 
