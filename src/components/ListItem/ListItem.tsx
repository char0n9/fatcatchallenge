import React from 'react';
import { Item } from '../UserList/UserList';
import { PropertyName, ItemWrapper, PropertyWrapper } from './ListItem.styles';
import { useState } from 'react';

type Props = {
   item: Item;
   index: number;
   updateField: (item: Item, index: number) => void

}

const ListItem: React.FC<Props> = ({ item, index, updateField }) => {
	const [localUserState, setLocalUserState] = useState(item);

	const updateLocalState = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
		switch (field) {
		case 'id':
			break;
		case 'isActive':
			setLocalUserState({ ...item, isActive: Boolean(e.target.checked) });
			break;
		case 'picture':
			setLocalUserState({ ...item, picture: e.target.value });
			break;
		case 'age':
			setLocalUserState({ ...item, age: Number(e.target.value) });
			break;
		case 'name':
			setLocalUserState({ ...item, name: e.target.value });
			break;
		case 'email':
			setLocalUserState({ ...item, email: e.target.value });
			break;
		case 'address':
			setLocalUserState({ ...item, address: e.target.value });
			break;
		case 'registered':
			setLocalUserState({ ...item, registered: e.target.value });
			break;
		}
	};

	// I can't for the life of me figure how to get this to work with TS,
	// it just complains if I try 2 types for 'e' in the above function
	// could switch to class components but running out of time oh well
	const updateLocalTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setLocalUserState({ ...item, about: e.target.value });

	const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newItem: Item = { ...item, age: Number(e.target.value) };
		updateField(newItem, index);
	};

	return (
		<ItemWrapper>
			<PropertyWrapper>
				<PropertyName>
					id:
				</PropertyName>
				{' '}
				{item.id}
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					isActive:
				</PropertyName>
				{' '}
				{String(item.isActive)}
				<input type="checkbox" defaultChecked={localUserState.isActive} onChange={e => updateLocalState(e, 'isActive')} />

			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					picture:
				</PropertyName>
				{' '}
				{item.picture}
				<input type="url" defaultValue={localUserState.picture} onChange={e => updateLocalState(e, 'picture')} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					age:
				</PropertyName>
				{' '}
				{item.age}
				<input type="number" defaultValue={localUserState.age} onChange={e => updateLocalState(e, 'age')} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					name:
				</PropertyName>
				{' '}
				{item.name}
				<input type="text" defaultValue={localUserState.name} onChange={e => updateLocalState(e, 'name')} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					e-mail:
				</PropertyName>
				{' '}
				{item.email}
				<input type="email" defaultValue={localUserState.email} onChange={e => updateLocalState(e, 'email')} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					address:
				</PropertyName>
				{' '}
				{item.address}
				<input type="text" defaultValue={localUserState.address} onChange={e => updateLocalState(e, 'address')} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					about:
				</PropertyName>
				{' '}
				{item.about}
				<textarea defaultValue={localUserState.about} onChange={updateLocalTextArea} />
			</PropertyWrapper>
			<PropertyWrapper>
				<PropertyName>
					registered:
				</PropertyName>
				{' '}
				{item.registered.slice(0, 10)}
				<input type="date" defaultValue={item.registered.slice(0, 10)} onChange={e => updateLocalState(e, 'registered')} />
			</PropertyWrapper>
			<button type="button" onClick={() => updateField(localUserState, index)}>
				<span role="img" aria-label="update changes">
					Commit changes 📝
				</span>
			</button>
		</ItemWrapper>
	);
};

export default ListItem;
