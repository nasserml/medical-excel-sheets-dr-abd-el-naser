
const excelButton = document.getElementById('excelButton');


function exportToExcel() {
    const data = JSON.parse(localStorage.getItem('userProfile'));
    const csvContent =  `SL No,Patient ID,Patient Name,Date of Birth,Allergies,Weight (kg),Height (cm),ASA Classification,Date and Time of Assessment,Preoperative Diagnosis,Discharge Status,Postoperative Complications,Nausea/Vomiting,Respiratory Issues,Cardiovascular Issues,Others,Follow-up Instructions,Anesthesiologist Name,Signature,Date,Picture\n` + 
    data.map((item, index) =>   `${index + 1},${item.patientIDVal},${item.fName} ${item.lName},${item.dobVal},${item.allergiesVal},${item.weightVal},${item.heightVal},${item.asaClassificationVal},${item.assessmentDateTimeVal},${item.preopDiagnosisVal},${item.dischargeStatusVal},${item.postopComplicationsVal},${item.nauseaVomitingVal},${item.respiratoryIssuesVal},${item.cardiovascularIssuesVal},${item.othersVal},${item.followUpInstructionsVal},${item.anesthesiologistNameVal},${item.signatureVal},${item.dateVal},${item.picture}\n`
    ).join('');

    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
    })

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'patient_data.csv'; // Set the download file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



// function downloadRowAsPDF(index) {
//     const rowData = getData[index];
//     if (rowData) {
//       const pdfContent = `
//         <h2>Patient Information</h2>
//         <p><strong>Patient ID:</strong> ${rowData.patientIDVal}</p>
//         <p><strong>Patient Name:</strong> ${rowData.fName} ${rowData.lName}</p>
//         <p><strong>Date of Birth:</strong> ${rowData.dobVal}</p>
//         <p><strong>Allergies:</strong> ${rowData.allergiesVal}</p>
//         <p><strong>Weight (kg):</strong> ${rowData.weightVal}</p>
//         <p><strong>Height (cm):</strong> ${rowData.heightVal}</p>
//         <p><strong>ASA Classification:</strong> ${rowData.asaClassificationVal}</p>
//         <p><strong>Date and Time of Assessment:</strong> ${rowData.assessmentDateTimeVal}</p>
//         <p><strong>Preoperative Diagnosis:</strong> ${rowData.preopDiagnosisVal}</p>
//         <p><strong>Discharge Status:</strong> ${rowData.dischargeStatusVal}</p>
//         <p><strong>Postoperative Complications:</strong> ${rowData.postopComplicationsVal}</p>
//         <p><strong>Nausea/Vomiting:</strong> ${rowData.nauseaVomitingVal}</p>
//         <p><strong>Respiratory Issues:</strong> ${rowData.respiratoryIssuesVal}</p>
//         <p><strong>Cardiovascular Issues:</strong> ${rowData.cardiovascularIssuesVal}</p>
//         <p><strong>Others:</strong> ${rowData.othersVal}</p>
//         <p><strong>Follow-up Instructions:</strong> ${rowData.followUpInstructionsVal}</p>
//         <p><strong>Anesthesiologist Name:</strong> ${rowData.anesthesiologistNameVal}</p>
//         <p><strong>Signature:</strong> ${rowData.signatureVal}</p>
//         <p><strong>Date:</strong> ${rowData.dateVal}</p>
//       `;
  
//       const pdfWindow = window.open('', 'PatientInfoPDF'); 
//       pdfWindow.document.write(`
//         <html>
//           <head>
//             <title>Patient Information</title>
//             <style>
//               body {
//                 font-family: sans-serif;
//               }
//               h2 {
//                 text-align: center;
//               }
//               p {
//                 margin-bottom: 5px;
//               }
//             </style>
//           </head>
//           <body>
//             ${pdfContent}
//           </body>
//         </html>
//       `);
  
//       pdfWindow.document.close(); // Important to close the document
  
//       // Automatically trigger printing and download
//       pdfWindow.focus();
//       pdfWindow.print();
//       pdfWindow.document.execCommand('SaveAs', false, `patient_info_${rowData.patientIDVal}.pdf`); 
//     } else {
//       console.error('Invalid row index for PDF generation.');
//     }
//   }