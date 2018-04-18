$.urlParam = function urlParam(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
//check number range
//using on main page for checking the range of data
$.between = function(a,b,c){
    return (a < b ? c >= a && c <= b : c >= b && c <= a);
}

//Number formatter for putting comma on every 3 digits

    Number.prototype.numberFormat = function(decimals, dec_point, thousands_sep) {
      dec_point = typeof dec_point !== 'undefined' ? dec_point : '.';
      thousands_sep = typeof thousands_sep !== 'undefined' ? thousands_sep : ',';

      var parts = this.toFixed(decimals).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);

      return parts.join(dec_point);
  }
