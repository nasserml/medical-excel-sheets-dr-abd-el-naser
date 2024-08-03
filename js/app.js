


var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg =  document.querySelector('.dark_bg'),
    popupForm =document.querySelector('.popup'),
    closeBtn = document.querySelector('.closeBtn'),
    sunmitBtn = document.querySelector('.sunmitBtn'),
    modalTitle= document.querySelector('.modalTitle'),
    popupFooter= document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder = document.querySelector('.imgholder'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    uploadimg= document.querySelector('#uploadimg'),
    fName = document.getElementById('fName'),
    lName = document.getElementById('lName'),
    patientID = document.getElementById('patientID'),
    dob = document.getElementById('dob'),
    allergies = document.getElementById('allergies'),
    weight = document.getElementById('weight'),
    height = document.getElementById('height'),
    asaClassification = document.getElementById('asaClassification'),
    assessmentDateTime = document.getElementById('assessmentDateTime'),
    preopDiagnosis = document.getElementById('preopDiagnosis'),
    dischargeStatus = document.getElementById('dischargeStatus'),
    postopComplications = document.getElementById('postopComplications'),
    nauseaVomiting = document.getElementById('nauseaVomiting'),
    respiratoryIssues = document.getElementById('respiratoryIssues'),
    cardiovascularIssues = document.getElementById('cardiovascularIssues'),
    others = document.getElementById('others'),
    followUpInstructions = document.getElementById('followUpInstructions'),
    anesthesiologistName = document.getElementById('anesthesiologistName'),
    signature = document.getElementById('signature'),
    date = document.getElementById('date'),
    entries = document.querySelector('.showEntries'),
    
    tabSize = document.getElementById('table_size'),
    userInfo = document.querySelector('.userInfo'),
    table = document.querySelector('table'),
    filterData = document.getElementById('search')
    ;
   
    
let originalData = localStorage.getItem('userProfile') ? JSON.parse( localStorage.getItem('userProfile') ) : [];

let getData = [...originalData];

let isEdit = false , editId;

var arrayLength = 0;
var tableSize = 10;
var startIndex = 1;
var endIndex = 0;
var currentIndex = 1;
var maxIndex = 0;

showInfo();

newMemberAddBtn.addEventListener('click', () => {
    isEdit = false;
    sunmitBtn.innerHTML = 'Submit';
    modalTitle.innerHTML = 'Fill the Form';
    popupFooter.style.display = 'block';
    imgInput.src = './images/pic1.png';

    darkBg.classList.add('active');
    popupForm.classList.add('active');
})

closeBtn.addEventListener('click', () => {
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    // form.reset();
})

uploadimg.onchange = function (){
    if(uploadimg.files[0].size < 1000000) { // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload= function(e) {
            var imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }

        fileReader.readAsDataURL(uploadimg.files[0]);

    } else {
        alert('Htis File is too large!')
    }
}


function preLoadCalculations() {
    array = getData ;
    arrayLength = array.length;
    maxIndex = arrayLength / tableSize;

    if((arrayLength % tableSize) > 0 ) {
        maxIndex++;
    }

}

function displayIndexBtn() {

    preLoadCalculations();

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''
    pagination.innerHTML = ' <button onclick="prev()" class="prev">Previous</button>';

    for(let i = 1 ; i<=maxIndex ; i++  ) {
        pagination.innerHTML += '<button onclick=paginationBtn('+i+') index="'+i+'">'+i+'</button>'
    }


    pagination.innerHTML += ' <button onclick="next()" class="next">Next</button>';
    highlightIndexBtn();
}


