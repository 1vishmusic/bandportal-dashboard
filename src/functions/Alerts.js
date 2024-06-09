export const CreateAlertDanger = (text) => {
    const el = document.getElementById('alerts');

    let alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
    alert.setAttribute("role", "alert");
    alert.textContent = text;

    let dismissButton = document.createElement("button");
    dismissButton.setAttribute("type", "button");
    dismissButton.setAttribute("class", "btn-close");
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.setAttribute("aria-label", "Close");
    alert.appendChild(dismissButton);

    el.appendChild(alert);
}

export const CreateAlertSuccess = (text) => {
    const el = document.getElementById('alerts');

    let alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-success alert-dismissible fade show");
    alert.setAttribute("role", "alert");
    alert.textContent = text;

    let dismissButton = document.createElement("button");
    dismissButton.setAttribute("type", "button");
    dismissButton.setAttribute("class", "btn-close");
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.setAttribute("aria-label", "Close");
    alert.appendChild(dismissButton);

    el.appendChild(alert);
}

export const CreateAlertWarn = (text) => {
    const el = document.getElementById('alerts');

    let alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-warning alert-dismissible fade show");
    alert.setAttribute("role", "alert");
    alert.textContent = text;

    let dismissButton = document.createElement("button");
    dismissButton.setAttribute("type", "button");
    dismissButton.setAttribute("class", "btn-close");
    dismissButton.setAttribute("data-bs-dismiss", "alert");
    dismissButton.setAttribute("aria-label", "Close");
    alert.appendChild(dismissButton);

    el.appendChild(alert);
}
