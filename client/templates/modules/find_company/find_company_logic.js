/*
Author: William Klausmeyer
Location Module: Find Company
*/

// Returns the dollar value of the position on the slider for the Market Cap Slider
function capSlider(position) {
  // Handle both extremes
  if ( position == 0 ) {
    return 100;
  } else if ( position == 261 ) {
    return 670000000000;
  }

  // position will be between 0 and 100
  var minp = 0;
  var maxp = 261;

  // The result should be between 100 an 670B
  var minv = Math.log(1000);
  var maxv = Math.log(670000000000);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
  var val = Math.exp(minv + scale*(position-minp));

  // ROUNDING!
  if ( val > 1000000000 ) {
    return Math.round(val / 1000000000) * 1000000000;
  } else if ( val > 1000000 ) {
    return Math.round(val / 1000000) * 1000000;
  } else if ( val > 1000 ) {
    return Math.round(val / 1000) * 1000;
  } else {
    return Math.round(val);
  }
}

// Moves the ball (and handles changing values) for the Market Cap Slider
function moveBallCap(ball, left) {
  // Set lower limits
  var slider = $(ball)[0].parentElement;
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Handle left bound
  if ( $(ball).position().left == sLeft && left < -10.5 ) {
    left = -10.5;
  } else if ( $(ball).position().left == sLeft && left >= sRight ) {
    left = sRight - 5;
  }
  // Handle right bound
  if ( $(ball).position().left == sRight && left <= sLeft ) {
    left = sLeft + 5;
  } else if ( $(ball).position().left == sRight && left > 250.5 ) {
    left = 250.5;
  }

  // Move the label
  if ( $(ball).position().left == sLeft ) {
    if ( left > 50 ) {
      $(ball).addClass('sideLabelL');
    } else {
      $(ball).removeClass('sideLabelL');
    }
  } else if ( $(ball).position().left == sRight ) {
    if ( left < 200.5 ) {
      $(ball).addClass('sideLabelR');
    } else {
      $(ball).removeClass('sideLabelR');
    }
  }

  // Move the ball
  $(ball).css('left', left);

  // Style the bar
  // Get the extremes
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Calculations and styling
  var length = 265;
  var sLeftPerc = Math.round((sLeft + 10.5) / length * 100);
  var sRightPerc = Math.round((sRight + 10.5) / length * 100);
  $(slider).css('background','linear-gradient(to right, #cccccc 0%, #cccccc ' + sLeftPerc + '%, #3098ff ' + sLeftPerc + '%, #3098ff ' + sRightPerc + '%, #cccccc ' + sRightPerc + '%, #cccccc 100%)');

  // Calculate average
  var low = capSlider(sLeft + 10.5);
  var high = capSlider(sRight + 10.5);
  var avg = (low + high) / 2;
  var avgPos = (sLeft + sRight + 21) / 2;

  // Flip the average if too close
  if ( Math.abs(sRight - sLeft) < 140 ) {
    $(slider).find('.slider_avg_caret').addClass('invert');
  } else {
    $(slider).find('.slider_avg_caret').removeClass('invert');
  }

  // Move the average slider
  $(slider).find('.slider_avg_caret').each(function(){
    $(this).css('left',(avgPos - 3) + 'px');
  });

  // Insert values
  var ballVal = capSlider(left + 10.5);
  if ( ballVal >= 1000000000 ) {
    ballVal = (ballVal / 1000000000) + 'B';
  } else if ( ballVal >= 1000000 ) {
    ballVal = (ballVal / 1000000) + 'M';
  } else if ( ballVal >= 1000 ) {
    ballVal = (ballVal / 1000) + 'K';
  }
  $(ball).find('.slider_ball_label').html('$' + ballVal);
  if ( avg < 10 ) {
    avg = Math.round(10 * avg) / 10;
    if ( avg % 1 != 0 ) {
      avg = avg + '0';
    } else {
      avg = avg + '.00';
    }
  } else {
    avg = Math.round(avg);
  }
  if ( avg >= 1000000000 ) {
    avg = Math.round(avg / 1000000000) + 'B';
  } else if ( avg >= 1000000 ) {
    avg = Math.round(avg / 1000000) + 'M';
  } else if ( avg >= 1000 ) {
    avg = Math.round(avg / 1000) + 'K';
  } else {
    avg = Math.round(avg);
  }
  $(slider).find('.slider_avg').html('$' + avg + ' Average');
}

