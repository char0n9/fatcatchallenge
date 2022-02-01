import React, { useState } from 'react';
import { PropertyWrapper, PropertyName } from './KeyValDisplay.styles';
import { DateTime } from 'luxon';

type Props = {
    keyName: string;
    keyVal: string | boolean | number ;
    updateField: (keyName: string, keyVal: string | number | boolean) => void
 }
const KeyValDisplay: React.FC<Props> = ({ keyName, keyVal, updateField }) => {
	let output = null;
	const longTextRegex = new RegExp(/\r|\n/);
	const [localRadioState, setLocalRadioState] = useState(typeof keyVal === 'boolean' && keyVal.toString() === 'true');

	const handleChange = (value: string | number | boolean, type: string) : void => {
		switch (type) {
		case 'longtext':
			updateField(keyName, String(`${value}\n`));
			break;
		case 'number':
			updateField(keyName, Number(value));
			break;
		case 'boolean':
			setLocalRadioState(value === 'true');
			updateField(keyName, value === 'true');
			break;
		case 'datetime-local':
			updateField(keyName, DateTime.fromISO(String(value)).toISO());
			break;
		default:
			updateField(keyName, value);
			break;
		}
	};

	const getInputType = (str: string) => {
		const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
		const urlRegex = new RegExp(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/);
		const dt = DateTime.fromISO(str);
		if (dt.isValid) return 'datetime-local';
		if (emailRegex.test(str)) return 'email';
		if (urlRegex.test(str)) return 'url';
		return 'text';
	};
	if (keyName === 'id') {
		output = (
			<PropertyWrapper>
				<PropertyName>
					id:
				</PropertyName>
				{' '}
				{keyVal}
			</PropertyWrapper>
		);
		return output;
	}
	switch (typeof keyVal) {
	case 'string':
		output = (
			<PropertyWrapper>
				<PropertyName>
					{keyName}
					:
				</PropertyName>
				{' '}
				{keyVal}
				{longTextRegex.test(keyVal) || keyVal.length > 50 ?
					(
						<div>

							<textarea
								placeholder={`Edit ${keyName} here`}
								rows={3}
								cols={25}
								onChange={e => handleChange(e.target.value, 'longtext')}
							/>
						</div>
					)
					: (
						<input
							type={getInputType(keyVal)}
							placeholder={`Edit ${keyName} here`}
							onChange={e => handleChange(e.target.value, getInputType(keyVal))}
						/>
					)}
			</PropertyWrapper>
		);
		break;
	case 'number':
		output = (
			<PropertyWrapper>
				<PropertyName>
					{keyName}
					:
				</PropertyName>
				{' '}
				{keyVal}
				<input
					type="number"
					placeholder={`Edit ${keyName} here`}
					onChange={e => handleChange(Number(e.target.value), 'number')}

				/>
			</PropertyWrapper>
		);
		break;
	case 'boolean':
		output = (
			<PropertyWrapper>
				<PropertyName>
					{keyName}
					:
				</PropertyName>
				{' '}
				<div>
					<input
						type="radio"
						value="true"
						checked={localRadioState.toString() === 'true'}
						onChange={e => handleChange(e.target.value, 'boolean')}
					/>
					{' '}
					True
					<input
						type="radio"
						value="false"
						checked={localRadioState.toString() === 'false'}
						onChange={e => handleChange(e.target.value, 'boolean')}
					/>
					{' '}
					False
				</div>

			</PropertyWrapper>
		);
		break;
	default:

		break;
	}
	return output;
};

export default KeyValDisplay;
