
addCustomScroller = function(className) {
  // Fields
  var scrollContainers = document.getElementsByClassName(className);
  
  for ( var i = 0; i < scrollContainers.length; i++ ) {
      var existingData = scrollContainers[i]["data-scroll"];
      if ( !existingData ) {
        var scrollData = createScrollable(scrollContainers[i], className);
        if ( scrollData ) {
            scrollContainers[i]["data-scroll"] = scrollData;
            scrollData.setupScroller();
        }
      }
      else {
          existingData.setupScroller();
      }
  }
    
  function createScrollable(scrollContainer, className) { 
    var scrollContentWrapper = scrollContainer.getElementsByClassName(className + '-wrapper');
    var scrollContent = scrollContainer.getElementsByClassName(className + '-content');
    if ( scrollContentWrapper.length === 0 || scrollContent.length === 0 ) {
      return false;
    }
    else {
      scrollContentWrapper = scrollContentWrapper[0];
      scrollContent = scrollContent[0];
    }
    
    var normalizedPosition = 0;
    var contentPosition = 0;
    var scrollerBeingDragged = false;        
            
    // Functions          
    function startDrag(evt) {
        normalizedPosition = evt.pageY;
        contentPosition = scrollContentWrapper.scrollTop;
        scrollerBeingDragged = true;
    }
    
    function stopDrag(evt) {
        scrollerBeingDragged = false;
    }

    function scrollBarScroll(evt) {
        if (scrollerBeingDragged === true) {
            var mouseDifferential = evt.pageY - normalizedPosition;
            var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
            scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
        }
    }
    
    // Setup Scroller
    var scrollbarHeightRatio = 1.00;
    var scrollbarBaseHeight = scrollContainer.offsetHeight * scrollbarHeightRatio;
    var scrollerHeight = (scrollbarBaseHeight / scrollContentWrapper.scrollHeight) * scrollbarBaseHeight;
    var scrollOffset = (scrollContainer.offsetHeight - scrollbarBaseHeight)/2; 
    var scrollerElement = scrollContainer.getElementsByClassName("scroller")[0];
    
    this.setupScroller = function() {
        scrollbarBaseHeight = scrollContainer.offsetHeight * scrollbarHeightRatio;
        scrollerHeight = (scrollbarBaseHeight / scrollContentWrapper.scrollHeight) * scrollbarBaseHeight;
        scrollOffset = (scrollContainer.offsetHeight - scrollbarBaseHeight)/2;     
        
        var addScroller = false;
        if ( !scrollerElement ) {
            addScroller = true;
            scrollerElement = document.createElement("div");
            scrollerElement.className = 'scroller';
        }

        if (scrollerHeight / scrollContainer.offsetHeight < 1){
            // *If there is a need to have scroll bar based on content size
            scrollerElement.style.height = scrollerHeight + 'px';
            scrollerElement.style.top = scrollOffset;

            if ( addScroller ) {
                // append scroller to scrollContainer div
                scrollContainer.appendChild(scrollerElement);
                
                // show scroll path divot
                scrollContainer.className += ' showScroll';

                // attach related draggable listeners                
                scrollerElement.addEventListener('mousedown', startDrag);
                window.addEventListener('mouseup', stopDrag);
                window.addEventListener('mousemove', scrollBarScroll);
            }
            else {
                scrollContentWrapper.scrollTop = 0;
                //scroller already exists
            }
        }
    
        scrollContentWrapper.addEventListener('scroll', function(evt) {
            // Move Scroll bar to top offset
            var scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
            var topPosition = (scrollPercentage * scrollContainer.offsetHeight);
            topPosition += scrollOffset;
            scrollerElement.style.top = topPosition + 'px';
        });
    };
    
    return this;
  }
};