// Returns the dollar value of the position on the slider for the Share Price Slider
function shareSlider(position) {
  // Handle both extremes
  if ( position == 0 ) {
    return 1;
  } else if ( position == 261 ) {
    return 755;
  }

  // position will be between 0 and 100
  var minp = 0;
  var maxp = 261;
  var pRng = maxp - minp;
  var pPerc = (position - minp) / pRng;

  // NONE LOGARITHMIC TEST
  var minv = 1;
  var maxv = 755;
  var vRng = maxv - minv;
  var ret = vRng * pPerc + minv;

  // The result should be between 1 an 755
  var minv = Math.log(1);
  var maxv = Math.log(755);

  // calculate adjustment factor
  var scale = (maxv-minv) / (maxp-minp);
  var val = Math.exp(minv + scale*(position-minp));

  if ( val < 10 ) {
    return Math.round(val * 10) / 10;
  } else {
    return Math.round(val);
  }
}

// Moves the ball (and handles changing values) for the Share Price Slider
function moveBallShare(ball, left) {
  // Set lower limits
  var slider = $(ball)[0].parentElement;
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Handle left bound
  // console.log($(ball).position().left == sLeft,$(ball).position().left,sLeft);
  if ( $(ball).position().left == sLeft && left < -10.5 ) {
    left = -10.5;
  } else if ( $(ball).position().left == sLeft && left >= sRight ) {
    left = sRight - 5;
  }
  // Handle right bound
  if ( $(ball).position().left == sRight && left <= sLeft ) {
    left = sLeft + 5;
  } else if ( $(ball).position().left == sRight && left > 250.5 ) {
    left = 250.5;
  }

  // Move the label
  if ( $(ball).position().left == sLeft ) {
    if ( left > 50 ) {
      $(ball).addClass('sideLabelL');
    } else {
      $(ball).removeClass('sideLabelL');
    }
  } else if ( $(ball).position().left == sRight ) {
    if ( left < 200.5 ) {
      $(ball).addClass('sideLabelR');
    } else {
      $(ball).removeClass('sideLabelR');
    }
  }

  // Move the ball
  $(ball).css('left', left);

  // Style the bar
  // Get the extremes
  var sLeft = 250.5;
  var sRight = -10.5;
  $(slider).find('.slider_ball').each(function(){
    if ( $(this).position().left < sLeft ) {
      sLeft = $(this).position().left;
    }
    if ( $(this).position().left > sRight ) {
      sRight = $(this).position().left;
    }
  });
  // Calculations and styling
  var length = 265;
  var sLeftPerc = Math.round((sLeft + 10.5) / length * 100);
  var sRightPerc = Math.round((sRight + 10.5) / length * 100);
  $(slider).css('background','linear-gradient(to right, #cccccc 0%, #cccccc ' + sLeftPerc + '%, #3098ff ' + sLeftPerc + '%, #3098ff ' + sRightPerc + '%, #cccccc ' + sRightPerc + '%, #cccccc 100%)');

  // Calculate average
  var low = shareSlider(sLeft + 10.5);
  var high = shareSlider(sRight + 10.5);
  var avg = (low + high) / 2;
  var avgPos = (sLeft + sRight + 21) / 2;

  // Flip the average if too close
  if ( Math.abs(sRight - sLeft) < 140 ) {
    $(slider).find('.slider_avg_caret').addClass('invert');
  } else {
    $(slider).find('.slider_avg_caret').removeClass('invert');
  }

  // Move the average slider
  $(slider).find('.slider_avg_caret').each(function(){
    $(this).css('left',(avgPos - 3) + 'px');
  });

  // Insert values
  var ballVal = shareSlider(left + 10.5);
  if ( (ballVal % 1) != 0 ) {
    ballVal = ballVal + '0';
  } else if ( ballVal < 10 ) {
    ballVal = ballVal + '.00';
  }
  $(ball).find('.slider_ball_label').html('$' + ballVal);
  if ( avg < 10 ) {
    avg = Math.round(10 * avg) / 10;
    if ( avg % 1 != 0 ) {
      avg = avg + '0';
    } else {
      avg = avg + '.00';
    }
  } else {
    avg = Math.round(avg);
  }
  $(slider).find('.slider_avg').html('$' + avg + ' Average');
}

