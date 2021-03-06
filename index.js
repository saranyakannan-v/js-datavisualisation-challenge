// Chart - 1

// step 1 - random color function

function getRandomColor() {
    return "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16); // totally 16 value with # symbol- 0123456789ABCDEF
}

// step 2 - Get the data for "labels" into an array :

let years = document.querySelectorAll('#table1 tbody tr')[0]; // years = the first table row with all its child elements
console.log(years) // print the first row data's in the console - thoses are years (x-axis)

let labelsTableOne = [] // in this array insert the data we looking for

Array.from(years.children).forEach(function(year) { // create an array composed of all the children of 'years' ; grab each element and call it 'year'
    if (year.innerText.length > 0) { // if the length of the innerText of each 'year' is greater than 0 (in other words if the innerText is NOT empty) - This if condition is to avoid the empty cells in that row[0]
        labelsTableOne.push(parseInt(year.innerText)) // push into the array 'labelsTableOne' the parseInt of the innerText of 'year' 
    }
})
console.log("labelsTableone");
console.log(labelsTableOne) // prints the pushed year into the labelsTableOne

// step 3 -  Get the data for "datasets" into an array of objects

let datasetsTableOne = [] // Here we want to insert all the objects that will contain the properties(5) : data, label, borderColor, backgroundColor and fill.

dataset = Array.from(document.querySelectorAll('#table1 tbody tr')) // create an array composed of all <tr> including all it's children elements.

dataset.shift() // removes the 1st array element > first row <tr> 

console.log(dataset) // prints all the datas in the table

dataset.forEach(function(datas) { // grab each element of the array 'dataset' = each table row > and call it 'datas'
    let object = {} // there will be one object per row               

    let arrData = [] // there will be one array of data per row

    data = Array.from(datas.children) // create an array composed of all children <td> of 'datas' (one by one each row)
    data.shift() // we dont want the 1st one, remove it
    data.shift() // we dont want the 2nd one, remove it

    data.forEach(function(y) { // grab each element of the array 'data' = each <td> > and call it 'y'       >>   example of a given y = "<td>1012,8</td>"
        arrData.push(parseInt(y.innerText)) // push into the array 'arrData' the parseInt of the innerText of 'y'        >>   y.innerText = "1012,8" in form of a string , parseInt will transform the string into a number.
    })

    console.log(arrData)

    // step 4 - here we declare the values of the 5 properties that each of our objects must contain:
    object.data = arrData
    object.label = datas.children[1].innerText // label = innerText of the 2nd column of each row (except 1 and 2, we shifted those)
    object.borderColor = getRandomColor()
        //object.backgroundColor = getRandomColor()
        // object.fill = false

    datasetsTableOne.push(object)

})

console.log(datasetsTableOne)

// Example Chart to replace Data

// new Chart has 3 'properties' : 
// 1. type : chart types - here we used 'bar'
// 2. data : has 2 'properties' 
// 2a. labels : here we need to insert an array containing all the years (2002-2012)
// 2b. datasets : here we need to insert an array containing objects. 
// Each object must contain the following info per country: {data = [array, of, data], label:'name-of-the-country', borderColor: #color, backgroundColor: #color fill: false}
// 3. options

new Chart(document.getElementById("chart"), {
    type: 'line',
    data: {
        labels: labelsTableOne,
        datasets: datasetsTableOne
    },
    options: {
        title: {
            display: true,
            text: 'Records'
        }
    }
});

// Chart - 2

// step 1 - Our labels along the x-axis

var ppYears = ["2007-09", "2010-12"];
console.log(ppYears);

// step 2 -  Get the data for "datasets 2" into an array of objects

let datasetsTableTwo = []

dataset2 = Array.from(document.querySelectorAll('#table2 tbody tr'))
console.log("-----dataset2 all rows in the table------")
console.log(dataset2)


dataset2.forEach(function(datas2) { // grab each element of the array 'dataset2' = each table row > and call it 'datas2'
    let object2 = {} // there will be one object per row               

    let arrData2 = [] // there will be one array of data per row

    data2 = Array.from(datas2.children) // create an array composed of all children <td> of 'datas' (one by one each row)
    data2.shift() // remove 1st cell N°
    data2.shift() // remove 2nd cell Country

    data2.forEach(function(td) {
        arrData2.push(parseInt(td.innerText)) // pushing the <td> infos to the arrData2
    })
    console.log(arrData2)

    // step 3 - here we declare the values of the 5 properties that each of our objects must contain:
    object2.data = arrData2
    object2.label = datas2.children[1].innerText // label = innerText of the 2nd column of each row (except 1 and 2, we shifted those)
    object2.borderColor = getRandomColor()
    object2.backgroundColor = getRandomColor()
        //object2.fill = false

    datasetsTableTwo.push(object2)

})
console.log(datasetsTableTwo)

// Step 4

new Chart(document.getElementById("chart2"), {
    type: 'bar',
    data: {
        labels: ppYears,
        datasets: datasetsTableTwo
    },
    options: {
        title: {
            display: true,
            text: 'Prison population, average per year, 2007-09 and 2010-12'
        }
    }
});

// Chart -3 Realtime data
// Using AJAX fetch() method to make fast and dynamic webpage

setInterval(function() {

        fetch(`https://canvasjs.com/services/data/datapoints.php?xstart=${Math.round(Math.random()*10)}&ystart=${Math.round(Math.random()*10)}&length=10&type=json}`) //connect to the API, send a request to get data from remote server and sends a HTTP request, GET random values
            .then(response => { //  response here is the file that's coming back
                return response.json(); //Json is a file format. That converts the file into JSON so that Javascript understands the data.
            })
            .then((data) => { // the converted file is now send to this next function, where I want to create a dataset to insert inside my chart
                let arrayData3 = []; // I want to create an array of objects, with x and y coordinates
                let object3 = {};
                Array.from(data).forEach(element => { //data is an array of array with 2 nb in each, that I want to convert into an object with 2 keys( x and Y)
                    object3 = { x: element[0], y: element[1] };
                    arrayData3.push(object3);

                })
                console.log(arrayData3) //arrayOfData3 is now an array of objects with x and y coordinates

                new Chart(document.getElementById("chart3"), {
                    type: 'line',
                    data: {
                        datasets: [{
                            label: ' Datasets',
                            data: arrayData3
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'linear',
                                position: 'bottom'
                            }]
                        }
                    }
                });
            })
            .catch(error => {
                console.log(error)
            })
    }, 1000) // 1000 ms is 1 minute every 1000ms the values will change. Because we used setInterval function for time setting.