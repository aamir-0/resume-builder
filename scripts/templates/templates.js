import {userData} from "./userData.js";
const preId=document.getElementById("preview_container").innerHTML;
const pre_template=Handlebars.compile(source);
const pre_html=pre_template(userData);
console.log(pre_html);