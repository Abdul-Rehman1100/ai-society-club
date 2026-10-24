    const form = document.getElementById('reg-form');
    const msg = document.getElementById('msg');
    const tableBody = document.getElementById('table-body');
    const clearBtn = document.getElementById('clear-btn');

    // Function to load and render stored registrations
    function loadRegistrations() {
      tableBody.innerHTML = '';
      const data = JSON.parse(localStorage.getItem('registrations')) || [];
      
      data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.name}</td><td>${item.email}</td><td>${item.event}</td><td>${item.source}</td>`;
        tableBody.appendChild(tr);
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const selectedSource = document.querySelector('input[name="source"]:checked').value;
      
      const newEntry = {
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        event: document.getElementById('event-choice').value,
        source: selectedSource
      };

      const existingData = JSON.parse(localStorage.getItem('registrations')) || [];
      existingData.push(newEntry);
      
      localStorage.setItem('registrations', JSON.stringify(existingData));

      msg.textContent = 'Registration successful and saved!';
      form.reset();
      loadRegistrations();
    });

    clearBtn.addEventListener('click', function() {
      localStorage.removeItem('registrations');
      loadRegistrations();
      msg.textContent = 'All registrations cleared.';
    });

    loadRegistrations();