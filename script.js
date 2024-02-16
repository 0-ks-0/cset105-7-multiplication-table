let numOfRows
let rowArr = []
let inputValue

/*
*   Sets the number of rows to be displayed for the multiplication table
*   12 rows if the inputted value is 12 or less
*   Otherwise, number of rows is equal to inputted value
*/
function setNumOfRows()
{
    if (inputValue < 12) numOfRows = 12 //have at least 12 rows
    else numOfRows = inputValue;
}

/*
*   Removes the table from the body if there is one
*/
function clearTable()
{
    let temp = document.querySelector("table")

    //remove table if there is one
    if (temp)
        temp.remove()
}

/*
*   Sets up the entire table and displays on the website
*/
function createTable()
{
    clearTable()

    // return if blank inputValue
    if(!inputValue && inputValue != 0) return

    const table = document.createElement("table")

    // create header elements
    const tableHeaderRow = document.createElement("tr")
    const headerMultiplicand = document.createElement('th')
    const headerMutliplier  = document.createElement('th')
    const product  = document.createElement('th')

    // set headers text
    headerMultiplicand.innerHTML = "Multiplicand"
    headerMutliplier.innerHTML = "Multiplier"
    product.innerHTML = "Product"

    // adding headers and headerRow to table
    tableHeaderRow.appendChild(headerMultiplicand)
    tableHeaderRow.appendChild(headerMutliplier)
    tableHeaderRow.appendChild(product)
    table.appendChild(tableHeaderRow)


    let tableRows = []

    for (let i = 0; i < numOfRows; i++)
    {
        // create tr and td
        let tr = document.createElement('tr')
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        // add values to td in the row
        td1.innerHTML = inputValue;
        td2.innerHTML = i+1
        td3.innerHTML = inputValue * (i+1);

        //add td to row
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        // store all the rows in an array
        tableRows.push(tr)
    }

    // add tr to table
    for (const row of tableRows)
        table.appendChild(row)

    // add table to body
    document.body.appendChild(table);
}

// --------------------------------------------------------------
window.onload = () =>
{
    const input = document.getElementById("input");

    input.onkeyup = (event) => {
        event.preventDefault()

        inputValue = parseFloat(input.value)

        // return if not Enter key
        // https://www.w3schools.com/jsref/event_key_key.asp
        if (event.key != "Enter") return

        //https://www.w3schools.com/jsref/event_key_keycode.asp
        if (event.keyCode != 13) return


        if (inputValue <= Number.MIN_SAFE_INTEGER || inputValue >= Number.MAX_SAFE_INTEGER) {
            input.value = null
            return
        }

        setNumOfRows()

        createTable()

        input.value = null
    }
}