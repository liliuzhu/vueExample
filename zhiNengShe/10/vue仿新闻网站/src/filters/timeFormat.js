export const normalTime=(time)=>{
	if(time){
		var oDate=new Date();
		oDate.setTime(time);

		var Y=oDate.getFullYear();
		var M=oDate.getMonth()+1;
		var D=oDate.getDate();

		var h=oDate.getHours();
		var m=oDate.getMinutes();
		var s=oDate.getSeconds();

		return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
	}
};
//export { normalTime };