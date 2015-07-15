  /*Author : Vinay Vittal Karagod
  Date: 06/26/2015
  Description: .js file gives Details about Area brakdown statistics like location,population
  details,Average Rent,Description about the location ,Median income,Total companies
  It gives location,Nearby cities,Statistics
  Associated files:area_breakdown.less,area_breakdown.html*/

  function nFormatter(num) {
  	if (num >= 1000000000) {
  		return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' Billion';
  	}
  	if (num >= 1000000) {
  		return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' Million';
  	}
  	if (num >= 1000) {
  		return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' Thousand';
  	}
  	return num;
  }
  function blankspace(num){
    if(num == undefined || num == '' || num == 0){
      return 'Not enough information';
    }
  }
  Template.area_breakdown.onRendered(function(){
    var image = Session.get("profile_header");
    $('.area_breakdown-logo-image').css("background-image","url('"+image['city_image']+"')");
  });

  Template.area_breakdown.helpers({
    location: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }
      return data.city +(', ')+data.state;
    },
    zip_count: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }
      return data.zipcode_count;
    },
    neighborhood_count: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }
      return data.neighborhood_count;
    },
    population: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }else if (data.population == 0){
        return blankspace(data.population);
      }
      return nFormatter(data.population);
    },
    rent: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }else if (typeof data.average_rental  == 'undefined'){
        return blankspace(data.average_rental);
      }
      return "$" + nFormatter(data.average_rental);
    },
    median_income: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }else if (data.median_income == 0){
        return blankspace(data.median_income);
      }
      return "$" + nFormatter(data.median_income);
    },
    company_count: function(){
      var data = Session.get("area_breakdown");
      if( typeof data == 'undefined'){
        return '';
      }else if (data.companies_count == 0){
        return 'Not enough information';
      }
      return data.companies_count;
    },
    image: function(){
      var image = Session.get("profile_header");
      $('.area_breakdown-logo-image').css("background-image","url('"+image['city_image']+"')");
    },
  });
