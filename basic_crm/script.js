document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const createContactSection = document.getElementById('createContact');
    const listContactsSection = document.getElementById('listContacts');
    const navCreate = document.getElementById('nav-create');
    const navList = document.getElementById('nav-list');

    const getContacts = () => {
        return JSON.parse(localStorage.getItem('contacts')) || [];
    };

    const setContacts = (contacts) => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    };

    const renderContacts = () => {
        const contacts = getContacts();
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <div class="row">
                    <div class="col-md-4"><strong>Name:</strong> ${contact.name}</div>
                    <div class="col-md-4"><strong>Email:</strong> ${contact.email}</div>
                    <div class="col-md-4"><strong>Phone:</strong> ${contact.phone}</div>
                </div>
                <div class="row">
                    <div class="col-md-4"><strong>Title:</strong> ${contact.title}</div>
                    <div class="col-md-4"><strong>Company:</strong> ${contact.company}</div>
                    <div class="col-md-4"><strong>Nation:</strong> ${contact.nation}</div>
                </div>
                <div class="row">
                    <div class="col-md-4"><strong>City:</strong> ${contact.city}</div>
                    <div class="col-md-4"><strong>Address:</strong> ${contact.address}</div>
                    <div class="col-md-4"><strong>Zip Code:</strong> ${contact.zip}</div>
                </div>
                <button class="btn btn-danger btn-sm mt-2" data-index="${index}">Delete</button>
            `;
            contactList.appendChild(li);
        });
    };

    const addContact = (contact) => {
        const contacts = getContacts();
        contacts.push(contact);
        setContacts(contacts);
        renderContacts();
    };

    const deleteContact = (index) => {
        const contacts = getContacts();
        contacts.splice(index, 1);
        setContacts(contacts);
        renderContacts();
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contact = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            title: document.getElementById('title').value,
            company: document.getElementById('company').value,
            nation: document.getElementById('nation').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            zip: document.getElementById('zip').value,
        };
        addContact(contact);
        contactForm.reset();
    });

    contactList.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-danger')) {
            const index = e.target.getAttribute('data-index');
            deleteContact(index);
        }
    });

    const showSection = (section) => {
        if (section === 'create') {
            createContactSection.classList.remove('d-none');
            listContactsSection.classList.add('d-none');
            navCreate.classList.add('active');
            navList.classList.remove('active');
        } else {
            createContactSection.classList.add('d-none');
            listContactsSection.classList.remove('d-none');
            navCreate.classList.remove('active');
            navList.classList.add('active');
            renderContacts();
        }
    };

    navCreate.addEventListener('click', () => showSection('create'));
    navList.addEventListener('click', () => showSection('list'));

    showSection('create');
});
