/**
 * @providesModule utils/moment
 */

import moment from 'moment-timezone';

require('moment/locale/zh-tw');

moment.updateLocale('zh-tw', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '週日_週一_週二_週三_週四_週五_週六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah 點 mm 分',
    LTS: 'Ah 點 m 分 s 秒',
    L: 'YYYY 年 MMMD 日',
    LL: 'YYYY 年 MMMD 日',
    LLL: 'YYYY 年 MMMD 日 Ah 點 mm 分',
    LLLL: 'YYYY 年 MMMD 日 ddddAh 點 mm 分',
    l: 'YYYY 年 MMMD 日',
    ll: 'YYYY 年 MMMD 日',
    lll: 'YYYY 年 MMMD 日 Ah 點 mm 分',
    llll: 'YYYY 年 MMMD 日 ddddAh 點 mm 分'
  },
  meridiemParse: /早上|上午|中午|下午|晚上/,
  meridiemHour: function (h, meridiem) {
    var hour = h;
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '早上' || meridiem === '上午') {
      return hour;
    } else if (meridiem === '中午') {
      return hour >= 11 ? hour: hour + 12;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    }
  },
  meridiem: function (hour, minute, isLower) {
    var hm = hour * 100 + minute;
    if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: 'ddddLT',
    sameElse: 'L'
  },
  ordinalParse: /\d{1,2}(日|月|週)/,
  ordinal: function (number, period) {
    switch (period) {
    case 'd' :
    case 'D' :
    case 'DDD' :
      return number + ' 日';
    case 'M' :
      return number + ' 月';
    case 'w' :
    case 'W' :
      return number + ' 週';
    default :
      return number;
    }
  },
  relativeTime: {
    future: '%s內',
    past: '%s前',
    s: '幾秒',
    m: '1 分鐘',
    mm: '%d 分鐘',
    h: '1 小時',
    hh: '%d 小時',
    d: '1 天',
    dd: '%d 天',
    M: '1 個月',
    MM: '%d 個月',
    y: '1 年',
    yy: '%d 年'
  }
});

// TODO: I18n this
moment.locale('zh-tw');
moment.tz.setDefault('Asia/Taipei');

export default moment;

export const getCalendarDateLocale = () => {
  let calendarLocale = moment.localeData() &&
                       moment.localeData()._config &&
                       moment.localeData()._config.calendar;
  let cl = calendarLocale;
  return {
    sameDay: cl.sameDay ? removeTimeFromLocaleString(cl.sameDay) : '[Today]',
    nextDay: cl.nextDay ? removeTimeFromLocaleString(cl.nextDay) : '[Tomorrow]',
    nextWeek: cl.nextWeek ? removeTimeFromLocaleString(cl.nextWeek) : 'dddd',
    lastDay: cl.lastDay ? removeTimeFromLocaleString(cl.lastDay) : '[Yesterday]',
    lastWeek: cl.lastWeek ? removeTimeFromLocaleString(cl.lastWeek) : '[Last] dddd',
    sameElse: cl.sameElse || 'L'
  };
};

function removeTimeFromLocaleString(s) {
  s = s.replace('LT', '');
  s = s.replace('at', '');
  s = s.replace(' ', '');
  return s;
}
