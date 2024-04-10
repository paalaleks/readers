import Image from "next/image";

interface LabelSheetProps {
  qrCodes: string[];
}

// Add qrCodes to the function parameters to use the prop
export default function LabelSheet({ qrCodes }: LabelSheetProps) {
  const codesPerPage = 44;
  const numberOfPages = Math.ceil(qrCodes.length / codesPerPage);

  const renderPage = (pageIndex: number) => {
    const rows = Array.from({ length: 11 }); // 11 rows per page
    const columns = Array.from({ length: 4 }); // 4 columns per page
    return (
      <div
        key={`page-${pageIndex}`}
        className=" px-[7mm] py-[9mm] w-[210mm] h-[297mm] flex flex-col justify-center items-center"
      >
        <table className="table-fixed border-collapse w-full">
          <tbody>
            {rows.map((_, rowIndex) => (
              <tr key={`row-${pageIndex}-${rowIndex}`}>
                {columns.map((_, columnIndex) => {
                  const qrCodeIndex =
                    pageIndex * codesPerPage +
                    rowIndex * columns.length +
                    columnIndex;
                  const qrCodeUrl = qrCodes[qrCodeIndex]; // Get the corresponding QR code URL
                  return (
                    <td
                      key={`cell-${pageIndex}-${rowIndex}-${columnIndex}`}
                      className="border border-gray-500 p-0 w-[48.5mm] h-[25.4mm] relative"
                    >
                      <div className="h-full w-full flex items-center justify-center text-center">
                        {qrCodeUrl ? (
                          <Image
                            width={100}
                            height={200}
                            src={qrCodeUrl}
                            alt={`QR Code ${qrCodeIndex + 1}`}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                          />
                        ) : (
                          `Label ${qrCodeIndex + 1}`
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {Array.from({ length: numberOfPages }).map((_, pageIndex) =>
        renderPage(pageIndex)
      )}
    </>
  );
}
