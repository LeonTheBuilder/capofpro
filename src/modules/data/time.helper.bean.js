class TimeHelper {
    dateInt() {
        const dateStr = this.Sugar.curDate2String('YYYYMMDD');
        return Number(dateStr);
    }

    hourInt() {
        const hourStr = this.Sugar.curDate2String('HH');
        return Number(hourStr);
    }

    dateHourInt() {
        const dateHourStr = this.Sugar.curDate2String('YYYYMMDDHH');
        return Number(dateHourStr);
    }


    dateStrToDateInt(dateStr) {

    }
}

module.exports = TimeHelper;