function highlightIndexBtn() {
    startIndex = ((currentIndex -1) * tableSize) +1 ;
    endIndex = (startIndex + tableSize) -1;
    if(endIndex >  arrayLength) {
        endIndex = arrayLength;
    }

    if(maxIndex >= 2) {
        var nextBtn = document.querySelector('.next');
        nextBtn.classList.add('act');
    }

    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} enteries`;

    var paginationBtns = document.querySelectorAll('.pagination button ');
    paginationBtns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('index') === currentIndex.toString()) {
            btn.classList.add('active');
        }
    })

    showInfo();
}

function showInfo() {

    document.querySelectorAll('.employeeDetails').forEach(info => {
        info.remove();
    });

    var table_start = startIndex - 1;
    var table_end = endIndex;

    if(getData.length > 0 ) {

        for(var i=table_start; i < table_end; i++){
            var staff = getData[i];

            if(staff) {
                let createElement = `<tr class="employeeDetails">
                <td>${i+1}</td>
                <td><img src="${staff.picture}" width="40" height="40" alt=""></td>
                <td>${staff.patientIDVal}</td>
                <td>${staff.fName + " " + staff.lName}</td>
                <td>${staff.dobVal}</td>
                <td>${staff.allergiesVal}</td>
                <td>${staff.weightVal}</td>
                <td>${staff.heightVal}</td>
                <td>${staff.asaClassificationVal}</td>
                <td>${staff.assessmentDateTimeVal}</td>
                <td>${staff.preopDiagnosisVal}</td>
                <td>${staff.dischargeStatusVal}</td>
                <td>${staff.postopComplicationsVal}</td>
                <td>${staff.nauseaVomitingVal}</td>
                <td>${staff.respiratoryIssuesVal}</td>
                <td>${staff.cardiovascularIssuesVal}</td>
                <td>${staff.othersVal}</td>
                <td>${staff.followUpInstructionsVal}</td>
                <td>${staff.anesthesiologistNameVal}</td>
                <td>${staff.signatureVal}</td>
                <td>${staff.dateVal}</td>
                <td>
                    <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.patientIDVal}', '${staff.dobVal}', '${staff.allergiesVal}', '${staff.weightVal}', '${staff.heightVal}', '${staff.asaClassificationVal}', '${staff.assessmentDateTimeVal}', '${staff.preopDiagnosisVal}', '${staff.dischargeStatusVal}', '${staff.postopComplicationsVal}', '${staff.nauseaVomitingVal}', '${staff.respiratoryIssuesVal}', '${staff.cardiovascularIssuesVal}', '${staff.othersVal}', '${staff.followUpInstructionsVal}', '${staff.anesthesiologistNameVal}', '${staff.signatureVal}', '${staff.dateVal}')"><i class="fa-regular fa-eye"></i></button>

                    <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.patientIDVal}', '${staff.dobVal}', '${staff.allergiesVal}', '${staff.weightVal}', '${staff.heightVal}', '${staff.asaClassificationVal}', '${staff.assessmentDateTimeVal}', '${staff.preopDiagnosisVal}', '${staff.dischargeStatusVal}', '${staff.postopComplicationsVal}', '${staff.nauseaVomitingVal}', '${staff.respiratoryIssuesVal}', '${staff.cardiovascularIssuesVal}', '${staff.othersVal}', '${staff.followUpInstructionsVal}', '${staff.anesthesiologistNameVal}', '${staff.signatureVal}', '${staff.dateVal}')"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    <button onclick="downloadRowAsPDF(${i})">
                        <i class="fa-regular fa-circle-down"></i>
                    </button>
                    
                </td>
            </tr>`;

            userInfo.innerHTML +=  createElement;
            
            }
        }

    } else {
        userInfo.innerHTML = `<tr class = "employeeDetails">
        <td class="empty" colspan="23" align="center">No data available in table</td>
    </tr>`;
    table.style.minWidth = '1400px';

    }
}

showInfo();

function readInfo(pic , fname, lname, patientID, dob, allergies, weight, height, asaClassification, assessmentDateTime, preopDiagnosis, dischargeStatus, postopComplications, nauseaVomiting, respiratoryIssues, cardiovascularIssues, others, followUpInstructions, anesthesiologistName, signature, date) {
    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    patientID.value = patientID;
    dob.value = dob;
    allergies.value = allergies;
    weight.value = weight;
    height.value = height;
    asaClassification.value = asaClassification;
    assessmentDateTime.value = assessmentDateTime;
    preopDiagnosis.value = preopDiagnosis;
    dischargeStatus.value = dischargeStatus;
    postopComplications.value = postopComplications;
    nauseaVomiting.value = nauseaVomiting;
    respiratoryIssues.value = respiratoryIssues;
    cardiovascularIssues.value = cardiovascularIssues;
    others.value = others;
    followUpInstructions.value = followUpInstructions;
    anesthesiologistName.value = anesthesiologistName;
    signature.value = signature;
    date.value = date;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = 'none';
    modalTitle.innerHTML = 'Profile';
    formInputFields.forEach(inoput => {
        inoput.disabled = true;
    });


    imgHolder.style.pointerEvents = 'none'

}


function editInfo(id,pic , fname, lname, patientID, dob, allergies, weight, height, asaClassification, assessmentDateTime, preopDiagnosis, dischargeStatus, postopComplications, nauseaVomiting, respiratoryIssues, cardiovascularIssues, others, followUpInstructions, anesthesiologistName, signature, date) {
    isEdit = true;
    editId = id;
    console.log(originalData);
    // find the index of the item to edit in the original data based on id
    const originalndex = originalData.findIndex(item => item.id === id);

    // update the original data
    originalData[originalndex] = {
        id: id,
        picture:pic,
        fName: fname,
        lName: lname,
        patientIDVal: patientID,
        dobVal: dob,
        allergiesVal: allergies,
        weightVal: weight,
        heightVal: height,
        asaClassificationVal: asaClassification,
        assessmentDateTimeVal: assessmentDateTime,
        preopDiagnosisVal: preopDiagnosis,
        dischargeStatusVal: dischargeStatus,
        postopComplicationsVal: postopComplications,
        nauseaVomitingVal: nauseaVomiting,
        respiratoryIssuesVal: respiratoryIssues,
        cardiovascularIssuesVal: cardiovascularIssues,
        othersVal: others,
        followUpInstructionsVal: followUpInstructions,
        anesthesiologistNameVal: anesthesiologistName,
        signatureVal: signature,
        dateVal: date
    };

    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    patientID.value = patientID;
    dob.value = dob;
    allergies.value = allergies;
    weight.value = weight;
    height.value = height;
    asaClassification.value = asaClassification;
    assessmentDateTime.value = assessmentDateTime;
    preopDiagnosis.value = preopDiagnosis;
    dischargeStatus.value = dischargeStatus;
    postopComplications.value = postopComplications;
    nauseaVomiting.value = nauseaVomiting;
    respiratoryIssues.value = respiratoryIssues;
    cardiovascularIssues.value = cardiovascularIssues;
    others.value = others;
    followUpInstructions.value = followUpInstructions;
    anesthesiologistName.value = anesthesiologistName;
    signature.value = signature;
    date.value = date;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = 'block';
    modalTitle.innerHTML = 'Update the Form';
    sunmitBtn.innerHTML = 'Update'
    formInputFields.forEach(inoput => {
        inoput.disabled = false;
    });


    imgHolder.style.pointerEvents = 'auto'

}

function deleteInfo(index) {
    if(confirm('Are you sure you want to delete?')) {
        originalData.splice(index, 1);
        localStorage.setItem('userProfile', JSON.stringify(originalData));

        getData  = [...originalData];
        preLoadCalculations();

        if(getData.length === 0) {
            currentIndex = 1;
            startIndex = 1;
            endIndex = 0;
        } else if(currentIndex > maxIndex ) {
            currentIndex = maxIndex
        }

        showInfo();
        highlightIndexBtn();
        displayIndexBtn();

        var nextBtn = document.querySelector('.next');
        var prevBtn = document.querySelector('.prev');

        if(Math.floor(maxIndex) > currentIndex ) {
            nextBtn.classList.add('act');
        } else {
            nextBtn.classList.remove('act');
        }

        if(currentIndex > 1  ) {
            prevBtn.classList.add('act');
        }
    }
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const information = {
        id: Date.now(),
        picture:imgInput.src == undefined ? "./images/pic1.png" : imgInput.src,
        fName: fName.value,
        lName: lName.value,
        patientIDVal: patientID.value,
        dobVal: dob.value,
        allergiesVal: allergies.value,
        weightVal: weight.value,
        heightVal: height.value,
        asaClassificationVal: asaClassification.value,
        assessmentDateTimeVal: assessmentDateTime.value,
        preopDiagnosisVal: preopDiagnosis.value,
        dischargeStatusVal: dischargeStatus.value,
        postopComplicationsVal: postopComplications.value,
        nauseaVomitingVal: nauseaVomiting.value,
        respiratoryIssuesVal: respiratoryIssues.value,
        cardiovascularIssuesVal: cardiovascularIssues.value,
        othersVal: others.value,
        followUpInstructionsVal: followUpInstructions.value,
        anesthesiologistNameVal: anesthesiologistName.value,
        signatureVal: signature.value,
        dateVal: date.value
    }
    if(!isEdit) {
        originalData.unshift(information);
    } else {
        originalData[editId] = information
    }
    getData = [...originalData];
    localStorage.setItem('userProfile', JSON.stringify(originalData));

    sunmitBtn.innerHTML = 'Submit';
    modalTitle.innerHTML = 'Fill the Form'; 

    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    // form.reset();

    highlightIndexBtn();
    displayIndexBtn();
    showInfo();

    var nextBtn =  document.querySelector('.next');
    var prevBtn =  document.querySelector('.prev');
    if(Math.floor(maxIndex) > currentIndex) {
        nextBtn.classList.add('act');

    } else {
        nextBtn.classList.remove('act')
    }

    if(currentIndex > 1 ){
        prevBtn.classList.add('act');

    }




})



function next() {
    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');

    if(currentIndex <= maxIndex - 1 ) {
        currentIndex++;
        prevBtn.classList.add('act');
        highlightIndexBtn();
    }

    if(currentIndex > maxIndex - 1) {
        nextBtn.classList.remove('act');
    }

}

function prev() {
    var prevBtn = document.querySelector('.prev');

    if(currentIndex > 1) {
        currentIndex--;
        prevBtn.classList.add('act');
        highlightIndexBtn();
    }

    if(currentIndex < 2) {
        prevBtn.classList.remove('act');
    }
}

function paginationBtn(i) {
    currentIndex = i;

    var prevBtn = document.querySelector('.prev');
    var nextBtn = document.querySelector('.next');

    highlightIndexBtn();

    if(currentIndex > maxIndex - 1) {
        nextBtn.classList.remove('act');
    }
    else{
        nextBtn.classList.add('act');
    }

    if(currentIndex > 1) {
        prevBtn.classList.add('act');
    }

    if(currentIndex < 2) {
        prevBtn.classList.remove('act');
    }
}



tabSize.addEventListener('change', () => {
    var selectedValue = parseInt(tabSize.value);
    tableSize = selectedValue;
    currentIndex = 1 ;
    startIndex = 1;
    displayIndexBtn();
})



filterData.addEventListener('input', () =>{
    const searchTerm = filterData.value.toLowerCase().trim();

    if(searchTerm !== "") {
        const filterData = originalData.filter((item) => {
            const fullName = (item.fName + ' ' + item.lName).toLowerCase();
            const patientID = item.patientIDVal.toLowerCase();
            const preopDiagnosis = item.preopDiagnosisVal.toLowerCase();

            return (
                fullName.includes(searchTerm) || patientID.includes(searchTerm) || preopDiagnosis.includes(searchTerm)
            )
        });

        // update the cuurent data with the filter data
        getData = filterData;
    } else {
        getData = JSON.parse(localStorage.getItem('userProfile')) || [];
    }

    currentIndex = 1;
    startIndex = 1;
    displayIndexBtn();

} );


function importFromExcel() {
    const importButton = document.getElementById('importButton');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv, .xlsx, .xls'; // Accept common Excel file types
  
    // Handle file selection
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const csvData = e.target.result;
        const parsedData = parseCSV(csvData);
  
        // Process parsed data
        importData(parsedData);
      };
  
      reader.readAsText(file);
    });
  
    // Trigger file input
    fileInput.click();
  }
  
  // Parse CSV data (you might need a library for XLSX)
  function parseCSV(csvData) {
    // Assuming simple CSV format (comma-separated values)
    const rows = csvData.split('\n');
    const parsedData = [];
  
   
    rows.forEach((row, index) => {
      if (index > 0) { // Skip the header row
        const values = row.split(',');
        console.log(index)
        const staff = {
          id: Date.now(), // Assign a unique ID
          picture: values[20] + (values[21]?',' +values[21]:''), // Placeholder image
          patientIDVal: values[1]?.trim(),
          fName: values[2]?.trim().split(' ')[0], // Extract first name
          lName: values[2]?.trim().split(' ')[1], // Extract last name
          dobVal: values[3]?.trim(),
          allergiesVal: values[4]?.trim(),
          weightVal: parseFloat(values[5]?.trim()),
          heightVal: parseFloat(values[6]?.trim()),
          asaClassificationVal: values[7]?.trim(),
          assessmentDateTimeVal: values[8]?.trim(),
          preopDiagnosisVal: values[9]?.trim(),
          dischargeStatusVal: values[10]?.trim(),
          postopComplicationsVal: values[11]?.trim(),
          nauseaVomitingVal: values[12]?.trim(),
          respiratoryIssuesVal: values[13]?.trim(),
          cardiovascularIssuesVal: values[14]?.trim(),
          othersVal: values[15]?.trim(),
          followUpInstructionsVal: values[16]?.trim(),
          anesthesiologistNameVal: values[17]?.trim(),
          signatureVal: values[18]?.trim(),
          dateVal: values[19]?.trim()
        };
        parsedData.push(staff);
      }
    });
  
    return parsedData;
  }
  
  // Import parsed data into the application
  function importData(parsedData) {
    // 1. Update the originalData array
    originalData.push(...parsedData);
    originalData.pop();
    // 2. Update localStorage
    localStorage.setItem('userProfile', JSON.stringify(originalData));
    // 3. Update the getData array
    getData = [...originalData];
    // 4. Refresh the table display
    currentIndex = 1;
    startIndex = 1;
    displayIndexBtn();
    showInfo();
  }


displayIndexBtn();





function downloadRowAsPDF(index) {
    const rowData = getData[index];
    if (rowData) {
      const pdfContent = `
        <h2>Patient Information</h2>
        <p><strong>Patient ID:</strong> ${rowData.patientIDVal}</p>
        <p><strong>Patient Name:</strong> ${rowData.fName} ${rowData.lName}</p>
        <p><strong>Date of Birth:</strong> ${rowData.dobVal}</p>
        <p><strong>Allergies:</strong> ${rowData.allergiesVal}</p>
        <p><strong>Weight (kg):</strong> ${rowData.weightVal}</p>
        <p><strong>Height (cm):</strong> ${rowData.heightVal}</p>
        <p><strong>ASA Classification:</strong> ${rowData.asaClassificationVal}</p>
        <p><strong>Date and Time of Assessment:</strong> ${rowData.assessmentDateTimeVal}</p>
        <p><strong>Preoperative Diagnosis:</strong> ${rowData.preopDiagnosisVal}</p>
        <p><strong>Discharge Status:</strong> ${rowData.dischargeStatusVal}</p>
        <p><strong>Postoperative Complications:</strong> ${rowData.postopComplicationsVal}</p>
        <p><strong>Nausea/Vomiting:</strong> ${rowData.nauseaVomitingVal}</p>
        <p><strong>Respiratory Issues:</strong> ${rowData.respiratoryIssuesVal}</p>
        <p><strong>Cardiovascular Issues:</strong> ${rowData.cardiovascularIssuesVal}</p>
        <p><strong>Others:</strong> ${rowData.othersVal}</p>
        <p><strong>Follow-up Instructions:</strong> ${rowData.followUpInstructionsVal}</p>
        <p><strong>Anesthesiologist Name:</strong> ${rowData.anesthesiologistNameVal}</p>
        <p><strong>Signature:</strong> ${rowData.signatureVal}</p>
        <p><strong>Date:</strong> ${rowData.dateVal}</p>
      `;
  
      const pdfWindow = window.open('', 'PatientInfoPDF'); 
      pdfWindow.document.write(`
        <html>
          <head>
            <title>Patient Information</title>
            <style>
              body {
                font-family: sans-serif;
              }
              h2 {
                text-align: center;
              }
              p {
                margin-bottom: 5px;
              }
            </style>
          </head>
          <body>
            ${pdfContent}
          </body>
        </html>
      `);
  
      pdfWindow.document.close(); // Important to close the document
  
      // Automatically trigger printing and download
      pdfWindow.focus();
      pdfWindow.print();
      pdfWindow.document.execCommand('SaveAs', false, `patient_info_${rowData.patientIDVal}.pdf`); 
    } else {
      console.error('Invalid row index for PDF generation.');
    }
  }





// old

// var newMemberAddBtn = document.querySelector('.addMemberBtn'),
//     darkBg =  document.querySelector('.dark_bg'),
//     popupForm =document.querySelector('.popup'),
//     closeBtn = document.querySelector('.closeBtn'),
//     sunmitBtn = document.querySelector('.sunmitBtn'),
//     modalTitle= document.querySelector('.modalTitle'),
//     popupFooter= document.querySelector('.popupFooter'),
//     imgInput = document.querySelector('.img'),
//     imgHolder = document.querySelector('.imgholder'),
//     form = document.querySelector('form'),
//     formInputFields = document.querySelectorAll('form input')
//     uploadimg= document.querySelector('#uploadimg'),
//     fName = document.getElementById('fName'),
//     lName = document.getElementById('lName'),
//     age = document.getElementById('age'),
//     city = document.getElementById('city'),
//     position = document.getElementById('position'),
//     salary = document.getElementById('salary'),
//     sDate = document.getElementById('sDate'),
//     email = document.getElementById('email'),
//     phone = document.getElementById('phone'),
//     entries = document.querySelector('.showEntries'),
    
//     tabSize = document.getElementById('table_size'),
//     userInfo = document.querySelector('.userInfo'),
//     table = document.querySelector('table'),
//     filterData = document.getElementById('search')
//     ;
   
    
// let originalData = localStorage.getItem('userProfile') ? JSON.parse( localStorage.getItem('userProfile') ) : [];

// let getData = [...originalData];

// let isEdit = false , editId;

// var arrayLength = 0;
// var tableSize = 10;
// var startIndex = 1;
// var endIndex = 0;
// var currentIndex = 1;
// var maxIndex = 0;

// showInfo();

// newMemberAddBtn.addEventListener('click', () => {
//     isEdit = false;
//     sunmitBtn.innerHTML = 'Submit';
//     modalTitle.innerHTML = 'Fill the Form';
//     popupFooter.style.display = 'block';
//     imgInput.src = './images/pic1.png';

//     darkBg.classList.add('active');
//     popupForm.classList.add('active');
// })

// closeBtn.addEventListener('click', () => {
//     darkBg.classList.remove('active');
//     popupForm.classList.remove('active');
//     // form.reset();
// })

// uploadimg.onchange = function (){
//     if(uploadimg.files[0].size < 1000000) { // 1MB = 1000000
//         var fileReader = new FileReader();

//         fileReader.onload= function(e) {
//             var imgUrl = e.target.result;
//             imgInput.src = imgUrl;
//         }

//         fileReader.readAsDataURL(uploadimg.files[0]);

//     } else {
//         alert('Htis File is too large!')
//     }
// }


// function preLoadCalculations() {
//     array = getData ;
//     arrayLength = array.length;
//     maxIndex = arrayLength / tableSize;

//     if((arrayLength % tableSize) > 0 ) {
//         maxIndex++;
//     }

// }

// function displayIndexBtn() {

//     preLoadCalculations();

//     const pagination = document.querySelector('.pagination');
//     pagination.innerHTML = ''
//     pagination.innerHTML = ' <button onclick="prev()" class="prev">Previous</button>';

//     for(let i = 1 ; i<=maxIndex ; i++  ) {
//         pagination.innerHTML += '<button onclick=paginationBtn('+i+') index="'+i+'">'+i+'</button>'
//     }


//     pagination.innerHTML += ' <button onclick="next()" class="next">Next</button>';
//     highlightIndexBtn();
// }


// function highlightIndexBtn() {
//     startIndex = ((currentIndex -1) * tableSize) +1 ;
//     endIndex = (startIndex + tableSize) -1;
//     if(endIndex >  arrayLength) {
//         endIndex = arrayLength;
//     }

//     if(maxIndex >= 2) {
//         var nextBtn = document.querySelector('.next');
//         nextBtn.classList.add('act');
//     }

//     entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} enteries`;

