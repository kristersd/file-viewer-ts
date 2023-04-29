import { useCallback, useState } from "react";
import { Files } from "./Files";
import { type File } from "./File";

const DEFAULT_FILES = [
  {
    name: "Default File",
    files: null,
  },
  {
    name: "Default File 2",
    files: [
      {
        name: "Nested Default File 2",
        files: [
          {
            name: "Nested Default File 3",
            files: null,
          },
        ],
      },
    ],
  },
] satisfies File[];

const addNewFile = (files: File[], pathName: string): File[] => {
  return files.map((file) => {
    if (file.name === pathName) {
      return {
        ...file,
        files: [
          ...(file.files ?? []),
          {
            name: `New File ${Date.now()}`,
            files: null,
          },
        ],
      };
    }
    if (file.files) {
      return {
        ...file,
        files: addNewFile(file.files, pathName),
      };
    }
    return file;
  });
};

const removeFile = (files: File[], pathName: string): File[] => {
  const hasItem = files.find(({name}) => name === pathName);
  if (hasItem) {
    return files.filter(({name}) => name !== pathName);
  }
  return files.map((file) => {
    if (file.files) {
      return {
        ...file,
        files: removeFile(file.files, pathName),
      };
    }
    return file;
  })
}

function FileViewer() {
  const [files, setFiles] = useState<File[]>(DEFAULT_FILES);

  const handleAddFile = useCallback((pathName: string) => {
    setFiles((files) => addNewFile(files, pathName));
  }, []);

  const handleRemoveFile = useCallback((pathName: string) => {
    setFiles((files) => removeFile(files, pathName));
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Simple recursive File viewer
      </h1>
      <div>
        <div className="text-right px-4">
          <button
            type="button"
            onClick={(e) => {
              setFiles((files) => files.concat({
                name: `Default file ${Date.now()}`,
                files: null,
              }))
              e.stopPropagation();
            }}
          >
            Add file
          </button>
        </div>
        <Files
          files={files}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
        />
      </div>
    </div>
  );
}

export default FileViewer;
