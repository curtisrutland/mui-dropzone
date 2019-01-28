import * as XLSX from "xlsx";
import { loadFileAsArrayBuffer } from "./files";

export type RowData = {}[];
export type ExcelData = { [worksheet: string]: RowData };

export const xlsxMimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const xlsMimeType = "application/vnd.ms-excel";
export const excelMimeTypes = [xlsxMimeType, xlsMimeType];

export async function parseExcel(file: File): Promise<ExcelData> {
    try {
        let spreadsheetData = await loadSpreadsheetDataFromFile(file);
        let results = loadWorkbookFromFileData(spreadsheetData);
        return results;
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function loadSpreadsheetDataFromFile(file: File): Promise<string> {
    const data = await loadFileAsArrayBuffer(file);
    const fixed = fixData(data);
    const spreadsheetData = btoa(fixed);
    return spreadsheetData;
}

function loadWorkbookFromFileData(data: string): ExcelData {
    const wb = XLSX.read(data, { type: "base64", cellStyles: true });
    var sheetArray = wb.SheetNames
        .map(name => ({ name, rows: XLSX.utils.sheet_to_json(wb.Sheets[name]) }));
    let results: ExcelData = {};
    sheetArray.forEach(sheet => results[sheet.name] = sheet.rows);
    return results;
}

//from JS-XSLX samples, used for reading as array buffer. 
//IE does not support readAsBinaryString
function fixData(data: ArrayBuffer): string {
    var o = "",
        l = 0,
        w = 10240;
    for (l; l < data.byteLength / w; l += 1) {
        let slice = data.slice(l * w, l * w + w);
        let arr = Array.from(new Uint8Array(slice));
        o += String.fromCharCode.apply(null, arr);
    }
    let slice = data.slice(l * w);
    let arr = Array.from(new Uint8Array(slice))
    o += String.fromCharCode.apply(null, arr);
    return o;
}