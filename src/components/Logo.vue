<template>
<div id="logo-container">
    <div id="cdh-logo" style="">Centre<br><span class="cdh-logo-cursive">for</span> Digital <br>Humanities</div>
</div>
</template>

<script>


export default {
    name: "Logo",
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Clicker+Script&display=swap');
@import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:100,200&display=swap');
#logo-container {
    /* background-color: rgb(65,65,65);  */
    /* color: white;  */
    color: black;
    padding: 0px; 
    height: 170px;
}

#cdh-logo {
    margin-top:0px;
	margin-left:0px;
    width: auto;
    height: auto;
    text-align: left;
    font-weight: 100;
    font-style: normal;
    font-size: 50px;
    line-height: 0.8;
    padding: 30px 0px 10px 0px;
    vertical-align: middle;
    font-family: 'Barlow Condensed', sans-serif;
    float: right; 
    /* margin-right: 40px;  */
    margin-top: 0px; 
    width: 210px;
    padding: 20px 0px 30px 0px; 
    border-style: solid; 
    border-width: 0px 0px 0px 0px; 
    border-color: white;
}

.cdh-logo-cursive {
    font-family: 'Clicker Script', cursive; 
    font-size:30px;  
    vertical-align:40%;
}

</style>
