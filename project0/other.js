<html>
<head>
<title>Demo of Image moving across screen in JavaScript</title>
<script language='JavaScript' type='text/JavaScript'>
<!--
function reset1(){
clearTimeout(my_time);
document.getElementById('i1').style.left= "500px";
document.getElementById('i1').style.top= "100px";
document.getElementById("msg").innerHTML="";

}



function move_img(str) {

var x=document.getElementById('i1').offsetTop;
x= x +100;
document.getElementById('i1').style.top= x + "px";

}

function disp(){
var step=1; // Change this step value
//alert("Hello");
var y=document.getElementById('i1').offsetTop;
var x=document.getElementById('i1').offsetLeft;
if(y < 600 ){y= y +step;
document.getElementById('i1').style.top= y + "px"; // vertical movment
}else{
if(x < 800){x= x +step;
document.getElementById('i1').style.left= x + "px"; // horizontal movment
}
}
//////////////////////

}

function timer(){
disp();
var y=document.getElementById('i1').offsetTop;
var x=document.getElementById('i1').offsetLeft;
document.getElementById("msg").innerHTML="X: " + x + " Y : " + y
my_time=setTimeout('timer()',10);
}


//-->
</script>
</head>
<body >
<img src=images/help.jpg id='i1' style="position:absolute; left: 500; top: 100;">
<br><br><br><br>
<input type=button onClick=timer() value='Start'>
<input type=button onClick=reset1() value='Reset'>
<div id='msg'></div>

</body>
</html>