//     var paginationBtns = document.querySelectorAll('.pagination button ');
//     paginationBtns.forEach(btn => {
//         btn.classList.remove('active');
//         if(btn.getAttribute('index') === currentIndex.toString()) {
//             btn.classList.add('active');
//         }
//     })

//     showInfo();
// }

// function showInfo() {

//     document.querySelectorAll('.employeeDetails').forEach(info => {
//         info.remove();
//     });

//     var table_start = startIndex - 1;
//     var table_end = endIndex;

//     if(getData.length > 0 ) {

//         for(var i=table_start; i < table_end; i++){
//             var staff = getData[i];

//             if(staff) {
//                 let createElement = `<tr class="employeeDetails">
//                 <td>${i+1}</td>
//                 <td><img src="${staff.picture}" width="40" height="40" alt=""></td>
//                 <td>${staff.fName + " " + staff.lName}</td>
//                 <td>${staff.ageVal}</td>
//                 <td>${staff.cityVal}</td>
//                 <td>${staff.positionVal}</td>
//                 <td>${staff.salaryVal}</td>
//                 <td>${staff.sDateVal}</td>
//                 <td>${staff.emailVal}</td>
//                 <td>${staff.phoneVal}</td>
//                 <td>
//                     <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}' )"><i class="fa-regular fa-eye"></i></button>

