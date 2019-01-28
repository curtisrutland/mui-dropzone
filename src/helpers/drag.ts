import { DragEvent as ReactDragEvent } from "react";


export function blockFileDropOnWindow() {
    let body = document.querySelector("body");
    if (body) {
        body.addEventListener("dragover", blockEvent);
        body.addEventListener("drop", blockEvent);
    }
}

export function allowFileDropOnWindow() {
    let body = document.querySelector("body");
    if (body) {
        body.removeEventListener("dragover", blockEvent);
        body.removeEventListener("drop", blockEvent);
    }
}

export function blockEvent(e: DragEvent | ReactDragEvent) {
    e.preventDefault();
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "none";
        e.dataTransfer.dropEffect = "none";
    }
}

export function allowAndCaptureEvent(e: DragEvent | ReactDragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if(e.dataTransfer) {
        e.dataTransfer.effectAllowed = "all";
        e.dataTransfer.dropEffect = "all";
    }
}