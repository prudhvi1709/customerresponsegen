const showMessage = (message, isError) => {
    const responseDisplay = document.getElementById('responseDisplay');
    responseDisplay.innerHTML = ''; // Clear any existing messages
    const cardContainer = document.createElement('div');
    cardContainer.className = 'd-flex justify-content-center align-items-center vh-20';
    const card = document.createElement('div');
    card.className = `card mt-3 ${isError ? 'border-danger' : 'border-success'}`;
    card.style.maxWidth = '40rem';
    const cardHeader = document.createElement('div');
    cardHeader.className = `card-header ${isError ? 'text-danger' : 'text-success'}`;
    cardHeader.textContent = isError ? 'Error' : 'Response';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = message;
    const copyButton = document.createElement('button');
    copyButton.className = 'btn btn-sm btn-outline-primary mt-2';
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.onclick = () => {
        navigator.clipboard.writeText(message).then(() => {
            // Create the toast notification
            const toast = document.createElement('div');
            toast.className = 'toast align-items-center text-bg-success border-0 position-fixed top-0 end-0 m-3';
            toast.setAttribute('role', 'alert');
            toast.setAttribute('aria-live', 'assertive');
            toast.setAttribute('aria-atomic', 'true');
            const toastBody = document.createElement('div');
            toastBody.className = 'd-flex';
            const toastContent = document.createElement('div');
            toastContent.className = 'toast-body';
            toastContent.textContent = 'Response copied to clipboard!';
            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'btn-close me-2 m-auto';
            closeButton.setAttribute('data-bs-dismiss', 'toast');
            closeButton.setAttribute('aria-label', 'Close');
            toastBody.appendChild(toastContent);
            toastBody.appendChild(closeButton);
            toast.appendChild(toastBody);
            document.body.appendChild(toast);
            // Show the toast and hide it after 3 seconds
            const toastElement = new bootstrap.Toast(toast);
            toastElement.show();
            setTimeout(() => {
                toastElement.hide();
            }, 3000); // Hide the toast after 3 seconds
        }).catch(() => {
            alert('Failed to copy response.');
        });
    };
    cardBody.appendChild(cardText);
    cardBody.appendChild(copyButton);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
    responseDisplay.appendChild(cardContainer);
};
const postData = async (input) => {
    try {
        const responseDisplay = document.getElementById('responseDisplay');
        responseDisplay.innerHTML = ''; // Clear previous messages

        // Create and display the spinner
        const spinner = document.createElement('div');
        spinner.className = 'd-flex justify-content-center mt-3';
        spinner.innerHTML = `
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        responseDisplay.appendChild(spinner); // Add spinner to the response display area

        const response = await fetch("https://llmfoundry.straive.com/openai/v1/chat/completions", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Generate empathetic, polite, and solution-oriented responses for customer inquiries." },
                    { role: "user", content: [{ type: "text", text: input }] }
                ]
            })
        });

        const data = await response.json();
        if (response.ok) {
            showMessage(data.choices[0].message.content, false);
        } else {
            showMessage(data.error.message || 'Error fetching response.', true);
        }
    } catch (error) {
        showMessage('An error occurred: ' + error.message, true);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const lastInquiry = localStorage.getItem('lastInquiry') || '';
    document.getElementById('inquiryInput').value = lastInquiry;
    document.getElementById('submitButton').addEventListener('click', async () => {
        const input = document.getElementById('inquiryInput').value;
        localStorage.setItem('lastInquiry', input);
        await postData(input); // Trigger postData and handle response
    });
});