//                     <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}' )"><i class="fa-regular fa-pen-to-square"></i></button>
//                     <button onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
//                 </td>
//             </tr>`;

//             userInfo.innerHTML +=  createElement;
            
//             }
//         }

//     } else {
//         userInfo.innerHTML = `<tr class = "employeeDetails">
//         <td class="empty" colspan="11" align="center">No data available in table</td>
//     </tr>`;
//     table.style.minWidth = '1400px';

//     }
// }

// showInfo();

// function readInfo(pic , fname, lname, Age, City, Position, Salary ,SDate, Email, Phone) {
//     imgInput.src = pic;
//     fName.value = fname;
//     lName.value = lname;
//     age.value = Age;
//     city.value = City;
//     position.value = Position;
//     salary.value = Salary;
//     sDate.value = SDate;
//     email.value = Email;
//     phone.value = Phone;

//     darkBg.classList.add('active');
//     popupForm.classList.add('active');
//     popupFooter.style.display = 'none';
//     modalTitle.innerHTML = 'Profile';
//     formInputFields.forEach(inoput => {
//         inoput.disabled = true;
//     });


//     imgHolder.style.pointerEvents = 'none'

// }


// function editInfo(id,pic , fname, lname, Age, City, Position, Salary ,SDate, Email, Phone) {
//     isEdit = true;
//     editId = id;
//     console.log(originalData);
//     // find the index of the item to edit in the original data based on id
//     const originalndex = originalData.findIndex(item => item.id === id);

