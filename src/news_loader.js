/*const loadStyleSheet = e => {
    if (document.createStyleSheet) document.createStyleSheet(e);
    else {
        const t = document.createElement("link");
        t.href = e, t.type = "text/css", t.rel = "stylesheet", document.getElementsByTagName("head")[0].appendChild(t)
    }
};*/
var injectLibFromStack = function() {
        if (libs.length > 0) {
            var e = libs.shift(),
                t = document.getElementsByTagName("head")[0],
                s = document.createElement("script");
            s.src = e, s.onload = function(e) {
                injectLibFromStack()
            }, t.appendChild(s)
        }
    },
    libs = [
    "https://code.jquery.com/jquery-3.2.1.slim.min.js", 
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js", 
    "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js", 
    /*"https://cdn.jsdelivr.net/npm/vue", 
    "https://cdnjs.cloudflare.com/ajax/libs/date-fns/1.30.1/date_fns.min.js", 
    "./src/calendar_labels_ru.js", 
    "./src/calendar.js", 
    "./src/index.js"*/
    ];
window.onload = function() {
    /*loadStyleSheet("./src/news2.css"), */
    injectLibFromStack()
}