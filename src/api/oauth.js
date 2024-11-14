export const oauthAppWrite = () => {
    return {
        endpoint: import.meta.env.VITE_ENDPOINT,
        projectId: import.meta.env.VITE_PROJECT_ID,
        databaseId: import.meta.env.VITE_DATABASE_ID,
        collectionClientsId: import.meta.env.VITE_COLLECTION_CLIENTS_ID,
    };
} 