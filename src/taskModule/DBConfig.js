// setting up the indexedDB
export const DBConfig = {
  name: "MyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "task",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "title", keyPath: "title", options: { unique: false } },
        {
          name: "description",
          keyPath: "description",
          options: { unique: false },
        },
        { name: "completed", keyPath: "completed", options: { unique: false } },
      ],
    },
  ],
};
