'use strict';

import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';

export default class Day extends React.Component {
	render() {
		let {date, status, disabled, onDayPress, width} = this.props;
		let onPress, textColor, backColor, selectedFromStyle, selectedToStyle, borderTopLeftRadius, borderBottomLeftRadius, borderTopRightRadius, borderBottomRightRadius ;

		if (disabled) {
			status = 'disabled';
			onPress = null;
		} else {
			onPress = () => {
				onDayPress(date);
			}
		}

		switch (status) {
			case 'disabled':
				backColor = this.props.dayDisabledBackColor;
				textColor = this.props.dayDisabledTextColor;
				break;

			case 'common':
				backColor = this.props.dayCommonBackColor;
				textColor = this.props.dayCommonTextColor;
				break;

			case 'selectedFrom':
				backColor = this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				selectedFromStyle = {borderTopLeftRadius: Math.floor(width/14), borderBottomLeftRadius: Math.floor(width/14)};
				break;

			case 'selectedTo':
				backColor = this.props.daySelectedBackColor;
				textColor = this.props.daySelectedTextColor;
				selectedToStyle = { borderTopRightRadius: Math.floor(width/14), borderBottomRightRadius: Math.floor(width/14)};
				break;

			case 'inRange':
				backColor = this.props.dayInRangeBackColor;
				textColor = this.props.dayInRangeTextColor;
				break;
		}



		const dynamicStyle = {backgroundColor: backColor, width: Math.floor(width/7), height: Math.floor(width/12)};
		const isToday = status === 'common' && new Date().toDateString() === date.toDateString() ? {borderWidth: 1, borderRadius: 15, borderColor: '#004BBB'} : {}
		return (
			<TouchableOpacity  
				activeOpacity={disabled ? 1 : 0.9}
				style={[styles.common, dynamicStyle, selectedFromStyle, selectedToStyle]}
				onPress={onPress}>
				<Text style={[{color: textColor}, styles.text, isToday]}>{date.getDate()}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	common: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		marginVertical: 3
	},
	text: {
		padding: 5,
		fontSize: 14,
		width: 30, 
		fontWeight: '500',
		textAlign: 'center',
		backgroundColor: 'transparent'
	}
});