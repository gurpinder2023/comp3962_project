// Script for populating available slots dynamically
// You can replace this with actual dynamic data from a backend

const slots = [
  "Monday 9:00 AM - 10:00 AM",
  "Tuesday 10:00 AM - 11:00 AM",
  "Wednesday 2:00 PM - 3:00 PM",
];

const slotList = document.getElementById("slotList");
const slotSelect = document.getElementById("slot");

// Populate available slots on the slots.html page
slots.forEach((slot) => {
  const li = document.createElement("li");
  li.textContent = slot;
  slotList.appendChild(li);

  const option = document.createElement("option");
  option.value = slot;
  option.textContent = slot;
  slotSelect.appendChild(option);
});
