//FOR NEXSTAR GRABBING viewPort
getViewPort = function()
{
    var screenWidth, screenHeight;
    if ( typeof window.innerWidth == 'number' )
    {
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
    } else if ( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
    {
        screenWidth = document.documentElement.clientWidth;
        screenHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        screenWidth = document.body.clientWidth;
        screenHeight = document.body.clientHeight;
    }
    return { width: screenWidth, height: screenHeight };
}
getTagInfo = function()
{
    window.groupId = window.groupId == undefined ? Math.round( Math.random() * 1000 ) : window.groupId;
    var viewPort = getViewPort();
    var alias = viewPort.width <= 768 ? 'mobile' : ( viewPort.width > 768 && viewPort.width <= 1006 ? 'tablet' : 'display' );
    var domain = alias == 'mobile' ? 'a' : ( alias == 'tablet' ? 'a' : 'adserver' );
    return { domain: domain, alias: alias, groupId: groupId, viewPort: viewPort }
}

getScript = function(domain){
  domain = domain.toLowerCase();
  var tag_alias;
  tag_alias ={
    'bigcountryhomepage.com':'ktab',
    'everythinglubbock.com':'klbk',
    'fortwaynehomepage.net':'wfft',
    'kerngoldenempire.com':'kget',
    'myarklamiss.com':'ktve',
    'myeasttex.com':'ketk',
    'nwahomepage.com':'knwa',
    'ozarksfirst.com':'kolr',
    'texomashomepage.com':'kfdx',
    'wearecentralpa.com':'wtaj',
    'mytwintiers.com':'wetm',
    'lasvegasnow.com':'klas'
  }
  return tag_alias[domain];
}

getDomainAds = function(domain){
  domain = domain.toLowerCase();
  var ad_placement_id;
  ad_placement_id ={
    'bigcountryhomepage.com':{skyscraper:'3665471',banner:'3665470'},
    'everythinglubbock.com':{skyscraper:'3665482',banner:'3665483'},
    'fortwaynehomepage.net':{skyscraper:'3665497',banner:'3665498'},
    'kerngoldenempire.com':{skyscraper:'3665503',banner:'3665504'},
    'myarklamiss.com':{skyscraper:'3665510',banner:'3665509'},
    'myeasttex.com':{skyscraper:'3665511',banner:'3665512'},
    'nwahomepage.com':{skyscraper:'3665542',banner:'3665541'},
    'ozarksfirst.com':{skyscraper:'3665545',banner:'3665544'},
    'texomashomepage.com':{skyscraper:'3665555',banner:'3665556'},
    'wearecentralpa.com':{skyscraper:'3665557',banner:'3665558'},
    'mytwintiers.com':{skyscraper:'3665533',banner:'3665534'},
    'lasvegasnow.com':{skyscraper:'3932195',banner:'3932196'},
  }
  return ad_placement_id[domain];
}
