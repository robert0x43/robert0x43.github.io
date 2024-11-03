function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
      body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark"); // Save "dark" theme to localStorage
      document.getElementById("toggle-mode").checked = true; // Check the checkbox
  } else {
      body.classList.add("light-mode");
      localStorage.setItem("theme", "light"); // Save "light" theme to localStorage
      document.getElementById("toggle-mode").checked = false; // Uncheck the checkbox
  }
}

// Function to apply the saved theme on page load
window.onload = function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(savedTheme + "-mode");
      
      // Set the checkbox state based on the saved theme
      document.getElementById("toggle-mode").checked = (savedTheme === "dark");
  }
};
  
  function searchGoogle() {
    const query = document.querySelector('.search-bar').value;
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query + ' site:reddit.com')}`;
    }
  }
  
  // Trigger search when Enter key is pressed
  document.querySelector('.search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchGoogle();
    }
  });
  