// Populates the Industry dropdown based on Sector
// Array of industries
var Industries = {
  'BasicMaterials': ["Agricultural Chemicals", "Aluminum", "Chemicals - Major Diversified", "Copper", "Gold", "Independent Oil & Gas", "Industrial Metals & Minerals", "Major Integrated Oil & Gas", "Nonmetallic Mineral Mining", "Oil & Gas Drilling & Exploration", "Oil & Gas Equipment & Services", "Oil & Gas Pipelines", "Oil & Gas Refining & Marketing", "Silver", "Specialty Chemicals", "Steel & Iron", "Synthetics"],
  'Conglomerates': [],
  'ConsumerGoods': ["Appliances", "Auto Manufacturers - Major", "Auto Parts", "Beverages - Brewers", "Beverages - Soft Drinks", "Beverages - Wineries & Distillers", "Business Equipment", "Cigarettes", "Cleaning Products", "Confectioners", "Dairy Products", "Electronic Equipment", "Farm Products", "Food - Major Diversified", "Home Furnishings & Fixtures", "Housewares & Accessories", "Meat Products", "Office Supplies", "Packaging & Containers", "Paper & Paper Products", "Personal Products", "Photographic Equipment & Supplies", "Processed & Packaged Goods", "Recreational Goods, Other", "Recreational Vehicles", "Rubber & Plastics", "Sporting Goods", "Textile - Apparel Clothing", "Textile - Apparel Footwear & Accessories", "Tobacco Products, Other", "Toys & Games", "Trucks & Other Vehicles"],
  'Financial': ["Accident & Health Insurance", "Asset Management", "Closed-End Fund - Debt", "Closed-End Fund - Equity", "Closed-End Fund - Foreign", "Credit Services", "Diversified Investments", "Foreign Money Center Banks", "Foreign Regional Banks", "Insurance Brokers", "Investment Brokerage - National", "Investment Brokerage - Regional", "Life Insurance", "Money Center Banks", "Mortgage Investment", "Property & Casualty Insurance", "Property Management", "REIT - Diversified", "REIT - Healthcare Facilities", "REIT - Hotel/Motel", "REIT - Industrial", "REIT - Office", "REIT - Residential", "REIT - Retail", "Real Estate Development", "Regional - Mid-Atlantic Banks", "Regional - Midwest Banks", "Regional - Northeast Banks", "Regional - Pacific Banks", "Regional - Southeast Banks", "Regional - Southwest Banks", "Savings & Loans", "Surety & Title Insurance"],
  'Healthcare': ["Biotechnology", "Diagnostic Substances", "Drug Delivery", "Drug Manufacturers - Major", "Drug Manufacturers - Other", "Drug Related Products", "Drugs - Generic", "Health Care Plans", "Home Health Care", "Hospitals", "Long-Term Care Facilities", "Medical Appliances & Equipment", "Medical Instruments & Supplies", "Medical Laboratories & Research", "Medical Practitioners", "Specialized Health Services"],
  'IndustrialGoods': ["Aerospace/Defense - Major Diversified", "Aerospace/Defense Products & Services", "Cement", "Diversified Machinery", "Farm & Construction Machinery", "General Building Materials", "General Contractors", "Heavy Construction", "Industrial Electrical Equipment", "Industrial Equipment & Components", "Lumber, Wood Production", "Machine Tools & Accessories", "Manufactured Housing", "Metal Fabrication", "Pollution & Treatment Controls", "Residential Construction", "Small Tools & Accessories", "Textile Industrial", "Waste Management"],
  'Services': ["Advertising Agencies", "Air Delivery & Freight Services", "Air Services, Other", "Apparel Stores", "Auto Dealerships", "Auto Parts Stores", "Auto Parts Wholesale", "Basic Materials Wholesale", "Broadcasting - Radio", "Broadcasting - TV", "Building Materials Wholesale", "Business Services", "CATV Systems", "Catalog & Mail Order Houses", "Computers Wholesale", "Consumer Services", "Department Stores", "Discount, Variety Stores", "Drug Stores", "Drugs Wholesale", "Education & Training Services", "Electronics Stores", "Electronics Wholesale", "Entertainment - Diversified", "Food Wholesale", "Gaming Activities", "General Entertainment", "Grocery Stores", "Home Furnishing Stores", "Home Improvement Stores", "Industrial Equipment Wholesale", "Jewelry Stores", "Lodging", "Major Airlines", "Management Services", "Marketing Services", "Medical Equipment Wholesale", "Movie Production, Theaters", "Music & Video Stores", "Personal Services", "Publishing - Books", "Publishing - Newspapers", "Publishing - Periodicals", "Railroads", "Regional Airlines", "Rental & Leasing Services", "Research Services", "Resorts & Casinos", "Restaurants", "Security & Protection Services", "Shipping", "Specialty Eateries", "Specialty Retail, Other", "Sporting Activities", "Sporting Goods Stores", "Staffing & Outsourcing Services", "Technical Services", "Toy & Hobby Stores", "Trucking", "Wholesale, Other"],
  'Technology': ["Application Software", "Business Software & Services", "Communication Equipment", "Computer Based Systems", "Computer Peripherals", "Data Storage Devices", "Diversified Communication Services", "Diversified Computer Systems", "Diversified Electronics", "Healthcare Information Services", "Information & Delivery Services", "Information Technology Services", "Internet Information Providers", "Internet Service Providers", "Internet Software & Services", "Long Distance Carriers", "Multimedia & Graphics Software", "Networking & Communication Devices", "Personal Computers", "Printed Circuit Boards", "Processing Systems & Products", "Scientific & Technical Instruments", "Security Software & Services", "Semiconductor - Broad Line", "Semiconductor - Integrated Circuits", "Semiconductor - Specialized", "Semiconductor Equipment & Materials", "Semiconductor- Memory Chips", "Technical & System Software", "Telecom Services - Domestic", "Telecom Services - Foreign", "Wireless Communications"],
  'Utilities': ["Diversified Utilities", "Electric Utilities", "Foreign Utilities", "Gas Utilities", "Water Utilities"]
};
function populateIndustry(Sector) {
  Sector = Sector.replace(/ /,'');

  // Check that there are industries for the sector
  if ( typeof Industries[Sector] == "undefined" || Industries[Sector].length == 0 ) {
    console.log(typeof Industries[Sector] == "undefined", Industries[Sector].length == 0);
    return false;
  }

  // Save industries in data
  var data = Industries[Sector];

  // Create the string
  var RetStr = '<div class="dropdown_car"></div>'; // Caret on top of dropdown
  for ( var index = 0; index < data.length; index++ ) {
    if ( index > 0 ) {
      RetStr = RetStr + '<div class="dropdown_divider"></div>';
    }
    RetStr = RetStr + '<div class="dropdown_item" title="' + data[index] + '">' + data[index] + '</div>';
  }

  $('#ModIndustry .dropdown').html(RetStr);
  $('#ModIndustry').removeClass('disabled');
}

