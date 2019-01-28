# mui-dropzone
## a File Drop Zone component that uses Material-UI components for style. Also includes Excel and File helper functions.

> 

[![NPM](https://img.shields.io/npm/v/mui-dropzone.svg)](https://www.npmjs.com/package/mui-dropzone) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save mui-dropzone @material-ui/core xlsx
#or
yarn add mui-dropzone @material-ui/core xlsx
```

## Usage

### FileDropZone

```js
import * as React from 'react'

import { FileDropZone } from 'mui-dropzone';


class Example extends React.Component {

  onFilesAdded = (files) => {
    console.log("files added!", files);
  }

  onFilesRejected = (files) => {
    console.log("files rejected!", files);
  }

  render () {
    return (
      <FileDropZone
        acceptedMimeTypes={excel.excelMimeTypes}
        onFilesAdded={this.onFilesAdded}
        onFilesRejected={this.onFilesRejected}
        elevation={2}
        dragOverElevation={10} />
    )
  }
}
```
#### Other Properties:

* `message`: set the message displayed in the dropzone
* `dragOverMessage`: set the message displayed when a file is dragged over the dropzone
* `acceptedExtensions`: similar to `acceptedMimeTypes`, but looks at file extension. **not** mutually exclusive with `acceptedMimeTypes`.
* `blockOtherDrops`: disallows any file drop events on the page anywhere but the dropzone. Useful to prevent users from dropping files in the wrong area.

### excel
#### a module with excel file helpers.

```js
import { excel } from 'mui-dropzone';

//get file from FileDropZone onFilesAdded event
let data = await excel.parseExcel(file);
//data will be a dictionary with a key per worksheet in the workbook. First row of each will be treated as column headers
```

### files
#### a module with javascript file helpers.

```js
import { files } from 'mui-dropzone';

let buff = await files.loadFileAsArrayBuffer(file);
let text = await files.loadFileAsText(file);
```

## License

MIT © [curtisrutland](https://github.com/curtisrutland)

## Details

Bootstrapped with [Create-React-Library](https://github.com/transitive-bullshit/create-react-library)