const membershipDetails = document.querySelector('#membership-details');
const membershipModal = document.querySelector('#membership-modal');
const timestamp = document.querySelector('#timestamp');

const today = new Date();
timestamp.setAttribute("value", today.toLocaleDateString());

const membershipData = [
    {
        name: 'Non Profit Membership',
        price: 'Free',
        benefits: ['One', 'Two']
    },
    {
        name: 'Bronze Membership',
        price: '$49.99/month',
        benefits: ['One', 'Two', 'Three', 'Four']
    },
    {
        name: 'Silver Membership',
        price: '$89.99/month',
        benefits: ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    },
    {
        name: 'Gold Membership',
        price: '$169.99/month',
        benefits: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
    }
];

function membershipCards(membership) {
    const card = document.createElement('div');
    const name = document.createElement('p');
    const button = document.createElement('button');

    name.textContent = membership.name;

    button.textContent = 'Learn More';
    button.addEventListener('click', () => {
        createModal(membership);
    })

    card.appendChild(name);
    card.appendChild(button);
    membershipDetails.appendChild(card);
}

membershipData.map(membershipCards);

function createModal(membership) {
    const closeButton = document.createElement('button');
    const name = document.createElement('h2');
    const price = document.createElement('p');
    const list = document.createElement('ul')

    closeButton.textContent = '❌';
    name.textContent = membership.name;
    price.textContent = membership.price;

    closeButton.addEventListener('click', () => {
        membershipModal.close();
    })

    membership.benefits.forEach((benefit) => {
        const item = document.createElement('li');
        item.textContent = benefit;
        list.appendChild(item);
    });

    membershipModal.innerHTML = '';

    membershipModal.appendChild(closeButton);
    membershipModal.appendChild(name);
    membershipModal.appendChild(price);
    membershipModal.appendChild(list);

    membershipModal.showModal();
}