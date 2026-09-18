const editUserForm = document.querySelector("#edit-user-form");

if (editUserForm) {
    const errorMessage = document.querySelector("#error-message");
    const submitButton = document.querySelector("#submit-button");

    editUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        errorMessage.classList.add("d-none");
        submitButton.disabled = true;
        submitButton.textContent = "Saving...";

        const formData = new FormData(editUserForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`/api/v1/users/${editUserForm.dataset.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                errorMessage.textContent = result.error || "Unable to update user.";
                errorMessage.classList.remove("d-none");
                return;
            }

            window.location.href = "/users";
        } catch {
            errorMessage.textContent = "Unable to connect to the server. Please try again.";
            errorMessage.classList.remove("d-none");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Save changes";
        }
    });
}