Template.find_company.events({
  'mousedown #ModShare .slider_ball': function(event) {
    if ( !$(event.target).hasClass('slider_ball') ) {
      return false;
    }
    $('html').mousemove({'ball': event.target, 'startx': event.clientX, 'startLeft': $(event.target).position().left},function(event){
      moveBallShare(event.data.ball, event.data.startLeft + event.clientX - event.data.startx);
    });
    $('html').mouseup(function(){
      $('html').unbind('mousemove');
      $('html').unbind('mouseup');
    });
  },
  'mousedown #ModCap .slider_ball': function(event) {
    if ( !$(event.target).hasClass('slider_ball') ) {
      return false;
    }
    $('html').mousemove({'ball': event.target, 'startx': event.clientX, 'startLeft': $(event.target).position().left},function(event){
      moveBallCap(event.data.ball, event.data.startLeft + event.clientX - event.data.startx);
    });
    $('html').mouseup(function(){
      $('html').unbind('mousemove');
      $('html').unbind('mouseup');
    });
  },
  'click .find_cmp_dd_menu': function(event) {
    if ( $(event.currentTarget).hasClass('noclick') || $(event.currentTarget).hasClass('disabled') ) {
      return false;
    }
    if ( $(event.currentTarget).hasClass('active') ) {
      $('html').unbind('click');
      $('.find_cmp_dd_menu.active').removeClass('active');
      return false;
    }
    if ( Session.get('IsOpenDropdown') ) {
      $('html').unbind('click');
      $('.find_cmp_dd_menu.active').removeClass('active');
    }
    $(event.currentTarget).addClass('active');
    Session.set('IsOpenDropdown',true);
    setTimeout(function () {
      $('html').click(function(event){
        $('.find_cmp_dd_menu.active').removeClass('active');
        $('html').unbind('click');
      });
    }, 1);
  },
  'click .dropdown .dropdown_item': function(event) {
    var name = $(event.target)[0].innerHTML;
    $('.find_cmp_dd_menu').click({'text': name},function(event){
      $(event.currentTarget).find('.find_cmp_dd_menu_txt').each(function(){
        $(this).html(event.data.text);
      });
      $('.find_cmp_dd_menu').unbind('click');
    });
    populateIndustry(name);
  }
});
