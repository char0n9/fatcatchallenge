import React from 'react';

export type Props = {
    uploadHandler: (data:string)=>void;
}

const Upload: React.FC<Props> = ({ uploadHandler }) => {
	const handleFile = (e:ProgressEvent<FileReader>) => {
		if (e.target?.result && typeof e.target.result === 'string') {
			const content = e.target.result;
			uploadHandler(content);
		}
	};

	const loadJSON = (files: FileList | null): void => {
		if (files) {
			const fileData = new FileReader();
			fileData.onloadend = handleFile;
			fileData.readAsText(files[0]);
		}
	};

	return (
		<div>
			<input type="file" onChange={e => loadJSON(e.target.files)} aria-label="upload a JSON" />
		</div>
	);
};

export default Upload;
