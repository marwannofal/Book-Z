import React, { ReactNode } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        role="dialog"
        aria-labelledby="dialog-title"
        aria-modal="true"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
          {/* Header */}
          {title && (
            <div className="p-4 border-b">
              <h3 id="dialog-title" className="text-lg font-semibold">
                {title}
              </h3>
            </div>
          )}

          {/* Content */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          <div className="p-4 border-t text-right">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;

//call it like this

// const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const openDialog = () => setIsDialogOpen(true);
//   const closeDialog = () => setIsDialogOpen(false);

//<Dialog isOpen={isDialogOpen} onClose={closeDialog} title="My Dialog">
// <p>This is the content of the dialog.</p>
// </Dialog>
