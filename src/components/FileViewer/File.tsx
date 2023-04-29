import { memo, useState } from "react";
import { Files } from "./Files";

export interface File {
  name: string;
  files: File[] | null;
}

export interface FileProps extends File {
  onAddFile: (pathName: string) => void;
  onRemoveFile: (pathName: string) => void;
}

export const File = memo(function File({ name, files, onAddFile, onRemoveFile }: FileProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <div
        className="flex justify-between cursor-pointer select-none px-4"
        role="treeitem"
        onClick={(e) => {
          setExpanded((e) => !e);
          e.stopPropagation();
        }}
      >
        <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">{name}</div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={(e) => {
              onAddFile(name);
              e.stopPropagation();
            }}
          >
            Add file
          </button>
          <button
            type="button"
            onClick={(e) => {
              onRemoveFile(name);
              e.stopPropagation();
            }}
          >
            Remove file
          </button>
        </div>
      </div>
      {expanded && files && (
        <div className="pl-4">
          <Files
            files={files}
            onAddFile={onAddFile}
            onRemoveFile={onRemoveFile}
          />
        </div>
      )}
    </div>
  );
});
