import JSZip from 'JSZip';
import { saveAs } from 'file-saver';

export function render(template, data, lineending="\n") {
    Object.keys(data).forEach(key => {
        template = template.replaceAll(`{${key}}`, data[key])
    });

    if (lineending !== "\n") template = template.replaceAll("\n", lineending)
        
    return template
}

export function generateZip(csvFilename, files) {
    let zip = new JSZip();
    let markdownFiles = zip.folder("files");

    files.forEach(file => {
        markdownFiles.file(file.name, file.content);
    });

    zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, `${csvFilename}-to-markdown.zip`);
    });
}