//this file is included into distribution and defines the global object

if(typeof(global)==='undefined')
{
	this.global = this; 
	global = this;
}