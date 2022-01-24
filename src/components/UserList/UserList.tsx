import React from 'react';
import { useState, useEffect, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import ListItem from '../ListItem/ListItem';

export type Item = {
        'id': string,
        'isActive': boolean,
        'picture': string,
        'age': number,
        'name': string,
        'email': string,
        'address': string,
        'about': string,
        'registered': string,
}

const UserList: React.FC = () => {
	const [data, setData] = useState<Item[]>([]);

	const updateField = (item: Item, index: number) => {
		const newData = data.slice();
		newData[index] = item;
		setData(newData);
	};

	const Row = ({ index, style, data }: {index: number, style: CSSProperties, data: Item[]}) => (
		<div style={style}>
			{data.length > 0 && <ListItem index={index} item={data[index]} updateField={updateField} />}
		</div>
	);

	// mimic API call
	const getData = (): Promise<void> =>
		fetch('data.json',
			{
				headers: {

					'Content-Type': 'application/json',

					Accept: 'application/json',

				},
			})
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				// console.log(myJson);
				setData(myJson);
			});

	useEffect(() => {
		getData();
	}, []);
	return (

		<List
			className="List"
			height={window.innerHeight - 10}
			itemData={data}
			itemCount={data.length}
			itemSize={150}
			width="100%"
		>
			{Row}
		</List>
	);
};

export default UserList;