//     // update the original data
//     originalData[originalndex] = {
//         id: id,
//         picture:pic,
//         fName: fname,
//         lName: lname,
//         ageVal: Age,
//         cityVal: City,
//         positionVal: Position,
//         salaryVal: Salary,
//         sDateVal: SDate,
//         emailVal: Email,
//         phoneVal: Phone
//     };

//     imgInput.src = pic;
//     fName.value = fname;
//     lName.value = lname;
//     age.value = Age;
//     city.value = City;
//     position.value = Position;
//     salary.value = Salary;
//     sDate.value = SDate;
//     email.value = Email;
//     phone.value = Phone;

//     darkBg.classList.add('active');
//     popupForm.classList.add('active');
//     popupFooter.style.display = 'block';
//     modalTitle.innerHTML = 'Update the Form';
//     sunmitBtn.innerHTML = 'Update'
//     formInputFields.forEach(inoput => {
//         inoput.disabled = false;
//     });


//     imgHolder.style.pointerEvents = 'auto'

// }

// function deleteInfo(index) {
//     if(confirm('Are you sure you want to delete?')) {
//         originalData.splice(index, 1);
//         localStorage.setItem('userProfile', JSON.stringify(originalData));

//         getData  = [...originalData];
//         preLoadCalculations();

//         if(getData.length === 0) {
//             currentIndex = 1;
//             startIndex = 1;
//             endIndex = 0;
//         } else if(currentIndex > maxIndex ) {
//             currentIndex = maxIndex
//         }

