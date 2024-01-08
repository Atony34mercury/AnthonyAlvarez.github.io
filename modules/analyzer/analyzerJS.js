// Function to handle the file upload event
function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Process the workbook data here
        // Example: Log the first sheet's name and data
        const firstSheetName = workbook.SheetNames[0];
        const firstSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { header: 1 });
        console.log('Sheet Name:', firstSheetName);
        console.log('Sheet Data:', firstSheetData);

        // Convert firstSheetData to JSON
        const jsonData = JSON.stringify(firstSheetData);
        console.log('JSON Data:', jsonData);

        // Example: Display the JSON data on the page
        const outputElement = document.getElementById('output');
        outputElement.textContent = jsonData;

        pyscript.interpreter.globals.get('process_excel')(jsonData)
    };

    reader.readAsArrayBuffer(file);
}

// Add event listener to the file input
const fileInput = document.getElementById('excel-file-input');
fileInput.addEventListener('change', handleFileUpload);


// Get
let url_get = "https://us-east-1.aws.data.mongodb-api.com/app/data-vplka/endpoint/data/v1/action/find"

let get_json = {
    "collection": "Conditions",
    "database": "Testing",
    "dataSource": "TestingDB",
    "filter": { }
}

const payload = JSON.stringify(get_json);

const headers = {
  'Content-Type': 'application/json',
  'mode': 'no-cors',
  //'Access-Control-Request-Headers': '*',
  'api-key': 'AFDSUypfm5wMdJ8Y8MdgEX3dSFCkFjqxVNisw1gAjQbsazxNCOKVT4fXXNB5R2UB',
};

fetch(url_get, {
  method: 'POST',
  headers: headers,
  body: payload,
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));
