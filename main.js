import FileSaver from 'file-saver';

import { Buffer }     from 'buffer/';
import { decompiler } from 'dso.js';


const errorElement = document.getElementById ('error');


const setErrorMessage = message =>
{
	errorElement.innerHTML = message;
};

const decompileFile = ( files, index ) =>
{
	if ( index >= files.length )
	{
		return;
	}

	const file = files[index];

	if ( file.name.substr (-4).toLowerCase () !== '.dso' )
	{
		setErrorMessage (`ERROR: File does not have a .dso extension`);
		return;
	}

	const reader = new FileReader ();

	reader.readAsArrayBuffer (file);

	reader.onload = readerEvent =>
	{
		const buffer = Buffer.from (readerEvent.target.result);

		let codeString;

		try
		{
			codeString = decompiler.decompileDSO (buffer);
		}
		catch ( error )
		{
			setErrorMessage (`ERROR in ${file.name}: ${error.message}`);
			return;
		}

		const saveName = file.name.replace (/\b.dso\b/g, '');

		FileSaver.saveAs (new Blob ([codeString], { type: 'text/plain;charset=utf-8' }), saveName);

		decompileFile (files, index + 1);
	};
};


document.getElementById ('fileUpload').onchange = event =>
{
	const { files } = event.target;

	if ( files.length <= 0 )
	{
		return;
	}

	setErrorMessage ('');

	decompileFile (files, 0);
};
