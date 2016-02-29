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
  return tag_alias.domain;
}
