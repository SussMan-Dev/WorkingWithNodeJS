document.querySelectorAll(".delete-user").forEach((button) => {
    button.addEventListener("click", async () => {
        const confirmed = window.confirm(`Delete ${button.dataset.username}? This action cannot be undone.`);

        if (!confirmed) return;

        button.disabled = true;
        button.textContent = "Deleting...";

        try {
            const response = await fetch(`/api/v1/users/${button.dataset.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                window.alert("Unable to delete user. Please try again.");
                button.disabled = false;
                button.textContent = "Delete";
                return;
            }

            window.location.reload();
        } catch {
            window.alert("Unable to connect to the server.");
            button.disabled = false;
            button.textContent = "Delete";
        }
    });
});
