import AbstractView from './AbstractView'

export default class LayoutView extends AbstractView {
	constructor(){super()}
	getContext(){
		return {
			rowCount: 5
		}
	}
	get template(){
		return require('./templates/layout.hbs')
	}
	sayHi(){
		var name = "Bob", time = "today";
		return {value: 123, output: `Hello ${name}, how are you ${time}?`}
	}
	// template: require('./templates/layout.tpl')
}