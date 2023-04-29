import { memo } from "react";
import { File as FileComponent, type FileProps, type File } from "./File";

interface FilesProps extends Omit<FileProps, "name"> {
  files: File[];
}

export const Files = memo(function Files({
  files,
  onAddFile,
  onRemoveFile,
}: FilesProps) {
  return (
    <>
      {files.map((file, i) => (
        <FileComponent
          key={i}
          {...file}
          onAddFile={onAddFile}
          onRemoveFile={onRemoveFile}
        />
      ))}
    </>
  );
});
