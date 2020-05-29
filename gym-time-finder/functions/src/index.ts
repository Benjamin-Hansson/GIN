import * as functions from 'firebase-functions';

export const campushallenSchedule = functions.region('europe-west3').https.onRequest((request, response) => {
  console.log("test");
  var request1 = require('request');
  let today = new Date();
  let todayPlus7 = new Date();
  todayPlus7.setDate(today.getDate()+ 6);
  today.setHours(0,0,0,0);
  todayPlus7.setHours(21,59,59,999);
  let url="https://brponline.campushallen.se/grails/api/ver3/products/services/68/suggestions?businessUnit=1&period="+today.toISOString()+"%7C" + todayPlus7.toISOString()

  response.set('Access-Control-Allow-Origin', '*');

  var options = {
    'method': 'GET',
    'url': url,
    'headers': {
      'authority': 'brponline.campushallen.se',
      'pragma': 'no-cache',
      'cache-control': 'no-cache',
      'accept': 'application/json, text/plain, */*',
      'x-request-source': 'brpweb',
      'accept-language': 'en-US',

    }
  };
 request1(options, function (error: any, response1: any) {
    if (error) throw new Error(error);
    response.send(response1.body);
  });

});
