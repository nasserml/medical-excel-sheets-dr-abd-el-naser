const data = JSON.parse(localStorage.getItem('userProfile'));
const excelButton = document.getElementById('excelButton');
const csvContent =  `SL No,Patient ID,Patient Name,Date of Birth,Allergies,Weight (kg),Height (cm),ASA Classification,Date and Time of Assessment,Preoperative Diagnosis,Discharge Status,Postoperative Complications,Nausea/Vomiting,Respiratory Issues,Cardiovascular Issues,Others,Follow-up Instructions,Anesthesiologist Name,Signature,Date,Picture\n` + 
data.map((item, index) =>   `${index + 1},${item.patientIDVal},${item.fName} ${item.lName},${item.dobVal},${item.allergiesVal},${item.weightVal},${item.heightVal},${item.asaClassificationVal},${item.assessmentDateTimeVal},${item.preopDiagnosisVal},${item.dischargeStatusVal},${item.postopComplicationsVal},${item.nauseaVomitingVal},${item.respiratoryIssuesVal},${item.cardiovascularIssuesVal},${item.othersVal},${item.followUpInstructionsVal},${item.anesthesiologistNameVal},${item.signatureVal},${item.dateVal},${item.picture}\n`
).join('');


function exportToExcel() {
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