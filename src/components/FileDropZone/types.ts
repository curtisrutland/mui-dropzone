import { WithClassNames } from "./style";
import { CSSProperties } from "react";

interface FileDropZoneProps {
    message?: string;
    dragOverMessage?: string;
    elevation?: number;
    dragOverElevation?: number;
    className?: string;
    style?: CSSProperties;
    acceptedExtensions?: string[];
    acceptedMimeTypes?: string[];
    onFilesAdded?: (files: File[]) => void;
    onFilesRejected?: (files: File[]) => void;
    blockOtherDrops?: boolean;
}

interface FileDropZoneState {
    isDragOver: boolean;
};

export type Props = FileDropZoneProps & WithClassNames;
export type State = FileDropZoneState;