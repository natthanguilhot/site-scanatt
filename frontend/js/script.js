class Record {
    constructor (patient, scan, impression) {
        this.isPrinting = false;
        this.isFinished = false;
        this.patient = patient;
        this.scan = scan;
        this.impression = impression;
        this.isDeleted = false;
        this.dateDeleted = "";
    }
};

Date.prototype.DDMMYYYYHHMMSS = function () {
    var yyyy = this.getFullYear();
    var MM = this.getMonth() + 1;
    var dd = this.getDate();
    var hh = this.getHours();
    var mm = this.getMinutes();
    var ss = this.getSeconds();
    return [
        (dd>9 ? '' : '0') + dd,
        (MM>9 ? '' : '0') + MM,
        yyyy].join('/') + "-" +
        [(hh>9 ? '' : '0') + hh,
        (mm>9 ? '' : '0') + mm,
        (ss>9 ? '' : '0') + ss].join(':');
};

Date.prototype.diffInDays = function (other) {
    return Math.round((other.valueOf()-this.valueOf())/(1000*60*60*24));
};

function convertHTMLDate (date) {
    let dateToSplitted = date.split('-');
    return dateToSplitted[2]+'/'+dateToSplitted[1]+'/'+dateToSplitted[0];
};