//         showInfo();
//         highlightIndexBtn();
//         displayIndexBtn();

//         var nextBtn = document.querySelector('.next');
//         var prevBtn = document.querySelector('.prev');

//         if(Math.floor(maxIndex) > currentIndex ) {
//             nextBtn.classList.add('act');
//         } else {
//             nextBtn.classList.remove('act');
//         }

//         if(currentIndex > 1  ) {
//             prevBtn.classList.add('act');
//         }
//     }
// }

// form.addEventListener('submit', (e)=> {
//     e.preventDefault();

//     const information = {
//         id: Date.now(),
//         picture:imgInput.src == undefined ? "./images/pic1.png" : imgInput.src,
//         fName: fName.value,
//         lName: lName.value,
//         ageVal: age.value,
//         cityVal: city.value,
//         positionVal: position.value,
//         salaryVal: salary.value,
//         sDateVal: sDate.value,
//         emailVal: email.value,
//         phoneVal: phone.value
//     }
//     if(!isEdit) {
//         originalData.unshift(information);
//     } else {
//         originalData[editId] = information
//     }
//     getData = [...originalData];
//     localStorage.setItem('userProfile', JSON.stringify(originalData));

//     sunmitBtn.innerHTML = 'Submit';
//     modalTitle.innerHTML = 'Fill the Form'; 

