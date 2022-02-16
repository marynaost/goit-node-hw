const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  const content = await fs.readFile(contactsPath);
  const result = JSON.parse(content);
  return result;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const contact = contacts.find((elem) => elem.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContent();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
