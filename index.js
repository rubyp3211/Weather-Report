const http=require("http");
const fs=require("fs");
var requests=require("requests");
const indexFile=fs.readFileSync("index.html","utf-8");
const replaceV=(tValue,oValue)=>{
    Wreport=tValue.replace("{%tempval%}",oValue.main.temp);
    Wreport=Wreport.replace("{%tempmin%}",oValue.main.temp_min);
    Wreport=Wreport.replace("{%tempmax%}",oValue.main.temp_max);
    Wreport=Wreport.replace("{%location%}",oValue.name);
    Wreport=Wreport.replace("{%country%}",oValue.sys.country);
    Wreport=Wreport.replace("{%tempstatus%}",oValue.weather[0].main);
    console.log(Wreport);
    return Wreport;
};
const server =http.createServer((req,res)=>{
    if(req.url="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=6e1918174f71c6b48472c1ee29eb81ca&units=metric")
        .on("data",(chunk)=>{
            const objdata=JSON.parse(chunk);
            const arrData=[objdata];
            const realTimeData=arrData.map((val)=>replaceV(indexFile,val)).join("");
            res.write(realTimeData);
        })
        .on("end",(err)=>{
            if(err) return console.log("connection clossed due to error",err);
            res.end();
        });
    }
});    
server.listen(5000,"127.0.0.1");
