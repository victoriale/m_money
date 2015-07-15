ListHub = new Mongo.Collection('listings');

Session.set('t',0);
var Dep = new Tracker.Dependency;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 found = ListHub.find();
 n = 10;

Template.search_results.helpers({

  'test': function(){
    x = ListHub.findOne({"ListPrice": {$exists: true}});
    y = x["ListPrice"];
    return y;
  },
  'found': function(){
    return found;
  },
  'num': function(){
    return n;
  },
  'cityname': function(){
    x = ListHub.findOne();
    return x["Address"]["City"];
  },
  'statename': function(){
    x = ListHub.findOne();
    return x["Address"]["StateOrProvince"];
  },
  'listing': function(){

     idarr = new Array(n);

    for(i = 0; i < n; i++){
        b = ListHub.find().fetch()[i]["_id"];
        idarr[i] = b;
    }
     placeArr = new Array(n);
     dataArr = new Array(n);
    for(i = 0; i < n; i++){
      placeArr[i] = ListHub.findOne({"_id": idarr[i]});

      dataArr[i] = {
        city: placeArr[i]['Address']['City'],
        state: placeArr[i]['Address']['StateOrProvince'],
        address: placeArr[i]['Address']['FullStreetAddress'],
        listprice: "$" + numberWithCommas(placeArr[i]['ListPrice']),
        livingarea: numberWithCommas(placeArr[i]['LivingArea']),
        beds: placeArr[i]['Bedrooms'],
        baths: placeArr[i]['Bathrooms'],
        yearbuilt: placeArr[i]['YearBuilt'],
        brokeragelogo: placeArr[i]['Brokerage']['LogoURL'],
        listimg: placeArr[i]['Photos']['Photo'][0]['MediaURL'],
        listingkey: placeArr[i]['ListingKey'],



      } //end dataarr objects
    } //End for loop
    Session.set('dataArr', dataArr);
    Session.set('placeArr', placeArr);
    Session.set('idarr', idarr);

    return dataArr;
    Dep.changed();
  } //End listing helper
});

Template.search_results.onRendered(function(){
  //alert('hello');
  //initialize();
});

initialize = function(){            // GOOGLE MAP API FUNCTION
			Dep.depend();

			 dataArr = Session.get('dataArr');
       placeArr = Session.get('placeArr');
       idarr = Session.get('idarr');


			addressArray = new Array(idarr.length);


			for(i=0; i<idarr.length; i++){
				 f = idarr[i];//new Mongo.ObjectID(priceArr[i]);
				 x = ListHub.findOne({"_id": f});
				addressArray[i] =  x["Address"]["FullStreetAddress"] + ", " + x["Address"]["City"] + ", " + x["Address"]["StateOrProvince"];
			}



			var geocoder = new google.maps.Geocoder();
			var mainIcon = "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png";
			var icon = "http://maps.google.com/mapfiles/marker.png";

		/*	geocoder.geocode({"address": addressArray[0]}, function(results, status){

				if(status == google.maps.GeocoderStatus.OK){
					map.setCenter(results[0].geometry.location);

					var marker = new google.maps.Marker({
						position: results[0].geometry.location,
						map: map,
						title: addressArray[Session.get('t')],
						icon: mainIcon
					});
					var infowindow = new google.maps.InfoWindow({
					content: addressArray[Session.get('t')]
					});
					infowindow.open(map,marker);
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map,marker);
					});

				}

			});*/

			function GoogleMapFunction(add, ico, markername){
				Dep.depend();
				geocoder.geocode({"address": add}, function(results, status){
					if(status == google.maps.GeocoderStatus.OK){
						var markername = new google.maps.Marker({
							position: results[0].geometry.location,
							map: map,
							title: add,
							icon: ico
						});
						var infowindow = new google.maps.InfoWindow({
							content: add
						});
						google.maps.event.addListener(markername, 'click', function() {
							infowindow.open(map,markername);
						});

					}
					Dep.changed();
				});
			}



		for(i = 0; i < addressArray.length; i++){

				GoogleMapFunction(addressArray[i], icon, String(i));
			}


			var mapOptions = {
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("loc_map"), mapOptions);
			Dep.changed();
		};  //Closes initialize function
