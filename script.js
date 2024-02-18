import { DOMBuilder } from "./JSModules/dom_builder.js"
import { Helper } from "./JSModules/helper.js"

const g_Helper = new Helper()
const g_Builder = new DOMBuilder()

var numOfRows
var inputValue
var currentRow

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
*   Clears the table body from the body if there is one
*/
function clearTable()
{
	g_Helper.destroyTimer("table_setup")

	const multiplicationBody = document.querySelector("#multiplication_body")

	if (multiplicationBody)
		multiplicationBody.innerHTML = ""
}

/*
*   Sets up the entire table and displays on the website
*/
function createTable()
{
	clearTable()

	// return if blank inputValue
	if (!inputValue && inputValue != 0) return
	if (!g_Helper.isNumber(inputValue)) return

	const multiplicationBody = document.querySelector("#multiplication_body")
	if (!multiplicationBody) return

	currentRow = 0

	g_Helper.createTimer("table_setup", 0.01, () =>
	{
		const startRow = currentRow
		const endRow = g_Helper.clamp(startRow + 128, null, numOfRows)

		g_Builder.start(multiplicationBody)
		{
			for (currentRow = startRow; currentRow < endRow; currentRow++)
			{
				g_Builder.startElement("tr")
				{
					// first column - the inputted value (multiplicand)
					g_Builder.startElement("td")
					{
						g_Builder.setProperty("innerHTML", inputValue)
					}
					g_Builder.endElement()

					//second column - the multiplier
					g_Builder.startElement("td")
					{
						g_Builder.setProperty("innerHTML", currentRow + 1)
					}
					g_Builder.endElement()

					//third column - the product
					g_Builder.startElement("td")
					{
						g_Builder.setProperty("innerHTML", inputValue * (currentRow + 1))
					}
					g_Builder.endElement()
				}
				g_Builder.endElement()
			}
		}
		g_Builder.end()

		currentRow++

		if (currentRow >= numOfRows)
			g_Helper.destroyTimer("table_setup")
	})
}

// --------------------------------------------------------------

g_Helper.hookEvent(window, "load", false, () =>
{
	// ------------ up arrow ------------
	const upArrow = document.querySelector("#up_arrow")

	if (!upArrow) return

	// setting up arrow for scrolling to top of page
	upArrow.onclick = () =>
	{
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}

	// ------------ input ------------
	const input = document.getElementById("input")

	if (!input) return

	g_Helper.hookEvent(input, "keyup", true, () =>
	{
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
	})
})
