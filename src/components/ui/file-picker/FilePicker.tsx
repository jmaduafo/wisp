import React from "react";

type FileProps = {
  readonly children: React.ReactNode;
  readonly inputRef: React.RefObject<HTMLInputElement | null>;
  readonly setNewImages: React.Dispatch<React.SetStateAction<File[] | null>>;
  readonly className?: string;
};

function FilePicker({
  children,
  inputRef,
  setNewImages,
  className,
}: FileProps) {
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => inputRef.current?.click()}
      >
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files !== null) {
            setNewImages([...e.target.files]);
          }
        }}
      />
    </>
  );
}

export default FilePicker;
