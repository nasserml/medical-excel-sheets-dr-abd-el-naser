const data = JSON.parse(localStorage.getItem('userProfile'));

const csvContent =  `SL No,Full Name,Age,City,Position,Salary,Start Date,Email,Phone\n` + 
data.map((item, index) => `${index + 1},${item.fName} ${item.lName},${item.age},${item.ageVal},`)

data.map((item, index) => {
    console.log(item)
})

