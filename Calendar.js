'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
	ListView,
	StyleSheet,
	Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

import Month from './Month';


export default class Calendar extends React.Component {
	static defaultProps = {
		startDate: new Date(),
		monthsCount: 24,
		onSelectionChange: () => {
		},

		monthsLocale: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
			'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
		weekDaysLocale: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],

		width: width,

		bodyBackColor: 'white',
		bodyTextColor: 'rgba(52,72,94,0.54)',
		headerSepColor: 'grey',

		monthTextColor: '#363636',

		dayCommonBackColor: 'white',
		dayCommonTextColor: '#363636',

		dayDisabledBackColor: 'white',
		dayDisabledTextColor: '#E1E4E7',

		daySelectedBackColor: '#004BBB',
		daySelectedTextColor: 'white',

		dayInRangeBackColor: '#004BBB',
		dayInRangeTextColor: '#FFFFFF',

		isFutureDate: true,
		rangeSelect: true,
		startFromMonday: true
	};

	static propTypes = {
		selectFrom: PropTypes.instanceOf(Date),
		selectTo: PropTypes.instanceOf(Date),

		monthsCount: PropTypes.number,
		startDate: PropTypes.instanceOf(Date),

		monthsLocale: PropTypes.arrayOf(PropTypes.string),
		weekDaysLocale: PropTypes.arrayOf(PropTypes.string),
		startFromMonday: PropTypes.bool,

		onSelectionChange: PropTypes.func,

		width: PropTypes.number,

		bodyBackColor: PropTypes.string,
		bodyTextColor: PropTypes.string,
		headerSepColor: PropTypes.string,

		monthTextColor: PropTypes.string,

		dayCommonBackColor: PropTypes.string,
		dayCommonTextColor: PropTypes.string,

		dayDisabledBackColor: PropTypes.string,
		dayDisabledTextColor: PropTypes.string,

		daySelectedBackColor: PropTypes.string,
		daySelectedTextColor: PropTypes.string,

		dayInRangeBackColor: PropTypes.string,
		dayInRangeTextColor: PropTypes.string,

		isFutureDate: PropTypes.bool,
		rangeSelect: PropTypes.bool
	};

	constructor(props) {
		super(props);

		this.changeSelection = this.changeSelection.bind(this);
		this.generateMonths = this.generateMonths.bind(this);

		let {selectFrom, selectTo, monthsCount, startDate} = this.props;

		this.selectFrom = selectFrom;
		this.selectTo = selectTo;
		this.months = this.generateMonths(monthsCount, startDate);

		var dataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});

		this.state = {
			dataSource: dataSource.cloneWithRows(this.months)
		}
	}

	rowHasChanged(r1, r2) {
		for (var i = 0; i < r1.length; i++) {
			if (r1[i].status !== r2[i].status && !r1[i].disabled) {
				return true;
			}
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.selectFrom && nextProps.selectTo){
			this.selectFrom = nextProps.selectedFrom;
			this.selectTo = nextProps.selectTo;
			this.changeSelection(nextProps.selectFrom);
		}
	}

	generateMonths(count, startDate) {
		var months = [];
		var dateUTC;
		var monthIterator = startDate;
		var {isFutureDate, startFromMonday} = this.props;

		var startUTC = Date.UTC(startDate.getYear(), startDate.getMonth(), startDate.getDate());

		for (var i = 0; i < count; i++) {
			var month = this.getDates(monthIterator, startFromMonday);

			months.push(month.map((day) => {
				dateUTC = Date.UTC(day.getYear(), day.getMonth(), day.getDate());
				return {
					date: day,
					status: this.getStatus(day, this.selectFrom, this.selectTo),
					disabled: day.getMonth() !== monthIterator.getMonth()
					|| ((isFutureDate) ? startUTC > dateUTC : startUTC < dateUTC)
				}
			}));

			if (isFutureDate) {
				monthIterator.setMonth(monthIterator.getMonth() + 1);
			} else {
				monthIterator.setMonth(monthIterator.getMonth() - 1);
			}
		}

		return months;
	}

	getDates(month, startFromMonday) {
		month = new Date(month);
		month.setDate(1);

		var delta = month.getDay();
		if (startFromMonday) {
			delta--;
			if (delta === -1) delta = 6;
		}

		var startDate = new Date(month);
		startDate.setDate(startDate.getDate() - delta);

		month.setMonth(month.getMonth() + 1);
		month.setDate(0);

		delta = 6 - month.getDay();
		if (startFromMonday) {
			delta++;
			if (delta === 7) delta = 0;
		}

		var lastDate = new Date(month);
		lastDate.setDate(lastDate.getDate() + delta);

		var allDates = [];
		while (startDate <= lastDate) {
			allDates.push(new Date(startDate));
			startDate.setDate(startDate.getDate() + 1);
		}
		return allDates;
	}

	changeSelection(value) {
		var {selectFrom, selectTo, months} = this;

		if (!selectFrom) {
			selectFrom = value;
		} else if (!selectTo) {
			if (value > selectFrom) {
				selectTo = value;
			} else {
				selectFrom = value;
			}
		} else if (selectFrom && selectTo) {
			selectFrom = value;
			selectTo = null;
		}

		months = months.map((month) => {
			return month.map((day) => {
				return {
					date: day.date,
					status: this.getStatus(day.date, selectFrom, selectTo),
					disabled: day.disabled
				}
			})
		});

		if (this.props.rangeSelect) {
			this.selectFrom = selectFrom;
			this.selectTo = selectTo;
		} else {
			this.selectFrom = this.selectTo = selectFrom;
		}

		this.months = months;
		const selectedRange = this.props.rangeSelect ? {selectFrom, selectTo} : null
		this.props.onSelectionChange(value, this.prevValue, selectedRange);
		this.prevValue = value;

		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(months)
		});
	}

	getStatus(date, selectFrom, selectTo) {
		if (selectFrom) {
			if (selectFrom.toDateString() === date.toDateString()) {
				return 'selectedFrom';
			}
		}
		if (selectTo) {
			if (selectTo.toDateString() === date.toDateString()) {
				return 'selectedTo';
			}
		}
		if (selectFrom && selectTo) {
			if (selectFrom < date && date < selectTo) {
				return 'inRange';
			}
		}
		return 'common';
	}

	render() {
		let {style, isFutureDate} = this.props;
		let directionStyles = {};

		if (!isFutureDate) {
			directionStyles = {
				transform: [{scaleY: -1}]
			}
		}

		return (
			<ListView
				showsVerticalScrollIndicator={false}
				initialListSize={5}
				scrollRenderAheadDistance={1200}
				style={[styles.listViewContainer, directionStyles, style]}
				dataSource={this.state.dataSource}
				renderRow={(month) => {
					return (
						<Month
							{...this.props}
							days={month}
							style={[styles.month, directionStyles]}
							changeSelection={this.changeSelection}
						/>
					);
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	listViewContainer: {
		flex: 1,
		backgroundColor: 'white',
		alignSelf: 'stretch',
	},
	month: {
	}
});
