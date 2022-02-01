import React from 'react';
import { useState, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import ListItem from '../ListItem/ListItem';
import Upload from '../Upload/Upload';

export type Item = {

		[key: string] : string | boolean | number
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

	const uploadHandler = (data:string):void => setData(JSON.parse(data));
	return (
		<div>
			<Upload uploadHandler={uploadHandler} />

			<List
				className="List"
				height={window.innerHeight ? window.innerHeight - 10 : 100}
				itemData={data}
				itemCount={data.length}
				itemSize={275}
				width="100%"
			>
				{Row}
			</List>
		</div>
	);
};

export default UserList;
