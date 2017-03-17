/**
 * Created by navyaeetaram on 3/16/17.
 */

setMetaTags = function(metaAttr){
    console.log("this function is called");
    for (var key in metaAttr) {
        if (metaAttr.hasOwnProperty(key)) {
            if (key.indexOf("og:") > -1) {
                DocHead.addMeta({
                    property: key,
                    content: metaAttr[key]
                })
            } else {
                DocHead.addMeta({
                    name: key,
                    content: metaAttr[key]
                })
            }
        }
    }
}