//     darkBg.classList.remove('active');
//     popupForm.classList.remove('active');
//     // form.reset();

//     highlightIndexBtn();
//     displayIndexBtn();
//     showInfo();

//     var nextBtn =  document.querySelector('.next');
//     var prevBtn =  document.querySelector('.prev');
//     if(Math.floor(maxIndex) > currentIndex) {
//         nextBtn.classList.add('act');

//     } else {
//         nextBtn.classList.remove('act')
//     }

//     if(currentIndex > 1 ){
//         prevBtn.classList.add('act');

//     }




// })



// function next() {
//     var prevBtn = document.querySelector('.prev');
//     var nextBtn = document.querySelector('.next');

//     if(currentIndex <= maxIndex - 1 ) {
//         currentIndex++;
//         prevBtn.classList.add('act');
//         highlightIndexBtn();
//     }

//     if(currentIndex > maxIndex - 1) {
//         nextBtn.classList.remove('act');
//     }

// }

// function prev() {
//     var prevBtn = document.querySelector('.prev');

//     if(currentIndex > 1) {
//         currentIndex--;
//         prevBtn.classList.add('act');
//         highlightIndexBtn();
//     }

//     if(currentIndex < 2) {
//         prevBtn.classList.remove('act');
//     }
// }

// function paginationBtn(i) {
//     currentIndex = i;

