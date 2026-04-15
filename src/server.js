'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3024;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/validator'));
app.get('/',(_,r)=>r.json({service:'hive-validator',version:'1.0.0',description:'Multi-layer validation — data integrity, schema compliance, cross-service consistency',endpoints:{"validate":"POST /v1/validator/validate","report":"GET /v1/validator/report/:id","stats":"GET /v1/validator/stats","records":"GET /v1/validator/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-validator] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
