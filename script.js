// Define the main function responsible for setting up event listeners and generating passwords
function main() {
  // Select the buttons from the HTML document
  const generate_btn = document.querySelector(".generate_btn");
  const copy_btn = document.querySelector(".copy_btn");

  // Define arrays for character sets
  const lowercase_arr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const uppercase_arr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const numbers_arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const symbols_arr = ["@", "#", "$", "%", "_", "-", "+", "!", "*"];

  // Function to generate a password based on specified options
  function generate_password(options) {
    const {
      password_length = 1,
      uppercase_st = true,
      lowercase_st = true,
      symbols_st = true,
      numbers_st = true,
    } = options;

    const characterSets = [];

    // Push selected character sets into the array based on options
    if (uppercase_st) characterSets.push(uppercase_arr);
    if (lowercase_st) characterSets.push(lowercase_arr);
    if (numbers_st) characterSets.push(numbers_arr);
    if (symbols_st) characterSets.push(symbols_arr);

    // Check if no character set is selected
    if (characterSets.length === 0) {
      alert("Select at least one checkbox");
      return;
    }

    let password = "";

    // Generate password using random characters from selected sets
    for (let i = 0; i < password_length; i++) {
      const randomSetIndex = Math.floor(Math.random() * characterSets.length);
      const randomSet = characterSets[randomSetIndex];
      const randomChar =
        randomSet[Math.floor(Math.random() * randomSet.length)];
      password += randomChar;
    }

    return password;
  }

  // Event listener for clicking the generate button
  generate_btn.addEventListener("click", () => {
    // Retrieve password length and checkbox states from the HTML
    let password_length = parseInt(
      document.getElementById("password_length").value
    );

    // Validate password length
    if (isNaN(password_length) || password_length > 20) {
      alert("Please select a valid password length.");
      window.location.reload();
    }

    let uppercase_st = document.getElementById("uppercase_st").checked;
    let lowercase_st = document.getElementById("lowercase_st").checked;
    let symbols_st = document.getElementById("symbols_st").checked;
    let numbers_st = document.getElementById("numbers_st").checked;

    // Generate password based on selected options
    let generated_password = generate_password({
      password_length,
      uppercase_st,
      lowercase_st,
      symbols_st,
      numbers_st,
    });

    console.log(generated_password);

    // Display the generated password in the password_text input field
    if (typeof generated_password !== "undefined") {
      password_text.value = generated_password;
    }
  });

  // Event listener for clicking the copy button
  copy_btn.addEventListener("click", () => {
    let copyText = password_text.value;
    // Copy the text to the clipboard using the Clipboard API
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        // Show tooltip message indicating the text has been copied
        myTooltip.innerHTML = "Copied: " + copyText;
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  });

  // Event listener for mouseout on the copy button (reset tooltip message)
  copy_btn.addEventListener("mouseout", () => {
    myTooltip.innerHTML = "Copy to clipboard";
  });
}

// Call the main function when the document is loaded
document.addEventListener("DOMContentLoaded", main);