//     var prevBtn = document.querySelector('.prev');
//     var nextBtn = document.querySelector('.next');

//     highlightIndexBtn();

//     if(currentIndex > maxIndex - 1) {
//         nextBtn.classList.remove('act');
//     }
//     else{
//         nextBtn.classList.add('act');
//     }

//     if(currentIndex > 1) {
//         prevBtn.classList.add('act');
//     }

//     if(currentIndex < 2) {
//         prevBtn.classList.remove('act');
//     }
// }



// tabSize.addEventListener('change', () => {
//     var selectedValue = parseInt(tabSize.value);
//     tableSize = selectedValue;
//     currentIndex = 1 ;
//     startIndex = 1;
//     displayIndexBtn();
// })



// filterData.addEventListener('input', () =>{
//     const searchTerm = filterData.value.toLowerCase().trim();

//     if(searchTerm !== "") {
//         const filterData = originalData.filter((item) => {
//             const fullName = (item.fName + ' ' + item.lName).toLowerCase();
//             const city = item.cityVal.toLowerCase();
//             const position = item.positionVal.toLowerCase();

//             return (
//                 fullName.includes(searchTerm) || city.includes(searchTerm) || position.includes(searchTerm)
//             )
//         });

//         // update the cuurent data with the filter data
//         getData = filterData;
//     } else {
//         getData = JSON.parse(localStorage.getItem('userProfile')) || [];
//     }

//     currentIndex = 1;
//     startIndex = 1;
//     displayIndexBtn();

// } );



// displayIndexBtn();





