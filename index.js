document.addEventListener("DOMContentLoaded", () => {
    const cities = [
        "Mumbai", 
        "Delhi", 
        "Bangalore", 
        "Hyderabad", 
        "Ahmedabad", 
        "Chennai", 
        "Kolkata", 
        "Surat", 
        "Pune", 
        "Jaipur",
        "Lucknow", 
        "Kanpur", 
        "Nagpur", 
        "Indore", 
        "Thane", 
        "Bhopal", 
        "Visakhapatnam", 
        "Pimpri-Chinchwad", 
        "Patna", 
        "Vadodara",
        "Ghaziabad", 
        "Ludhiana", 
        "Agra", 
        "Nashik", 
        "Faridabad", 
        "Meerut", 
        "Rajkot", 
        "Kalyan-Dombivli", 
        "Vasai-Virar", 
        "Varanasi",
        "Srinagar", 
        "Aurangabad", 
        "Dhanbad", 
        "Amritsar", 
        "Navi Mumbai", 
        "Allahabad", 
        "Ranchi", 
        "Howrah", 
        "Jabalpur", 
        "Gwalior",
        "Coimbatore", 
        "Vijayawada", 
        "Jodhpur", 
        "Madurai", 
        "Raipur", 
        "Kota", 
        "Chandigarh", 
        "Guwahati", 
        "Hubli-Dharwad", 
        "Mysore",
        "Bangalore South", 
        "Bangalore North", 
        "Hyderabad Old City", 
        "North Chennai", 
        "South Chennai", 
        "East Delhi", 
        "West Delhi", 
        "South Delhi", 
        "North Delhi", 
        "East Kolkata",
        "South Kolkata", 
        "Lucknow Central", 
        "Pune Central", 
        "Pune East", 
        "Gurugram", 
        "Noida", 
        "Greater Noida", 
        "Thrissur", 
        "Ernakulam", 
        "Trivandrum"
    ];
    
    const searchInput = document.getElementById("searchInput");
    const dropdownList = document.getElementById("DropdownList");

    // Function to filter and display cities
    const filterCities = (query) => {
        // Clear existing list
        dropdownList.innerHTML = "";

        if (!query) {
            dropdownList.classList.add("hidden");
            return;
        }

        const filteredCities = cities.filter((city) =>
            city.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredCities.length > 0) {
            dropdownList.classList.remove("hidden");
            filteredCities.forEach((city) => {
                const li = document.createElement("li");
                li.textContent = city;
                // Add click event to update input field
                li.addEventListener("click", () => {
                    searchInput.value = city;
                    dropdownList.classList.add("hidden");
                });
                dropdownList.appendChild(li);
            });
        } else {
            // Display "City Not Yet Available" when no match is found
            const li = document.createElement("li");
            li.textContent = "No data available for this city. We will be adding it soon!";
            li.style.color = "black"; // Optional: Style for unavailable city
            dropdownList.classList.remove("hidden");
            dropdownList.appendChild(li);
        }
    };

    // Event listener for input typing
    searchInput.addEventListener("input", (e) => {
        filterCities(e.target.value);
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!document.getElementById("searchContainer").contains(e.target)) {
            dropdownList.classList.add("hidden");
        }
    });
});


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserCity(latitude, longitude);
        },
        (error) => {
            console.error("Geolocation failed:", error.message);
            searchInput.value = "Delhi"; // Default city
        }
    );
} else {
    console.warn("Geolocation is not supported by this browser.");
    searchInput.value = "Delhi";
}


// Function to get user's location and set city in the input field
const setUserCity = (latitude, longitude) => {
    const apiKey = "8e04dcc76fe0b319458bebe452a8578d"; // Replace with your actual API key
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                const city = data[0].name;
                searchInput.value = city;
            } else {
                console.warn("City not found, defaulting to Delhi");
                searchInput.value = "Delhi";
            }
        })
        .catch((error) => {
            console.error("Error fetching city data:", error);
            searchInput.value = "Delhi"; // Fallback to default city
        });
};

let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    const totalItems = items.length;
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
  
      console.log(`Setting Slide ${i}: transform = ${(i - index) * 100}%`);
      item.style.transform = `translateX(${(i - index) * 100}%)`;
      item.style.transition = 'transform 0.5s ease-in-out';
    });}
function prevSlide() {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  showSlide(currentIndex);
}

// Initialize
showSlide(currentIndex);
function showAlert(serviceName) {
    alert(`No website available, only on phone for ${serviceName}`);
  }

