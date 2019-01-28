export function loadFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result as ArrayBuffer;
            resolve(data);
        }
        reader.readAsArrayBuffer(file);
    });
}

export function loadFileAsText(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            const data = reader.result as string;
            resolve(data);
        }
        reader.readAsText(file);
    });
}

export function convertFileListToArray(list: FileList | undefined | null): File[] {
    const results: File[] = [];
    if (!list) return results;
    for (let i = 0; i < list.length; i++)
        results.push(list[i]);
    return results;
}