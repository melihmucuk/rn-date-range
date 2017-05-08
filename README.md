# rn-date-range [![NPM Version](https://img.shields.io/npm/v/rn-date-range.svg?style=flat)](https://www.npmjs.com/package/rn-date-range) [![NPM Downloads](https://img.shields.io/npm/dm/rn-date-range.svg?style=flat)](https://www.npmjs.com/package/rn-date-range)
Date picker component for react native. Forked and edited from [react-native-day-picker](https://github.com/ivanchenko/react-native-day-picker)
 
![screenshot](https://github.com/melihmucuk/rn-date-range/blob/master/ss.png?raw=true)

## Getting Started

```sh
$ npm install rn-date-range --save
```

> **Important:** When you build app in release mode, calendar works smooth without any lags.

## Usage

```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

import Calendar from 'rn-date-range'; 

export default class RNCalendarDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Calendar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
});

AppRegistry.registerComponent('RNCalendarDemo', () => RNCalendarDemo);
```
## Properties

All properties are optional

- **`onSelectionChange`** _(func)_ — Function which will be executed on day click. First param is clicked day date, second one previous clicked day, third one selected range.

- **`startDate`** _(Date)_ — Date from which you can select dates. By default is **new Date()**.

- **`width`** _(number)_ Calendars width, should be **divided on 7 without remainder** or may cause unpredictable behaviour.

- **`selectFrom`** _(Date)_ — First day in range that will be selected from start.

- **`selectTo`** _(Date)_ — Last day in range that will be selected from start.

- **`monthsCount`** _(number)_ — Count of dates from current months to the last.

- **`startFromMonday`** _(bool)_ — If true than months will started from monday.

- **`monthsLocale`** _(arrayOf(string))_ — Strings for localization, which will be displayed in month header started from January.

- **`weekDaysLocale`** _(arrayOf(string))_ — Strings for localization, which will be displayed in week day header, started from sunday.

- **`isFutureDate`** _(boolean)_ — True if you want to select a future date. By default is **false**.=======

- **`rangeSelect`** _(bool)_ — True if you want to select a range of dates. By default is true.


### Colors
 
- **`bodyBackColor`** _(string)_ — Calendar background color.

- **`bodyTextColor`** _(string)_ — Calendar headers text color.

- **`headerSepColor`** _(string)_ — Calendar header separator color.
 
- **`dayCommonBackColor`** _(string)_ — Not selected day background color.

- **`dayCommonTextColor`** _(string)_ — Not Selected day text color.
 
- **`dayDisabledBackColor`** _(string)_ — Disabled day background color.

- **`dayDisabledTextColor`** _(string)_ — Disabled day text color.
 
- **`daySelectedBackColor`** _(string)_ — First and last day in range background color.

- **`daySelectedTextColor`** _(string)_ — First and last day in range text color.
 
- **`dayInRangeBackColor`** _(string)_ — In range day background color.

- **`dayInRangeTextColor`** _(string)_ — In range day text color.

- **`monthTextColor`** _(string)_ — Calendar month header text color.

## Support

Email melihmucuk@gmail.com for support.
