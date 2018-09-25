
export default {
  formatDateTime: function(date) {
    if (date == undefined || date === null || date === "") {
      return '';
    }
    try {
      date = new Date(date);
    } catch (e) {
      console.error("date format error", date);
      return '';
    }
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();
    var hour = '' + date.getHours();
    var min = '' + date.getMinutes();
    var sec = '' + date.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    min = min.length < 2 ? ('0' + min) : min;
    sec = sec.length < 2 ? ('0' + sec) : sec;

    return [year, month, day].join('-') + " " + [hour, min, sec].join(":");
  },

  fileUploadPath: function () {
    return `${process.env.NODE_ENV}/file/upload`;
  }
}
