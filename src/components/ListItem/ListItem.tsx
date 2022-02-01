import React from 'react';
import { Item } from '../UserList/UserList';
import { CommitBtn, ItemWrapper } from './ListItem.styles';
import { useState } from 'react';
import KeyValDisplay from '../KeyValDisplay/KeyValDisplay';

type Props = {
   item: Item,
   index: number,
   updateField: (item: Item, index: number) => void

}

const ListItem: React.FC<Props> = ({ item, index, updateField }) => {
	const [localUserState, setLocalUserState] = useState(item);

	const updateLocalState = (keyName: string, keyVal: string | boolean | number):void => {
		setLocalUserState({ ...localUserState, [keyName]: keyVal });
	};

	const itemKeys = Object.keys(item);

	return (
		<ItemWrapper>

			{itemKeys.map((fieldName:string) => (
				<KeyValDisplay
					key={fieldName}
					keyName={fieldName}
					keyVal={item[fieldName]}
					updateField={updateLocalState}
				/>
			))}
			<CommitBtn onClick={() => updateField(localUserState, index)}>Commit</CommitBtn>
		</ItemWrapper>
	);
};

export default ListItem;
