//ListHub = new Mongo.Collection('listings');



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
Session.set('n', 10);
Session.set('imgplace', 0);
var n = Session.get('n');

left = function(){
   a = Session.get('imgplace');
   len = Session.get('arraylength');
   Session.set('imgplace', a - 1);
   if(a < 0 ){
     Session.set('imgplace', len - 1);
   }
   console.log(Session.get('imgplace'));
 }
right = function(){
   a = Session.get('imgplace');
   len = Session.get('arraylength');
   Session.set('imgplace', a + 1);
   if(a > len - 1){
     Session.set('imgplace', 0);
   }
   console.log(Session.get('imgplace'));
 }
 showmore = function(){
  n = Session.get('n');
  Session.set('n', n + 10);
 }

Template.photo_view.helpers({
'photolist': function(){
  //  var n = Session.get('n');

    idarrright = new Array(n/2);
    idarrleft = new Array(n/2);

    for(i = 0; i < n/2; i++){

        idarrright[i] = ListHub.find().fetch()[i]["_id"];
    }
    for(i = 0; i < n/2; i++){

      idarrleft[i] = ListHub.find().fetch()[i + (n/2)]["_id"];
    }

     placeArrRight = new Array(n/2);
     placeArrLeft = new Array(n/2);
     dataArr = new Array(n);

    for(i = 0; i < n/2; i++){
      placeArrRight[i] = ListHub.findOne({"_id": idarrright[i]});
      placeArrLeft[i] = ListHub.findOne({"_id": idarrleft[i]});

      dataArr[i] = {
          listpriceleft: "$" + numberWithCommas(placeArrLeft[i]['ListPrice']),
          addressleft: placeArrLeft[i]['Address']['FullStreetAddress'],
          bedsleft: placeArrLeft[i]['Bedrooms'],
          bathsleft: placeArrLeft[i]['Bathrooms'],
          livingarealeft: numberWithCommas(placeArrLeft[i]['LivingArea']),
          listimgleft: placeArrLeft[i]['Photos']['Photo'][0]['MediaURL'],
          keyleft: placeArrLeft[i]['ListingKey'],

          listpriceright: "$" + numberWithCommas(placeArrRight[i]['ListPrice']),
          addressright: placeArrRight[i]['Address']['FullStreetAddress'],
          bedsright: placeArrRight[i]['Bedrooms'],
          bathsright: placeArrRight[i]['Bathrooms'],
          livingarearight: numberWithCommas(placeArrRight[i]['LivingArea']),
          listimgright: placeArrRight[i]['Photos']['Photo'][0]['MediaURL'],
          keyright: placeArrRight[i]['ListingKey'],
       }// End dataarr object

    } //end for loop
return dataArr;

},
'featuredlisting': function(){
  //var n = Session.get('n');


  x = ListHub.find().fetch()[n + 1];
  var a = Session.get('imgplace');

  Session.set('arraylength', x["Photos"]["Photo"].length)
  y = x["Photos"]["Photo"];//[a]["MediaURL"];
  //Session.set('arraylength', imgarray.length);
  img = y[0].MediaURL;


  featured = {
    price: numberWithCommas(x["ListPrice"]),
    address: x["Address"]["FullStreetAddress"],
    livingarea: numberWithCommas(x["LivingArea"]),
    city: x["Address"]["City"],
    state: x["Address"]["StateOrProvince"],
    zip: " " + x["Address"]["PostalCode"],
    listimg:  img,//x["Photos"]["Photo"][0]['MediaURL'],
    key: x["ListingKey"],
  }
  return featured;
},

  'found': function(){

    return ListHub.find();

  },
  'city': function(){
    return ListHub.findOne()["Address"]["City"];
  },
  'state': function(){
    return ListHub.findOne()["Address"]["StateOrProvince"];
  }
});
