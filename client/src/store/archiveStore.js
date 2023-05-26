const base_url = "http://localhost:8080"

export const loadArchive = async () => {
    const response = await fetch(base_url +'/archive',{
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error(`Failed to load archive: ${response.statusText}`);
    }

    const doc = await response.json();
    return doc.data;
};

export const addToArchive = async (item) => {
    // Create a date object for the current date and time
    const now = new Date();

    // Format the date and time as dd/mm/yyyy hh:mm
    const timestamp = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Add the timestamp to the item
    item.timestamp = timestamp;

    const response = await fetch(base_url +'/archive',{
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        throw new Error(`Failed to add item to archive: ${response.statusText}`);
    }

    // Assuming your API returns the updated item
    const updatedItem = await response.json();
    return updatedItem;
};

//TODO: mangler en load funktion og tilhørende knap
