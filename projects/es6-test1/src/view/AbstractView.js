export default class AbstractView {
	constructor(){

	}
	getContext(){
		throw new Error('Abstract')
	}
	render(){
		var context = this.getContext()
		var template = this.template || function(){return ''}
		var result = template(context)
		return result;
	}
}